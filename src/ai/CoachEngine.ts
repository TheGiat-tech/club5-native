import { COACH_PERSONALITIES, type CoachId } from './personalities';
import type {
  ConversationState,
  UserMessage,
  CoachMessage,
  OptionChip,
  CoachReplyResult,
} from './conversationTypes';
import { initMockConversation, mockCoachNext } from './mockCoachFlow';
import { runMiniChat } from '../lib/openai';

type InputValue = string | OptionChip;

function now() {
  return Date.now();
}

const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const hasApiKey = typeof apiKey === 'string' && apiKey.trim().length > 0;
let warnedOnce = false;
const FREE_MAX_TURNS = 3;
const PREMIUM_MAX_TURNS = 9;

function createUserMessage(text: string): UserMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: 'user',
    text,
    createdAt: now(),
  };
}

function createCoachMessage(coachId: CoachId, text: string): CoachMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: 'coach',
    coachId,
    text,
    createdAt: now(),
  };
}

function buildSystemPrompt(coachId: CoachId, isPremium: boolean): string {
  const personality = COACH_PERSONALITIES[coachId];

  const personalityCore =
    coachId === 'max'
      ? 'You are assertive, direct, and focused on action. You challenge excuses, keep responses short and punchy, and push the user toward immediate, concrete steps.'
      : 'You are assertive but warm and emotionally intelligent. You validate feelings, reflect what you hear, and then guide the user toward clear, motivating actions.';

  const lengthInstruction =
    coachId === 'max'
      ? 'Aim for around 1-3 concise sentences, focused on action.'
      : 'Aim for around 3-5 sentences, with empathy, reflection, and a clear action.';

  const premiumInstruction = isPremium
    ? 'You are speaking to a premium user. You may go deeper into reasoning and provide more nuanced guidance, but you must still keep the response focused and practical.'
    : 'You are speaking to a free user. Keep the conversation short and focused, offering one primary insight and one simple, actionable next step.';

  const safetyInstruction =
    'You must NOT provide medical, psychological, or health advice. Do not diagnose conditions. Focus only on motivation, habits, time management, and mindset around waking up early.';

  const closingInstruction =
    'As the conversation progresses, help the user reach clarity about why they want to wake up early, suggest practical habit tweaks, and when appropriate, wrap up with a brief recap, a small set of actionable suggestions, and a short motivational line.';

  return [
    `You are ${personality.displayName}, an AI coach.`,
    `Tagline: ${personality.tagline}`,
    personalityCore,
    lengthInstruction,
    premiumInstruction,
    safetyInstruction,
    closingInstruction,
  ].join(' ');
}

export async function initConversation(
  coachId: CoachId,
  isPremium: boolean,
  languageName: string,
): Promise<{ state: ConversationState; firstReply: CoachMessage; chips?: OptionChip[] }> {
  if (!hasApiKey) {
    if (!warnedOnce) {
      console.warn('[CoachEngine] EXPO_PUBLIC_OPENAI_API_KEY is not set – using mock mode.');
      warnedOnce = true;
    }
    const state = initMockConversation(coachId, isPremium);
    const firstReply = state.messages[state.messages.length - 1] as CoachMessage;
    const chips: OptionChip[] = [
      { id: 'tired', label: "I'm tired", value: "I'm tired in the morning." },
      { id: 'late', label: 'I woke up late', value: 'I woke up later than I planned.' },
      { id: 'great', label: 'I feel great', value: 'I feel great about waking up early.' },
    ];
    return { state, firstReply, chips };
  }

  const baseState: ConversationState = {
    coachId,
    messages: [],
    step: 0,
    isPremium,
    waitingForUser: false,
    ended: false,
    maxTurns: isPremium ? PREMIUM_MAX_TURNS : FREE_MAX_TURNS,
  };

  const prompt =
    'Greet the user and ask how they feel about waking up around 5AM today. Keep it concise and in your coaching style.';

  const chips: OptionChip[] = [
    { id: 'tired', label: "I'm tired", value: "I'm tired in the morning." },
    { id: 'late', label: 'I woke up late', value: 'I woke up later than I planned.' },
    { id: 'great', label: 'I feel great', value: 'I feel great about waking up early.' },
  ];

  try {
    const text =
      (await runMiniChat(
        `${buildSystemPrompt(coachId, isPremium)} ${prompt} Respond in ${languageName}.`,
        isPremium ? 320 : 160,
        languageName,
      )) ||
      '';
    const greetingText =
      text ||
      (coachId === 'max'
        ? 'Alright, I am here to get you moving. How did waking up around 5AM feel today?'
        : 'I am glad you are here. How did waking up around 5AM feel today?');

    const firstReply = createCoachMessage(coachId, greetingText);
    const state: ConversationState = {
      ...baseState,
      messages: [firstReply],
      waitingForUser: true,
      chips,
    };

    return { state, firstReply, chips };
  } catch {
    const state = initMockConversation(coachId, isPremium);
    const firstReply = state.messages[state.messages.length - 1] as CoachMessage;
    return { state: { ...state, chips }, firstReply, chips };
  }
}

