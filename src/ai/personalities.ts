export type CoachId = 'max' | 'natalie';

export const COACH_PERSONALITIES = {
  max: {
    id: 'max',
    displayName: 'Max',
    tagline: 'Direct, no-excuses 5AM drill coach.',
    style: 'assertive',
    description:
      'Max is straightforward, pushes you to act now, challenges excuses, and keeps messages short and punchy.',
  },
  natalie: {
    id: 'natalie',
    displayName: 'Natalie',
    tagline: 'Warm, assertive, emotionally intelligent coach.',
    style: 'assertive-empathic',
    description:
      'Natalie balances accountability with empathy, asks reflective questions, and helps you understand your patterns before pushing you forward.',
  },
} as const;

