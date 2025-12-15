export interface Message {
  id: string;
  text: string;
  sender: 'max' | 'user';
  choices?: Choice[];
  next?: string;
  delay?: number; // milliseconds before showing this message
}

export interface Choice {
  id: string;
  text: string;
  next: string;
}

export interface Session {
  id: string;
  title: string;
  messages: Record<string, Message>;
  startId: string;
}

export const deepSessions: Record<string, Session> = {
  tired: {
    id: 'tired',
    title: "I'm Tired",
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: 'Hey. You look drained today.',
        sender: 'max',
        next: 'question',
      },
      question: {
        id: 'question',
        text: 'Tell me honestly — is it your body or your mind?',
        sender: 'max',
        choices: [
          { id: 'body', text: "Body, I didn't sleep enough.", next: 'body_response' },
          { id: 'mind', text: "Mind, I can't stop overthinking.", next: 'mind_response' },
        ],
      },
      body_response: {
        id: 'body_response',
        text: 'Then rest is part of discipline, not a failure.',
        sender: 'max',
        next: 'body_sleep_question',
      },
      body_sleep_question: {
        id: 'body_sleep_question',
        text: 'How much sleep did you actually get last night?',
        sender: 'max',
        choices: [
          { id: '5hrs', text: '5 hours.', next: 'body_5hrs' },
          { id: '7hrs', text: 'About 7.', next: 'body_7hrs' },
          { id: 'lost_count', text: 'I lost count.', next: 'body_lost' },
        ],
      },
      body_5hrs: {
        id: 'body_5hrs',
        text: "Let's fix the foundation. Tonight, give yourself permission to recharge properly.",
        sender: 'max',
        next: 'body_end',
      },
      body_7hrs: {
        id: 'body_7hrs',
        text: 'Seven is decent, but quality matters too. Maybe your sleep was restless?',
        sender: 'max',
        next: 'body_end',
      },
      body_lost: {
        id: 'body_lost',
        text: "That's a sign. Tonight, set one goal: actually rest.",
        sender: 'max',
        next: 'body_end',
      },
      body_end: {
        id: 'body_end',
        text: 'Even warriors need rest.',
        sender: 'max',
      },
      mind_response: {
        id: 'mind_response',
        text: 'Mental fatigue is sneaky. It hides under productivity.',
        sender: 'max',
        next: 'mind_question',
      },
      mind_question: {
        id: 'mind_question',
        text: "What's looping in your head right now?",
        sender: 'max',
        choices: [
          { id: 'work', text: 'Work stuff.', next: 'mind_work' },
          { id: 'personal', text: 'Something personal.', next: 'mind_personal' },
          { id: 'noise', text: 'No idea, just noise.', next: 'mind_noise' },
        ],
      },
      mind_work: {
        id: 'mind_work',
        text: "Then pause the world for a minute. Close the laptop. You won't lose progress — you'll gain clarity.",
        sender: 'max',
        next: 'mind_end',
      },
      mind_personal: {
        id: 'mind_personal',
        text: 'Reach out to one person you trust. One text can untangle a storm.',
        sender: 'max',
        next: 'mind_end',
      },
      mind_noise: {
        id: 'mind_noise',
        text: "That's okay. Just breathe with me for 10 seconds. No goal. Just breathing.",
        sender: 'max',
        next: 'mind_end',
      },
      mind_end: {
        id: 'mind_end',
        text: "You don't have to fix everything. You just need to rest *with intention*.",
        sender: 'max',
      },
    },
  },

  motivation: {
    id: 'motivation',
    title: 'Need Motivation',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: "You don't sound lazy — you sound *disconnected*.",
        sender: 'max',
        next: 'pride_question',
      },
      pride_question: {
        id: 'pride_question',
        text: 'When was the last time you felt proud of yourself?',
        sender: 'max',
        choices: [
          { id: 'while_ago', text: 'A while ago.', next: 'pride_while' },
          { id: 'recently', text: 'Recently.', next: 'pride_recent' },
          { id: 'dont_remember', text: "I don't remember.", next: 'pride_none' },
        ],
      },
      pride_while: {
        id: 'pride_while',
        text: "That's fine. Pride fades fast. Let's bring it back.",
        sender: 'max',
        next: 'push_type',
      },
      pride_recent: {
        id: 'pride_recent',
        text: "Then you already have momentum — let's build on it.",
        sender: 'max',
        next: 'push_type',
      },
      pride_none: {
        id: 'pride_none',
        text: "Okay, then we'll make today the first.",
        sender: 'max',
        next: 'push_type',
      },
      push_type: {
        id: 'push_type',
        text: 'What kind of push do you need right now?',
        sender: 'max',
        choices: [
          { id: 'gentle', text: 'Gentle', next: 'push_gentle' },
          { id: 'direct', text: 'Direct', next: 'push_direct' },
          { id: 'spiritual', text: 'Spiritual', next: 'push_spiritual' },
        ],
      },
      push_gentle: {
        id: 'push_gentle',
        text: "You're doing better than you think. Progress is quieter than guilt.",
        sender: 'max',
        next: 'action',
      },
      push_direct: {
        id: 'push_direct',
        text: 'Stop negotiating with excuses. Action fixes fear.',
        sender: 'max',
        next: 'action',
      },
      push_spiritual: {
        id: 'push_spiritual',
        text: "You're guided — even when it feels random. Just move with trust.",
        sender: 'max',
        next: 'action',
      },
      action: {
        id: 'action',
        text: "Let's do one small thing in the next 10 minutes. Then come back here.",
        sender: 'max',
      },
    },
  },

  wakeup: {
    id: 'wakeup',
    title: 'Hard to Wake Up',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: "You hate mornings, don't you?",
        sender: 'max',
        next: 'first_thought',
      },
      first_thought: {
        id: 'first_thought',
        text: "Be honest — what's the first thought when your alarm rings?",
        sender: 'max',
        choices: [
          { id: 'cant', text: "I can't do this again.", next: 'cant_response' },
          { id: 'five_more', text: 'Five more minutes.', next: 'five_response' },
          { id: 'why', text: "I don't even know why I try.", next: 'why_response' },
        ],
      },
      cant_response: {
        id: 'cant_response',
        text: 'You can. You just forgot your *why*.',
        sender: 'max',
        next: 'decision',
      },
      five_response: {
        id: 'five_response',
        text: 'Then move your alarm to the other side of the room tonight.',
        sender: 'max',
        next: 'decision',
      },
      why_response: {
        id: 'why_response',
        text: "Then let's rebuild your reason — not your schedule.",
        sender: 'max',
        next: 'decision',
      },
      decision: {
        id: 'decision',
        text: 'Every morning is a decision: Do I repeat yesterday or create today?',
        sender: 'max',
        next: 'choice_question',
      },
      choice_question: {
        id: 'choice_question',
        text: 'Which one will you choose tomorrow?',
        sender: 'max',
        choices: [
          { id: 'repeat', text: 'Repeat.', next: 'final_repeat' },
          { id: 'create', text: 'Create.', next: 'final_create' },
        ],
      },
      final_repeat: {
        id: 'final_repeat',
        text: "That's honest. But even repetition can be refined — one tiny shift changes the pattern.",
        sender: 'max',
        next: 'final_end',
      },
      final_create: {
        id: 'final_create',
        text: 'Good. Creation always starts small — just open your eyes, sit up, and smile.',
        sender: 'max',
        next: 'final_end',
      },
      final_end: {
        id: 'final_end',
        text: "That's your win.",
        sender: 'max',
      },
    },
  },

  down: {
    id: 'down',
    title: 'Feeling Down',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: 'I can tell today feels heavy.',
        sender: 'max',
        next: 'comfort_or_honesty',
      },
      comfort_or_honesty: {
        id: 'comfort_or_honesty',
        text: 'You want comfort or honesty?',
        sender: 'max',
        choices: [
          { id: 'comfort', text: 'Comfort.', next: 'comfort_response' },
          { id: 'honesty', text: 'Honesty.', next: 'honesty_response' },
        ],
      },
      comfort_response: {
        id: 'comfort_response',
        text: "Okay. Then breathe. You're safe here. You don't need to earn rest or love.",
        sender: 'max',
        next: 'appreciate',
      },
      honesty_response: {
        id: 'honesty_response',
        text: "Pain means you care. That's proof you haven't given up.",
        sender: 'max',
        next: 'appreciate',
      },
      appreciate: {
        id: 'appreciate',
        text: "What's one thing you can still appreciate right now?",
        sender: 'max',
        choices: [
          { id: 'someone', text: 'Someone in my life.', next: 'appreciate_someone' },
          { id: 'small', text: 'Something small.', next: 'appreciate_small' },
          { id: 'nothing', text: 'Nothing.', next: 'appreciate_nothing' },
        ],
      },
      appreciate_someone: {
        id: 'appreciate_someone',
        text: "Text them 'thank you'. Connection heals faster than time.",
        sender: 'max',
        next: 'final',
      },
      appreciate_small: {
        id: 'appreciate_small',
        text: "Then that's your anchor. Keep it visible today.",
        sender: 'max',
        next: 'final',
      },
      appreciate_nothing: {
        id: 'appreciate_nothing',
        text: "Then I'll lend you mine: the fact that you're still here.",
        sender: 'max',
        next: 'final',
      },
      final: {
        id: 'final',
        text: "That's enough for today. Healing isn't loud — it's honest.",
        sender: 'max',
      },
    },
  },

  night: {
    id: 'night',
    title: 'Night Reflection',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: "The day's ending. Don't judge it — just see it.",
        sender: 'max',
        next: 'word',
      },
      word: {
        id: 'word',
        text: 'What word describes your day?',
        sender: 'max',
        choices: [
          { id: 'tiring', text: 'Tiring.', next: 'word_tiring' },
          { id: 'meaningful', text: 'Meaningful.', next: 'word_meaningful' },
          { id: 'wasted', text: 'Wasted.', next: 'word_wasted' },
        ],
      },
      word_tiring: {
        id: 'word_tiring',
        text: 'Then sleep is your reset. Let go of perfection tonight.',
        sender: 'max',
        next: 'goodnight',
      },
      word_meaningful: {
        id: 'word_meaningful',
        text: 'Beautiful. Remember that feeling when you wake up tomorrow.',
        sender: 'max',
        next: 'goodnight',
      },
      word_wasted: {
        id: 'word_wasted',
        text: "You didn't waste it — you survived it. That's something.",
        sender: 'max',
        next: 'goodnight',
      },
      goodnight: {
        id: 'goodnight',
        text: 'Good night. Your only job now: rest deeply, wake gently.',
        sender: 'max',
      },
    },
  },
};