export async function continueConversation(
  state: ConversationState,
  userInput: InputValue,
  languageName: string,
): Promise<CoachReplyResult> {
  if (state.ended) {
    return { state, newMessages: [] };
  }

  if (!hasApiKey) {
    return mockCoachNext(state, userInput);
  }

  const value = typeof userInput === 'string' ? userInput : userInput.value;
  const userMessage = createUserMessage(value);
  const messagesWithUser = [...state.messages, userMessage];

  const coachMessagesSoFar = state.messages.filter((m) => m.type === 'coach').length;

  if (coachMessagesSoFar >= state.maxTurns) {
    const closingText = state.isPremium
      ? 'Session wrap-up: 1) Decide your exact wake-up time and set the alarm. 2) Place water and clothes out tonight. 3) Commit to standing up within 10 seconds. Reflect tonight on what felt hardest this week and one tiny improvement for tomorrow.'
      : 'Free mini-session complete. Try this tomorrow: 1) Set your alarm and place it out of reach. 2) Choose one tiny first action (water, stretch). 3) Commit to no snooze. Upgrade to Premium for longer guidance.';

    const closingMessage = createCoachMessage(state.coachId, closingText);
    const nextState: ConversationState = {
      ...state,
      messages: [...messagesWithUser, closingMessage],
      waitingForUser: false,
      ended: true,
      chips: [],
    };

    return {
      state: nextState,
      newMessages: [closingMessage],
    };
  }

  try {
    const historyText = messagesWithUser
      .map((m) => `${m.type === 'coach' ? 'Coach' : 'You'}: ${m.text}`)
      .join('\n');
    const premiumHint = state.isPremium
      ? 'Provide deeper guidance and end with 2-3 clear actions and 1 reflective question.'
      : 'Keep it short. Offer one primary insight and one actionable next step.';
    const text =
      (await runMiniChat(
        `${buildSystemPrompt(state.coachId, state.isPremium)}\nConversation so far:\n${historyText}\nNew user message: ${value}\n${premiumHint}\nRespond in ${languageName}.`,
        state.isPremium ? 400 : 200,
        languageName,
      )) || '';
    const coachText =
      text ||
      'Here is one clear next step: decide on a specific wake-up time for tomorrow and one thing you will do in the first five minutes after getting out of bed.';

    const coachMessage = createCoachMessage(state.coachId, coachText);

    const nextCoachCount = coachMessagesSoFar + 1;
    const reachedLimit = nextCoachCount >= state.maxTurns;

    const nextState: ConversationState = {
      ...state,
      messages: [...messagesWithUser, coachMessage],
      step: state.step + 1,
      waitingForUser: !reachedLimit,
      ended: reachedLimit,
      chips: [],
    };

    return {
      state: nextState,
      newMessages: [coachMessage],
    };
  } catch {
    return mockCoachNext(
      {
        ...state,
        messages: messagesWithUser,
        chips: state.chips,
      },
      userInput,
    );
  }
}

export function createCoachEngine(options: { coachId: CoachId; isPremium: boolean; languageName: string }) {
  const { coachId, isPremium, languageName } = options;
  let cachedState: ConversationState | null = null;

  const startConversation = async (initialState?: ConversationState) => {
    if (initialState) {
      cachedState = initialState;
      return initialState;
    }

    const { state, chips } = await initConversation(coachId, isPremium, languageName);
    const next: ConversationState = { ...state, chips, loading: false, typing: false };
    cachedState = next;
    return next;
  };

  const sendUserMessage = async (state: ConversationState, text: string) => {
    const result = await continueConversation(state, text, languageName);
    const next: ConversationState = {
      ...result.state,
      chips: result.chips ?? [],
    };
    cachedState = next;
    return next;
  };

  const selectChip = async (state: ConversationState, chip: OptionChip) => {
    const result = await continueConversation(state, chip, languageName);
    const next: ConversationState = {
      ...result.state,
      chips: result.chips ?? [],
    };
    cachedState = next;
    return next;
  };

  return {
    startConversation,
    sendUserMessage,
    selectChip,
    getState: () => cachedState,
  };
}
