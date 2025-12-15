import type { CoachId } from './personalities';

export interface UserMessage {
  id: string;
  type: 'user';
  text: string;
  createdAt: number;
}

export interface CoachMessage {
  id: string;
  type: 'coach';
  coachId: CoachId;
  text: string;
  createdAt: number;
}

export interface OptionChip {
  id: string;
  label: string;
  value: string;
}

export interface ConversationState {
  coachId: CoachId;
  messages: (UserMessage | CoachMessage)[];
  step: number;
  isPremium: boolean;
  waitingForUser: boolean;
  ended: boolean;
  maxTurns: number;
  chips?: OptionChip[];
  loading?: boolean;
  typing?: boolean;
}

export interface CoachReplyResult {
  state: ConversationState;
  newMessages: CoachMessage[];
  chips?: OptionChip[];
}
