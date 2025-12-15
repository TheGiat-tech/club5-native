import { useEffect, useRef, useState } from 'react';
import type { CoachId } from './personalities';
import type { ConversationState, OptionChip } from './conversationTypes';
import { createCoachEngine } from './CoachEngine';
import { useSubscription } from '../context/SubscriptionContext';
import { useApp } from '@/figma/context/AppContext';

interface UseCoachConversationResult {
  messages: ConversationState['messages'];
  chips: OptionChip[];
  loading: boolean;
  typing: boolean;
  ended: boolean;
  sendTextMessage: (text: string) => Promise<void>;
  selectChip: (chip: OptionChip) => Promise<void>;
}

export function useCoachConversation(
  coachId: CoachId,
  disabled = false,
): UseCoachConversationResult {
  const { isPremium } = useSubscription();
  const { language } = useApp();
  const languageName = (() => {
    switch (language) {
      case 'he':
        return 'Hebrew';
      case 'es':
        return 'Spanish';
      case 'fr':
        return 'French';
      case 'en':
      default:
        return 'English';
    }
  })();
  const maxTurns = isPremium ? 9 : 3;
  const engineRef = useRef<ReturnType<typeof createCoachEngine> | null>(null);
  const [state, setState] = useState<ConversationState | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (disabled) {
      setState({
        coachId,
        messages: [],
        step: 0,
        isPremium,
        waitingForUser: false,
        ended: true,
        maxTurns,
        chips: [],
        loading: false,
        typing: false,
      });
      return;
    }
    const engine = createCoachEngine({ coachId, isPremium, languageName });
    engineRef.current = engine;

    const bootstrap = async () => {
      const initial = await engine.startConversation();
      if (!cancelled) {
        setState({ ...initial, loading: false, typing: false });
      }
    };

    setState({
      coachId,
      messages: [],
      step: 0,
      isPremium,
      waitingForUser: false,
      ended: false,
      maxTurns,
      chips: [],
      loading: true,
      typing: false,
    });

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [coachId, isPremium, disabled, maxTurns, languageName]);

  const send = async (input: string | OptionChip) => {
    if (!state || state.ended || !engineRef.current) return;
    setState((prev) => (prev ? { ...prev, typing: true } : prev));
    const result =
      typeof input === 'string'
        ? await engineRef.current.sendUserMessage(state, input)
        : await engineRef.current.selectChip(state, input);
    setState({ ...result, typing: false });
  };

  const sendTextMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    await send(trimmed);
  };

  const selectChip = async (chip: OptionChip) => {
    await send(chip);
  };

  return {
    messages: state?.messages ?? [],
    chips: state?.chips ?? [],
    loading: state?.loading ?? false,
    typing: state?.typing ?? false,
    ended: state?.ended ?? false,
    sendTextMessage,
    selectChip,
  };
}
