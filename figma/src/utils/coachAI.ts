import { CoachType, Gender } from '../context/AppContext';

interface CoachResponse {
  message: string;
  tone: 'encouraging' | 'motivating' | 'understanding' | 'celebrating';
}

const KEYWORD_RESPONSES = {
  tired: {
    natalie: [
      "I hear you. Being tired is natural. Remember, every small step forward is still progress. Rest when you need to, but don't let fatigue define your day.",
      "Fatigue is a signal, not a stop sign. Listen to your body, {name}. Perhaps a short walk or some fresh air could help you reset.",
      "Tired moments are when your true strength shows. You've got this. Take it one breath at a time."
    ],
    max: [
      "Tired? That's your body talking, {name}. But your mind is stronger. Push through this moment—you'll feel better once you start moving.",
      "Fatigue is temporary. Your goals are permanent. Get up, splash some water on your face, and let's go.",
      "I get it—you're tired. But you didn't come this far to only come this far. You've got more in you."
    ]
  },
  discouraged: {
    natalie: [
      "Oh {name}, setbacks are just setups for comebacks. You're learning and growing, even when it doesn't feel like it.",
      "I understand how hard this feels right now. But remember: progress isn't always linear. You're doing better than you think.",
      "Discouragement is a visitor, not a resident. Let it pass through. Your strength remains."
    ],
    max: [
      "Listen up, {name}. Discouragement is just fear dressed up. You're stronger than this feeling. Focus on what you CAN control.",
      "Tough times don't last, tough people do. And you're tougher than you know. Let's refocus and get back on track.",
      "Feeling down? Good—means you care. Now channel that energy into action. One small win at a time."
    ]
  },
  lazy: {
    natalie: [
      "Sometimes what feels like laziness is actually your body needing rest. Be kind to yourself, {name}. Then gently take the next step.",
      "Motivation comes and goes, but discipline stays. Let's find a small, manageable action you can take right now.",
      "You're not lazy—you're human. Start with just 5 minutes. That's all. Progress builds on itself."
    ],
    max: [
      "Lazy? Or just stuck? Big difference. Let's break the pattern: stand up, stretch, and do ONE thing. Just one. Build from there.",
      "Call it what it is, {name}—resistance. But you're bigger than resistance. Take action, even if it's tiny. Momentum beats motivation.",
      "Lazy is a story you're telling yourself. The truth? You're capable of more. Prove it to yourself right now."
    ]
  },
  motivated: {
    natalie: [
      "I can feel your energy, {name}! This is beautiful. Ride this wave and channel it into something meaningful today.",
      "Yes! This is the spirit. Use this momentum wisely—break down your goals into clear, achievable steps.",
      "Your motivation is inspiring. Remember to pace yourself too. Sustainable progress is what lasts."
    ],
    max: [
      "Now that's what I'm talking about! Let's channel this fire into action. What's the one thing you'll crush today?",
      "Hell yeah, {name}! This is your time. Take this energy and turn it into results. Let's go!",
      "Motivation is great. Now add discipline and you're unstoppable. What's your move?"
    ]
  },
  help: {
    natalie: [
      "I'm here for you, {name}. Tell me what's on your mind. Sometimes just sharing helps us see things more clearly.",
      "Of course I'll help. Take a breath, and let's talk through whatever you're facing. You're not alone in this.",
      "Asking for help is strength, not weakness. What do you need support with today?"
    ],
    max: [
      "I've got your back, {name}. What's the challenge? Let's break it down and figure it out together.",
      "Help is here. What's going on? Be specific and we'll tackle it head-on.",
      "That's what I'm here for. Tell me what you need and let's solve this thing."
    ]
  },
  anxious: {
    natalie: [
      "Take a slow breath with me, {name}. Anxiety is uncomfortable, but it will pass. You're safe right now.",
      "I hear your worry. Let's ground ourselves: name 5 things you can see around you. Present moment, present focus.",
      "Anxiety often comes from thoughts about the future. Let's bring you back to right now. What's one thing you can control in this moment?"
    ],
    max: [
      "Okay, {name}, let's break this down. Anxiety clouds judgment. What are the facts? Separate facts from fears.",
      "I get it—anxiety is real. But so is your strength. Take 3 deep breaths. Then we'll tackle one thing at a time.",
      "Anxious thoughts are just thoughts, not reality. You've handled tough moments before. You'll handle this too."
    ]
  }
};

