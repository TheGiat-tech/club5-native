import { useMemo } from 'react';
import type { OptionChip, UserMessage, CoachMessage } from './conversationTypes';

type ConversationReturn = {
  messages: (UserMessage | CoachMessage)[];
  chips: OptionChip[];
  loading: boolean;
  typing: boolean;
  ended: boolean;
  sendTextMessage: (text: string) => void;
  selectChip: (chip: OptionChip) => void;
};

export function useCoachConversation(_coachId: string, _isOverFreeLimit?: boolean): ConversationReturn {
  const state = useMemo<ConversationReturn>(
    () => ({
      messages: [],
      chips: [],
      loading: false,
      typing: false,
      ended: false,
      sendTextMessage: () => {},
      selectChip: () => {},
    }),
    []
  );

  return state;
}
