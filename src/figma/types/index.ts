import { type SupportedLocale } from '../i18n';

export type CoachType = 'natalie' | 'max';
export type Gender = 'male' | 'female' | 'other' | 'he' | 'she';
export type ThemeMode = 'light' | 'dark' | 'system' | 'clean';

export interface Profile {
  firstName: string;
  gender: 'he' | 'she';
  wakeTime: string;
  coach: CoachType;
}

export interface UserData {
  displayName?: string;
  firstName: string;
  gender?: 'male' | 'female' | 'other' | Gender;
  coach: CoachType;
  preferredCoach?: CoachType;
  preferredLocale?: SupportedLocale;
  wakeUpTime: string;
  preferredWakeTime?: string | number;
  darkMode: boolean;
  themeMode: ThemeMode;
  firstChallengeStartDate?: string | null;
  hasCompletedFreeChallenge?: boolean;
  totalCheckIns?: number;
  currentStreak?: number;
  bestStreak?: number;
  lastCheckInDate?: string | null;
  isProfileComplete?: boolean;
  remoteId?: string;
  lastSyncedAt?: string;
  hasAskedForReview?: boolean;
  isPremium?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'coach';
  timestamp: string;
}

export interface CheckIn {
  date: string;
  timestamp: string;
  onTime: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  timestamp: string;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Momentum: undefined;
  Coach: undefined;
  Settings: undefined;
};