const DEFAULT_RESPONSES = {
  natalie: [
    "I'm here to support you, {name}. How are you feeling about your progress?",
    "Every conversation is a step forward. What's on your mind today?",
    "I appreciate you sharing with me. Tell me more about what you're experiencing.",
    "Your journey is unique, {name}. What would be most helpful to talk about right now?"
  ],
  max: [
    "Let's talk, {name}. What's the situation?",
    "I'm listening. What do you need to work through?",
    "Straight talk—what's going on with you today?",
    "Alright, {name}, let's get into it. What's up?"
  ]
};

export function generateCoachResponse(
  userMessage: string,
  coach: CoachType,
  userName: string,
  gender: Gender
): CoachResponse {
  const message = userMessage.toLowerCase();
  
  // Detect keywords
  let responsePool: string[] | undefined;
  let tone: CoachResponse['tone'] = 'encouraging';

  if (message.includes('tired') || message.includes('exhausted') || message.includes('sleepy')) {
    responsePool = KEYWORD_RESPONSES.tired[coach];
    tone = 'understanding';
  } else if (message.includes('discourage') || message.includes('give up') || message.includes('quit')) {
    responsePool = KEYWORD_RESPONSES.discouraged[coach];
    tone = 'encouraging';
  } else if (message.includes('lazy') || message.includes('unmotivated') || message.includes('stuck')) {
    responsePool = KEYWORD_RESPONSES.lazy[coach];
    tone = 'motivating';
  } else if (message.includes('motivat') || message.includes('excited') || message.includes('ready') || message.includes('pumped')) {
    responsePool = KEYWORD_RESPONSES.motivated[coach];
    tone = 'celebrating';
  } else if (message.includes('help') || message.includes('advice') || message.includes('suggest')) {
    responsePool = KEYWORD_RESPONSES.help[coach];
    tone = 'understanding';
  } else if (message.includes('anxious') || message.includes('worried') || message.includes('nervous') || message.includes('stress')) {
    responsePool = KEYWORD_RESPONSES.anxious[coach];
    tone = 'understanding';
  } else {
    // Default responses
    responsePool = DEFAULT_RESPONSES[coach];
    tone = 'encouraging';
  }

  // Pick a random response from the pool
  const response = responsePool[Math.floor(Math.random() * responsePool.length)];
  
  // Replace placeholders
  const finalMessage = response
    .replace(/{name}/g, userName)
    .replace(/{gender}/g, gender === 'she' ? 'she' : 'he');

  return {
    message: finalMessage,
    tone
  };
}

export function getCheckInMessage(
  onTime: boolean,
  streak: number,
  coach: CoachType,
  userName: string
): string {
  if (streak === 0 || streak === 1) {
    if (coach === 'natalie') {
      return onTime
        ? `Welcome, ${userName}. You're here, and that's what matters. Let's build this habit together, one day at a time.`
        : `${userName}, you showed up—that's the hardest part. Don't worry about the time. Progress, not perfection.`;
    } else {
      return onTime
        ? `Strong start, ${userName}. Day one is in the books. Now let's keep this momentum going.`
        : `${userName}, you're here—that counts. Timing will improve. Focus on consistency first.`;
    }
  }

  if (streak === 7) {
    if (coach === 'natalie') {
      return onTime
        ? `One full week, ${userName}! Your commitment is beautiful. You're building something lasting.`
        : `Seven days, ${userName}. You're showing up. That's the foundation of everything.`;
    } else {
      return onTime
        ? `Week one complete, ${userName}! This is how habits become identity. Keep grinding.`
        : `Seven days strong, ${userName}. You're proving your commitment. Timing will come.`;
    }
  }

  if (streak >= 30) {
    if (coach === 'natalie') {
      return onTime
        ? `${userName}, you've built something remarkable. 30 days of consistency. This is who you are now.`
        : `30 days of showing up, ${userName}. You've proven your dedication. The time is just details.`;
    } else {
      return onTime
        ? `30 days, ${userName}. You're not just doing it—you ARE it. This is elite-level discipline.`
        : `${userName}, 30 days of showing up. That's champion mindset. Timing is the next level.`;
    }
  }

  // General responses
  if (coach === 'natalie') {
    return onTime
      ? `Another day, another step forward, ${userName}. I'm proud of your consistency.`
      : `You're here, ${userName}. That's what matters. Keep building, one day at a time.`;
  } else {
    return onTime
      ? `On point, ${userName}. Day ${streak}. Keep stacking wins.`
      : `Day ${streak}, ${userName}. You showed up. That's the baseline. Now tighten up the timing.`;
  }
}
