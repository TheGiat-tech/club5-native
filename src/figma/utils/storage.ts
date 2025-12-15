import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDING_COMPLETE: '@club5_onboarding_complete',
  USER_DATA: '@club5_user_data',
  CHECK_INS: '@club5_checkins',
  CHAT_MESSAGES: '@club5_chat_messages',
  JOURNAL_ENTRIES: '@club5_journal_entries',
  MESSAGE_SEEN_TODAY: '@club5_message_seen_today',
  QUICK_START_SEEN: '@club5_quickstart_seen',
  THEME_MODE: '@club5_theme_mode',
};

export const storage = {
  // Generic get/set
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  async set(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },

  // Specific methods
  async getOnboardingComplete(): Promise<boolean> {
    const value = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETE);
    return value === 'true';
  },

  async setOnboardingComplete(complete: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETE, String(complete));
  },

  async getUserData<T>(): Promise<T | null> {
    return this.get<T>(KEYS.USER_DATA);
  },

  async setUserData(data: any): Promise<void> {
    await this.set(KEYS.USER_DATA, data);
  },

  async getCheckIns<T>(): Promise<T[]> {
    const data = await this.get<T[]>(KEYS.CHECK_INS);
    return data || [];
  },

  async setCheckIns(checkIns: any[]): Promise<void> {
    await this.set(KEYS.CHECK_INS, checkIns);
  },

  async getChatMessages<T>(): Promise<T[]> {
    const data = await this.get<T[]>(KEYS.CHAT_MESSAGES);
    return data || [];
  },

  async setChatMessages(messages: any[]): Promise<void> {
    await this.set(KEYS.CHAT_MESSAGES, messages);
  },

  async getJournalEntries<T>(): Promise<T[]> {
    const data = await this.get<T[]>(KEYS.JOURNAL_ENTRIES);
    return data || [];
  },

  async setJournalEntries(entries: any[]): Promise<void> {
    await this.set(KEYS.JOURNAL_ENTRIES, entries);
  },

  async getMessageSeenToday(): Promise<string | null> {
    return await AsyncStorage.getItem(KEYS.MESSAGE_SEEN_TODAY);
  },

  async setMessageSeenToday(date: string): Promise<void> {
    await AsyncStorage.setItem(KEYS.MESSAGE_SEEN_TODAY, date);
  },

  async getQuickStartSeen(): Promise<boolean> {
    const value = await AsyncStorage.getItem(KEYS.QUICK_START_SEEN);
    return value === 'true';
  },

  async setQuickStartSeen(seen: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.QUICK_START_SEEN, String(seen));
  },
};
