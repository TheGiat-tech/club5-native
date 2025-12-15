export interface Message {
  id: string;
  text: string;
  sender: 'max' | 'user';
  choices?: Choice[];
  next?: string;
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

export const sessions: Record<string, Session> = {
  wakeup: {
    id: 'wakeup',
    title: 'Wake Up Session',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: "Morning again, huh? Feeling heavy?",
        sender: 'max',
        choices: [
          { id: 'heavy', text: "Yeah, can't get up", next: 'heavy_response' },
          { id: 'snooze', text: 'I keep snoozing', next: 'snooze_response' },
        ],
      },
      heavy_response: {
        id: 'heavy_response',
        text: "Let's shrink the goal: just sit up. That's a win.",
        sender: 'max',
        next: 'heavy_followup',
      },
      heavy_followup: {
        id: 'heavy_followup',
        text: 'Want me to check on you tomorrow?',
        sender: 'max',
        choices: [
          { id: 'yes', text: 'Yes, please', next: 'heavy_yes' },
          { id: 'no', text: "No, I'll handle it", next: 'heavy_no' },
        ],
      },
      heavy_yes: {
        id: 'heavy_yes',
        text: "Deal. Tomorrow, same time. You'll surprise yourself.",
        sender: 'max',
        next: 'end',
      },
      heavy_no: {
        id: 'heavy_no',
        text: "Alright. You've got this — one small promise at a time.",
        sender: 'max',
        next: 'end',
      },
      snooze_response: {
        id: 'snooze_response',
        text: 'Then move your alarm away from the bed.',
        sender: 'max',
        next: 'snooze_followup',
      },
      snooze_followup: {
        id: 'snooze_followup',
        text: "You're not lazy, just too close to temptation.",
        sender: 'max',
        next: 'snooze_question',
      },
      snooze_question: {
        id: 'snooze_question',
        text: 'Try it tonight?',
        sender: 'max',
        choices: [
          { id: 'try_yes', text: "I'll try it", next: 'snooze_yes' },
          { id: 'try_no', text: 'Maybe later', next: 'snooze_no' },
        ],
      },
      snooze_yes: {
        id: 'snooze_yes',
        text: 'Awesome. Small change, big impact.',
        sender: 'max',
        next: 'end',
      },
      snooze_no: {
        id: 'snooze_no',
        text: "Fair enough. When you're ready, the option is there.",
        sender: 'max',
        next: 'end',
      },
      end: {
        id: 'end',
        text: 'Every sunrise is a restart. You can always try again.',
        sender: 'max',
      },
    },
  },
  
  tired: {
    id: 'tired',
    title: 'Tired Session',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: 'Tired can mean two things — body or mind. Which is it?',
        sender: 'max',
        choices: [
          { id: 'body', text: 'Body', next: 'body_response' },
          { id: 'mind', text: 'Mind', next: 'mind_response' },
        ],
      },
      body_response: {
        id: 'body_response',
        text: "Then rest properly. No guilt. That's part of discipline.",
        sender: 'max',
        next: 'body_followup',
      },
      body_followup: {
        id: 'body_followup',
        text: 'Want a small energy reset?',
        sender: 'max',
        choices: [
          { id: 'yes', text: 'Yes', next: 'body_yes' },
          { id: 'no', text: 'Not now', next: 'body_no' },
        ],
      },
      body_yes: {
        id: 'body_yes',
        text: 'Stand up, breathe, and stretch your shoulders. Energy follows motion.',
        sender: 'max',
        next: 'end',
      },
      body_no: {
        id: 'body_no',
        text: "Alright. Save your strength for tomorrow's round.",
        sender: 'max',
        next: 'end',
      },
      mind_response: {
        id: 'mind_response',
        text: 'Mental fatigue means too many open tabs.',
        sender: 'max',
        next: 'mind_followup',
      },
      mind_followup: {
        id: 'mind_followup',
        text: "Close one. What's one worry you can release?",
        sender: 'max',
        choices: [
          { id: 'work', text: 'Work stuff', next: 'mind_work' },
          { id: 'relationships', text: 'Relationships', next: 'mind_relationships' },
        ],
      },
      mind_work: {
        id: 'mind_work',
        text: "You can't finish the race today, but you can stop running mentally.",
        sender: 'max',
        next: 'end',
      },
      mind_relationships: {
        id: 'mind_relationships',
        text: 'Text one kind sentence, then disconnect. You\'ll feel lighter.',
        sender: 'max',
        next: 'end',
      },
      end: {
        id: 'end',
        text: "Your rest isn't weakness — it's maintenance.",
        sender: 'max',
      },
    },
  },

  motivation: {
    id: 'motivation',
    title: 'Motivation Session',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: "Motivation isn't magic. It's movement. What do you want right now?",
        sender: 'max',
        choices: [
          { id: 'encouragement', text: 'Encouragement', next: 'encouragement_response' },
          { id: 'tough', text: 'Tough love', next: 'tough_response' },
        ],
      },
      encouragement_response: {
        id: 'encouragement_response',
        text: "You've done hard things before. This is no different.",
        sender: 'max',
        next: 'encouragement_followup',
      },
      encouragement_followup: {
        id: 'encouragement_followup',
        text: "You don't need to feel ready — you just need to start small.",
        sender: 'max',
        next: 'end',
      },
      tough_response: {
        id: 'tough_response',
        text: "You're waiting for the mood instead of making it.",
        sender: 'max',
        next: 'tough_followup',
      },
      tough_followup: {
        id: 'tough_followup',
        text: 'Discipline is choosing now, not later.',
        sender: 'max',
        next: 'tough_challenge',
      },
      tough_challenge: {
        id: 'tough_challenge',
        text: 'Want an action challenge?',
        sender: 'max',
        choices: [
          { id: 'yes', text: 'Yes', next: 'tough_yes' },
          { id: 'no', text: 'No', next: 'tough_no' },
        ],
      },
      tough_yes: {
        id: 'tough_yes',
        text: 'Alright: 5 pushups or 10 seconds of focus — right now.',
        sender: 'max',
        next: 'end',
      },
      tough_no: {
        id: 'tough_no',
        text: "Then promise me you'll do *something* within the hour.",
        sender: 'max',
        next: 'end',
      },
      end: {
        id: 'end',
        text: 'Momentum beats motivation. Always.',
        sender: 'max',
      },
    },
  },

  focus: {
    id: 'focus',
    title: 'Focus Session',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: "Can't concentrate?",
        sender: 'max',
        choices: [
          { id: 'distractions', text: 'Too many distractions', next: 'distractions_response' },
          { id: 'pressure', text: 'Too much pressure', next: 'pressure_response' },
        ],
      },
      distractions_response: {
        id: 'distractions_response',
        text: 'Then we cut noise. 10 minutes phone-free challenge?',
        sender: 'max',
        choices: [
          { id: 'yes', text: 'Yes', next: 'distractions_yes' },
          { id: 'no', text: 'No', next: 'distractions_no' },
        ],
      },
      distractions_yes: {
        id: 'distractions_yes',
        text: 'Nice. Freedom is quieter than you think.',
        sender: 'max',
        next: 'end',
      },
      distractions_no: {
        id: 'distractions_no',
        text: 'Then at least mute notifications. 1% change still counts.',
        sender: 'max',
        next: 'end',
      },
      pressure_response: {
        id: 'pressure_response',
        text: "Pressure means you care — but also that you're human.",
        sender: 'max',
        next: 'pressure_followup',
      },
      pressure_followup: {
        id: 'pressure_followup',
        text: "Let's zoom out: what really matters today?",
        sender: 'max',
        choices: [
          { id: 'task', text: 'Just finish one task', next: 'pressure_task' },
          { id: 'calmer', text: 'Be calmer', next: 'pressure_calmer' },
        ],
      },
      pressure_task: {
        id: 'pressure_task',
        text: 'Perfect. Single target = single win.',
        sender: 'max',
        next: 'end',
      },
      pressure_calmer: {
        id: 'pressure_calmer',
        text: 'Then breathe now. Even stillness is productive.',
        sender: 'max',
        next: 'end',
      },
      end: {
        id: 'end',
        text: 'Focus is peace in disguise.',
        sender: 'max',
      },
    },
  },

  down: {
    id: 'down',
    title: 'Feeling Down Session',
    startId: 'start',
    messages: {
      start: {
        id: 'start',
        text: 'Bad day?',
        sender: 'max',
        choices: [
          { id: 'sucks', text: 'Yeah, everything sucks', next: 'sucks_response' },
          { id: 'empty', text: 'Just empty', next: 'empty_response' },
        ],
      },
      sucks_response: {
        id: 'sucks_response',
        text: "Okay. No pretending. You don't need to 'fix' today.",
        sender: 'max',
        next: 'sucks_followup',
      },
      sucks_followup: {
        id: 'sucks_followup',
        text: 'You just need to stay kind to yourself.',
        sender: 'max',
        next: 'sucks_care',
      },
      sucks_care: {
        id: 'sucks_care',
        text: 'Want a tiny act of care?',
        sender: 'max',
        choices: [
          { id: 'yes', text: 'Yes', next: 'sucks_yes' },
          { id: 'no', text: 'No', next: 'sucks_no' },
        ],
      },
      sucks_yes: {
        id: 'sucks_yes',
        text: 'Drink water or open a window. Micro actions reset mood.',
        sender: 'max',
        next: 'end',
      },
      sucks_no: {
        id: 'sucks_no',
        text: "Then rest. You're allowed to pause.",
        sender: 'max',
        next: 'end',
      },
      empty_response: {
        id: 'empty_response',
        text: 'Emptiness often means you gave too much.',
        sender: 'max',
        next: 'empty_followup',
      },
      empty_followup: {
        id: 'empty_followup',
        text: 'Time to refill, not perform.',
        sender: 'max',
        next: 'empty_question',
      },
      empty_question: {
        id: 'empty_question',
        text: 'What used to make you feel alive?',
        sender: 'max',
        choices: [
          { id: 'music', text: 'Music', next: 'empty_music' },
          { id: 'friends', text: 'Friends', next: 'empty_friends' },
          { id: 'nature', text: 'Nature', next: 'empty_nature' },
        ],
      },
      empty_music: {
        id: 'empty_music',
        text: 'Play one song right now. Let it move you.',
        sender: 'max',
        next: 'end',
      },
      empty_friends: {
        id: 'empty_friends',
        text: "Send one message: 'Hey, thinking of you.' Connection heals.",
        sender: 'max',
        next: 'end',
      },
      empty_nature: {
        id: 'empty_nature',
        text: 'Go outside. Sunlight is medicine.',
        sender: 'max',
        next: 'end',
      },
      end: {
        id: 'end',
        text: "You're not behind. You're rebuilding.",
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
        text: "Let's close the day. What feeling stays with you?",
        sender: 'max',
        choices: [
          { id: 'proud', text: 'Proud', next: 'proud_response' },
          { id: 'tired', text: 'Tired', next: 'tired_response' },
          { id: 'guilty', text: 'Guilty', next: 'guilty_response' },
        ],
      },
      proud_response: {
        id: 'proud_response',
        text: 'Beautiful. Pride is progress — capture it in one line before bed.',
        sender: 'max',
        next: 'end',
      },
      tired_response: {
        id: 'tired_response',
        text: "Rest isn't failure. It's preparation. You showed up, that's enough.",
        sender: 'max',
        next: 'end',
      },
      guilty_response: {
        id: 'guilty_response',
        text: 'Guilt is just proof you care. Forgive yourself before sleeping.',
        sender: 'max',
        next: 'end',
      },
      end: {
        id: 'end',
        text: 'Good night, warrior. Tomorrow is a new experiment.',
        sender: 'max',
      },
    },
  },
};