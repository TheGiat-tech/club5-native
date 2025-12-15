export type UserMessage = {
  id?: string;
  type?: 'user';
  text: string;
};

export type CoachMessage = {
  id?: string;
  type?: 'coach';
  text: string;
};

export type OptionChip = {
  id?: string;
  label: string;
  value?: string;
};
