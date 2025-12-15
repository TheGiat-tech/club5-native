import { CoachType } from '../types';

export const COACHES = {
  natalie: {
    name: 'Natalie',
    emoji: '😊',
    gradient: ['#A855F7', '#EC4899'] as const,
    description: 'Gentle, empathetic, and nurturing',
    style: 'Compassionate and understanding approach',
  },
  max: {
    name: 'Max',
    emoji: '😎',
    gradient: ['#3B82F6', '#6366F1'] as const,
    description: 'Direct, motivating, and disciplined',
    style: 'Straight-talk and accountability',
  },
};

export const getCoachInfo = (coach: CoachType) => {
  return COACHES[coach];
};
