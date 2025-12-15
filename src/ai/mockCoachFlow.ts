import { COACH_PERSONALITIES, type CoachId } from './personalities';
import type {
  ConversationState,
  CoachMessage,
  OptionChip,
  CoachReplyResult,
} from './conversationTypes';

function now() {
  return Date.now();
}

const FREE_MAX_TURNS = 3;
const PREMIUM_MAX_TURNS = 9;

function createCoachMessage(coachId: CoachId, text: string): CoachMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: 'coach',
    coachId,
    text,
    createdAt: now(),
  };
}

function createInitialState(coachId: CoachId, isPremium: boolean): ConversationState {
  return {
    coachId,
    messages: [],
    step: 0,
    isPremium,
    waitingForUser: false,
    ended: false,
    maxTurns: isPremium ? PREMIUM_MAX_TURNS : FREE_MAX_TURNS,
  };
}

export function initMockConversation(coachId: CoachId, isPremium: boolean): ConversationState {
  const state = createInitialState(coachId, isPremium);
  const personality = COACH_PERSONALITIES[coachId];

  const greeting =
    coachId === 'max'
      ? `Alright, I'm ${personality.displayName}. I'm not here to let you drift. In one phrase, tell me how waking up around 5AM felt today.`
      : `Hey, I'm ${personality.displayName}. I'm glad you're here and working on your mornings. In a few words, how did waking up around 5AM feel today?`;

  const greetingMessage = createCoachMessage(coachId, greeting);

  return {
    ...state,
    messages: [greetingMessage],
    step: 0,
    waitingForUser: true,
    ended: false,
    chips: [
      { id: 'tired', label: "I'm tired", value: "I'm tired in the morning." },
      { id: 'late', label: 'I woke up late', value: 'I woke up later than I planned.' },
      { id: 'great', label: 'I feel great', value: 'I feel great about waking up early.' },
    ],
  };
}

export function mockCoachNext(
  state: ConversationState,
  userInput: string | OptionChip,
): CoachReplyResult {
  const coachId = state.coachId;
  const value = typeof userInput === 'string' ? userInput : userInput.value;
  const coachMessagesSoFar = state.messages.filter((m) => m.type === 'coach').length;

  const userMessage = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: 'user' as const,
    text: value,
    createdAt: now(),
  };

  const messagesWithUser = [...state.messages, userMessage];

  let coachText: string;

  if (state.step === 0) {
    if (typeof userInput !== 'string') {
      switch (userInput.id) {
        case 'tired':
          coachText =
            coachId === 'max'
              ? `Feeling tired is normal, but your alarm is a promise, not a suggestion. Tonight, set your alarm for 5AM, put your phone out of reach, and decide now that when it rings you will stand up immediately. For the next three mornings, your only job is to execute that move, no debate, no delay. Each time you do, you are training your brain that you follow through even when you don't feel like it.`
              : `Thank you for being honest about feeling tired. That tells me you've been pushing yourself, and your body is asking for care while your mind is asking for progress. For the next few mornings, choose one tiny act of kindness you'll do for yourself as soon as the alarm goes off—like drinking a glass of water, opening the curtains, or taking three slow breaths—and let that be your gentle signal that you're still showing up for yourself, even when it's hard.`;
          break;
        case 'late':
          coachText =
            coachId === 'max'
              ? `You woke up later than planned, but that does not define you. Tonight, tighten the system: set your alarm for 5AM, prep your clothes and water bottle, and decide that when the alarm rings you won't negotiate with yourself. For the next three days, your mission is simple: feet on the floor within 10 seconds. No excuses, just execution. Once you prove you can do that, the 5AM version of you becomes real, not hypothetical.`
              : `Waking up late can feel disappointing, but it's also feedback, not a verdict. Let's turn today into data instead of drama. Ask yourself: what made it harder to get up on time—sleep, stress, or unclear reasons for waking early? For the next few mornings, simplify your goal to getting up just 10–15 minutes earlier than usual, and notice how even that small win shifts your sense of control and confidence.`;
          break;
        case 'great':
        default:
          coachText =
            coachId === 'max'
              ? `Good. When you feel great after waking up early, that's proof that the habit is worth the effort. Your next step is to lock it in: set a consistent bedtime, keep your alarm fixed at 5AM, and decide on one non-negotiable action you'll take in the first five minutes—like drinking water, stretching, or writing a single sentence. This way you turn good mornings into a streak and a streak into a new identity.`
              : `I love that you're feeling great about waking up early. That feeling is your evidence that the version of you who wakes at 5AM already exists. To build on it, try capturing one short reflection each morning: how you slept, how you feel, and one thing you're proud of for showing up. Over time, those reflections become a story that reminds you why this habit matters, especially on the days when motivation dips.`;
          break;
      }
    } else {
      coachText =
        coachId === 'max'
          ? `Got it. "${value}" is your current story about waking up early. For the next three mornings, strip away the story and focus on one move: stand up as soon as the alarm rings and do not lie back down. That simple action, repeated, will do more for your confidence than any amount of thinking.`
          : `Thank you for putting that into words. "${value}" tells me a lot about how your mornings feel right now. For the next few days, I want you to focus on one compassionate, realistic promise you can keep with yourself as soon as the alarm goes off, and let that be the anchor that carries you into your day.`;
    }
  } else {
    coachText = state.isPremium
      ? 'Premium wrap-up: 1) Lock your 5AM alarm and place it out of reach. 2) Stage water and clothes tonight. 3) Plan one 5-minute task for when you stand up. Reflect: what made yesterday hard, and how will you remove that friction?'
      : 'Free mini-session wrap: set your alarm out of reach, choose one tiny first action, and promise yourself no snooze. Upgrade to Premium for deeper guidance and more turns.';
  }

  const reachedLimit = coachMessagesSoFar + 1 >= state.maxTurns;

  const coachMessage = createCoachMessage(coachId, coachText);

  const nextState: ConversationState = {
    ...state,
    messages: [...messagesWithUser, coachMessage],
    step: state.step + 1,
    waitingForUser: !reachedLimit,
    ended: reachedLimit,
    chips: reachedLimit ? [] : state.chips,
  };

  return {
    state: nextState,
    newMessages: [coachMessage],
  };
}
