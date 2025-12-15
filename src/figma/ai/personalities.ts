export type CoachId = 'natalie' | 'max' | string;

export const personalities: Record<CoachId, { name: string }> = {
  natalie: { name: 'Natalie' },
  max: { name: 'Max' },
};
