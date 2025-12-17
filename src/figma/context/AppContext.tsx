import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback, useRef } from 'react';
import { Linking, Platform, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import * as StoreReview from 'expo-store-review';
import { UserData, ChatMessage, JournalEntry, Gender, CoachType, Profile } from '../types';
import { storage } from '../utils/storage';
import { getToday, isWithinWakeUpWindow } from '../utils/dateUtils';
import { cancelMissReminderNotification, scheduleWakeNotificationsForUser } from '../utils/notifications';
import { initI18n, setLocale, getBestDeviceLocale, type SupportedLocale } from '../i18n';
import { supabase } from '@/src/lib/supabaseClient';
import { getIsProFromCustomerInfo } from '@/src/lib/revenuecat';

type CheckIn = { date: string; timestamp?: string; onTime?: boolean };

const PREMIUM_KEY = 'club5_is_premium';
const DEVICE_ID_KEY = 'club5_device_id';

const normalizeDate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function computeStreak(list: CheckIn[]) {
  const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date));
  let best = 0;
  let current = 0;
  let prev: string | null = null;

  for (const item of sorted) {
    if (!prev) {
      current = 1;
    } else {
      const diff = (new Date(item.date).getTime() - new Date(prev).getTime()) / 86400000;
      if (diff === 1) current++;
      else current = 1;
    }
    if (current > best) best = current;
    prev = item.date;
  }
  return { currentStreak: current, bestStreak: best };
}

interface AppContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  updateProfile: (data: { displayName?: string; gender?: Gender; preferredCoach?: CoachType }) => Promise<void>;
  language: SupportedLocale;
  setLanguage: (locale: SupportedLocale) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  profile: Profile;
  saveProfile: (data: Partial<Profile>) => Promise<void>;
  isProfileComplete: boolean;
  
  // Check-ins
  checkIns: CheckIn[];
  hasCheckedInToday: boolean;
  currentStreak: number;
  bestStreak: number;
  totalCheckIns: number;
  successRate: number;
  checkInToday: () => void;
  checkInNow: () => Promise<{ success: boolean; wasLate?: boolean; updatedUser?: UserData & { checkIns: CheckIn[] } }>;
  resetChallengeProgress: () => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  
  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  
  // Coach message
  hasSeenTodayMessage: boolean;
  markMessageSeen: () => void;
  
  // Theme
  isDarkMode: boolean;

  // Premium
  isPremium: boolean;
  setPremiumFromPurchase: () => Promise<void>;
  restorePremiumFromPurchases: () => Promise<boolean>;
  
  // Reset
  resetAllData: () => void;
  
  // Loading
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER_DATA: UserData = {
  displayName: '',
  firstName: '',
  gender: 'he',
  coach: 'natalie',
  preferredCoach: 'natalie',
  preferredLocale: 'en',
  wakeUpTime: '5:00 AM',
  preferredWakeTime: '5:00 AM',
  darkMode: false,
  themeMode: 'system',
  isPremium: false,
  hasAskedForReview: false,
  firstChallengeStartDate: null,
  hasCompletedFreeChallenge: false,
  totalCheckIns: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastCheckInDate: null,
  isProfileComplete: false,
};

const DEFAULT_WAKE_WINDOW_MINUTES = 15;

const parseWakeTimeToDate = (wakeUpTime: string): Date => {
  const [timePart = '', period = 'AM'] = wakeUpTime.split(' ');
  const [hoursStr = '5', minutesStr = '00'] = timePart.split(':');
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  let hour24 = hours;
  if (period.toUpperCase() === 'PM' && hours !== 12) hour24 += 12;
  if (period.toUpperCase() === 'AM' && hours === 12) hour24 = 0;

  const target = new Date();
  target.setHours(hour24, minutes || 0, 0, 0);
  return target;
};

const toProfile = (data: UserData): Profile => ({
  firstName: data.firstName || data.displayName || '',
  gender: data.gender === 'she' || data.gender === 'female' ? 'she' : 'he',
  wakeTime: data.wakeUpTime || '',
  coach: data.preferredCoach || data.coach || 'natalie',
});

const profileIsComplete = (profile: Profile) =>
  Boolean(profile.firstName && profile.wakeTime && profile.coach && (profile.gender === 'he' || profile.gender === 'she'));

const normalizeGender = (gender?: Gender): Gender => {
  if (gender === 'female' || gender === 'she') return 'she';
  if (gender === 'male' || gender === 'he') return 'he';
  return gender ?? 'he';
};

export function AppProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [isPremium, setIsPremium] = useState(false);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [hasSeenTodayMessage, setHasSeenTodayMessage] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [language, setLanguageState] = useState<SupportedLocale>('en');
  const initialSyncAttempted = useRef(false);

  // Determine dark mode based on theme setting
  const isDarkMode = 
    userData.themeMode === 'dark' ? true :
    userData.themeMode === 'clean' ? true :
    userData.themeMode === 'light' ? false :
    systemColorScheme === 'dark';

  const profile = useMemo(() => toProfile(userData), [userData]);
  const isProfileComplete = useMemo(
    () => Boolean(userData.isProfileComplete) || profileIsComplete(profile),
    [profile, userData.isProfileComplete],
  );

  const persistUserData = useCallback(
    async (next: UserData) => {
      setUserData(next);
      await storage.setUserData(next);
    },
    [],
  );

  const getDeviceId = useCallback(async (): Promise<string | null> => {
    try {
      const existing = await AsyncStorage.getItem(DEVICE_ID_KEY);
      if (existing) return existing;
      const generated = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      await AsyncStorage.setItem(DEVICE_ID_KEY, generated);
      return generated;
    } catch (error) {
      console.warn('Failed to get device id', error);
      return null;
    }
  }, []);

  const syncUserToSupabase = useCallback(
    async (updatedData: UserData) => {
      if (!supabase) return;
      const profileReady = profileIsComplete(toProfile(updatedData));
      if (!profileReady) return;
      try {
        const deviceId = updatedData.remoteId || (await getDeviceId());
        if (!deviceId) return;

        const syncedAt = new Date().toISOString();
        const payload = {
          id: deviceId,
          display_name: updatedData.displayName || updatedData.firstName || null,
          gender: updatedData.gender ?? null,
          preferred_coach: updatedData.preferredCoach ?? updatedData.coach ?? null,
          theme_mode: updatedData.themeMode ?? null,
          total_days: updatedData.totalCheckIns ?? 0,
          current_streak: updatedData.currentStreak ?? 0,
          last_check_in: updatedData.lastCheckInDate ?? null,
          last_synced_at: syncedAt,
        };

        const { data, error } = await supabase
          .from('user_profiles')
          .upsert(payload, { onConflict: 'id' })
          .select('id');

        if (error) {
          console.warn('Supabase sync failed', error);
          return;
        }

        const nextRemoteId = data?.[0]?.id ?? deviceId;
        const shouldUpdate = updatedData.remoteId !== nextRemoteId || updatedData.lastSyncedAt !== syncedAt;
        if (shouldUpdate) {
          const nextUser = { ...updatedData, remoteId: nextRemoteId, lastSyncedAt: syncedAt };
          await persistUserData(nextUser);
        }
      } catch (error) {
        console.warn('Supabase sync error', error);
      }
    },
    [getDeviceId, persistUserData],
  );

  const maybeAskForReview = useCallback(
    async (user: UserData): Promise<void> => {
      try {
        if (user.hasAskedForReview) return;
        const eligible = (user.currentStreak ?? 0) >= 7;
        if (!eligible) return;

        if (await StoreReview.isAvailableAsync()) {
          await StoreReview.requestReview();
        } else {
          // Fallback to opening store URLs manually
          // Note: iOS App Store ID should be added once the app is published
          const androidUrl = 'https://play.google.com/store/apps/details?id=com.giatech.club5native';
          const iosUrl = null; // Set to 'https://apps.apple.com/app/club5native/idXXXXXXXXXX' once published

          const storeUrl = Platform.select({
            ios: iosUrl,
            android: androidUrl,
            default: androidUrl,
          });

          if (storeUrl) {
            await Linking.openURL(storeUrl);
          } else {
            console.warn('Store review not available and no fallback URL configured');
          }
        }

        const updated: UserData = { ...user, hasAskedForReview: true };
        await persistUserData(updated);
      } catch (err) {
        console.warn('Failed to request review', err);
      }
    },
    [persistUserData],
  );

  const applyPremiumFlag = useCallback(async (value: boolean) => {
    setIsPremium(value);
    setUserData((prev) => {
      const next = { ...prev, isPremium: value };
      void storage.setUserData(next);
      return next;
    });
    await AsyncStorage.setItem(PREMIUM_KEY, value ? 'true' : 'false');
  }, []);

  const setPremiumFromPurchase = useCallback(async () => {
    if (isPremium) return;
    await applyPremiumFlag(true);
  }, [applyPremiumFlag, isPremium]);

  const refreshRevenueCatStatus = useCallback(async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const pro = getIsProFromCustomerInfo(customerInfo);
      if (pro !== isPremium) {
        await applyPremiumFlag(pro);
      }
      return pro;
    } catch (error) {
      console.warn('Failed to refresh purchases', error);
      return isPremium;
    }
  }, [applyPremiumFlag, isPremium]);

  const restorePremiumFromPurchases = useCallback(async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      const pro = getIsProFromCustomerInfo(customerInfo);
      if (pro) {
        await applyPremiumFlag(true);
        return true;
      }
      return false;
    } catch (error) {
      console.warn('Failed to restore purchases', error);
      return false;
    }
  }, [applyPremiumFlag]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    void refreshRevenueCatStatus();
  }, [refreshRevenueCatStatus]);

  useEffect(() => {
    if (!isLoading && isProfileComplete && !initialSyncAttempted.current) {
      initialSyncAttempted.current = true;
      void syncUserToSupabase(userData);
    }
  }, [isLoading, isProfileComplete, syncUserToSupabase, userData]);

  const updateStats = useCallback(() => {
    const today = getToday();
    const todayCheckIn = checkIns.find((c) => c.date === today);
    setHasCheckedInToday((prev) => {
      const next = Boolean(todayCheckIn);
      return prev === next ? prev : next;
    });

    const { currentStreak: streak, bestStreak: best } = computeStreak(checkIns);
    setCurrentStreak((prev) => (prev === streak ? prev : streak));
    setBestStreak((prev) => (prev === best ? prev : best));
    setTotalCheckIns((prev) => (prev === checkIns.length ? prev : checkIns.length));

    // Calculate success rate (last 7 days)
    const last7Days: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }

    const completedDays = last7Days.filter((date) => checkIns.some((c) => c.date === date)).length;
    const nextSuccessRate = Math.round((completedDays / 7) * 100);
    setSuccessRate((prev) => (prev === nextSuccessRate ? prev : nextSuccessRate));

    setUserData((prev) => {
      const startDate = prev.firstChallengeStartDate;
      const updatedUser: UserData = {
        ...prev,
        currentStreak: streak,
        bestStreak: best,
        totalCheckIns: checkIns.length,
        lastCheckInDate: todayCheckIn?.date ?? prev.lastCheckInDate ?? null,
      };

      let changed = false;

      if (!startDate && checkIns.length > 0) {
        updatedUser.firstChallengeStartDate = today;
        changed = true;
      }

      const uniqueDays = new Set(checkIns.map((c) => c.date)).size;
      const effectiveStartDate = updatedUser.firstChallengeStartDate;
      if (effectiveStartDate) {
        const daysSinceStart =
          Math.floor((new Date(today).getTime() - new Date(effectiveStartDate).getTime()) / (1000 * 60 * 60 * 24)) +
          1;
        if (uniqueDays >= 7 || daysSinceStart >= 7) {
          if (!updatedUser.hasCompletedFreeChallenge) {
            updatedUser.hasCompletedFreeChallenge = true;
            changed = true;
          }
        }
      }

      const hasUserChanged =
        changed ||
        updatedUser.currentStreak !== prev.currentStreak ||
        updatedUser.bestStreak !== prev.bestStreak ||
        updatedUser.totalCheckIns !== prev.totalCheckIns ||
        updatedUser.lastCheckInDate !== prev.lastCheckInDate ||
        updatedUser.firstChallengeStartDate !== prev.firstChallengeStartDate ||
        updatedUser.hasCompletedFreeChallenge !== prev.hasCompletedFreeChallenge;

      if (!hasUserChanged) {
        return prev;
      }

      void storage.setUserData(updatedUser);
      return updatedUser;
    });
  }, [checkIns]);

  // Update stats when checkIns change
  useEffect(() => {
    updateStats();
  }, [updateStats]);

  // Update notification when wake time changes
  useEffect(() => {
    if (hasCompletedOnboarding && userData.wakeUpTime) {
      const wakeStart = parseWakeTimeToDate(userData.wakeUpTime);
      void scheduleWakeNotificationsForUser({
        wakeStartDate: wakeStart,
        wakeWindowMinutes: DEFAULT_WAKE_WINDOW_MINUTES,
      }).catch((error) => console.warn('Failed to schedule wake notifications', error));
    }
  }, [userData.wakeUpTime, hasCompletedOnboarding]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      const [
        savedOnboarding,
        savedUserData,
        savedCheckIns,
        savedChatMessages,
        savedJournalEntries,
        savedMessageSeen,
        savedPremiumFlag,
      ] = await Promise.all([
        storage.getOnboardingComplete(),
        storage.getUserData<UserData>(),
        storage.getCheckIns<CheckIn>(),
        storage.getChatMessages<ChatMessage>(),
        storage.getJournalEntries<JournalEntry>(),
        storage.getMessageSeenToday(),
        AsyncStorage.getItem(PREMIUM_KEY),
      ]);

      const mergedUser = savedUserData
        ? { ...DEFAULT_USER_DATA, ...savedUserData, isProfileComplete: savedUserData.isProfileComplete ?? false }
        : DEFAULT_USER_DATA;
      const resolvedPremium = Boolean((mergedUser.isPremium ?? false) || savedPremiumFlag === 'true');
      mergedUser.isPremium = resolvedPremium;
      const initialLocale: SupportedLocale =
        (mergedUser.preferredLocale as SupportedLocale) ?? getBestDeviceLocale();
      initI18n(initialLocale);
      setLanguageState(initialLocale);
      if (!mergedUser.preferredLocale) {
        mergedUser.preferredLocale = initialLocale;
        await storage.setUserData(mergedUser);
      }
      const mappedCheckIns: CheckIn[] = Array.isArray(savedCheckIns)
        ? savedCheckIns.map((c: any) => ({ date: c?.date ?? getToday() }))
        : [];
      if (mappedCheckIns.length) {
        setCheckIns(mappedCheckIns);
      }
      
      const mergedProfile = toProfile(mergedUser);
      const profileComplete = profileIsComplete(mergedProfile);
      setHasCompletedOnboarding(Boolean(savedOnboarding && profileComplete));
      const { currentStreak: streak, bestStreak: best } = computeStreak(mappedCheckIns);
      const lastCheckInDate = mappedCheckIns.length ? mappedCheckIns[mappedCheckIns.length - 1].date : null;
      const enrichedUser = {
        ...mergedUser,
        currentStreak: streak,
        bestStreak: best,
        totalCheckIns: mappedCheckIns.length,
        lastCheckInDate,
      };
      setUserData(enrichedUser);
      setIsPremium(resolvedPremium);
      setCurrentStreak(streak);
      setBestStreak(best);
      setTotalCheckIns(mappedCheckIns.length);
      setHasCheckedInToday(mappedCheckIns.some((c) => c.date === getToday()));
      
      if (savedChatMessages) {
        setChatMessages(savedChatMessages);
      }
      
      if (savedJournalEntries) {
        setJournalEntries(savedJournalEntries);
      }

      // Check if message was seen today
      const today = getToday();
      if (savedMessageSeen === today) {
        setHasSeenTodayMessage(true);
      } else {
        setHasSeenTodayMessage(false);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = useCallback(async () => {
    setHasCompletedOnboarding(true);
    await storage.setOnboardingComplete(true);
  }, []);

  const updateUserData = useCallback(
    async (data: Partial<UserData>) => {
      const normalizedGender = data.gender ? normalizeGender(data.gender) : undefined;
      const updated = {
        ...userData,
        ...data,
        ...(normalizedGender ? { gender: normalizedGender } : {}),
        isPremium,
      };
      if (data.preferredLocale) {
        setLanguageState(data.preferredLocale as SupportedLocale);
        setLocale(data.preferredLocale);
      }
      setUserData(updated);
      await storage.setUserData(updated);

      if (profileIsComplete(toProfile(updated))) {
        void syncUserToSupabase(updated);
      }

      if (profileIsComplete(toProfile(updated)) && !hasCompletedOnboarding) {
        setHasCompletedOnboarding(true);
        await storage.setOnboardingComplete(true);
      }
    },
    [hasCompletedOnboarding, isPremium, syncUserToSupabase, userData],
  );

  const setLanguage = useCallback(
    (locale: SupportedLocale) => {
      setLanguageState(locale);
      setLocale(locale);
      void updateUserData({ preferredLocale: locale });
    },
    [updateUserData],
  );

  const updateProfile = useCallback(
    async (data: { displayName?: string; gender?: Gender; preferredCoach?: CoachType }) => {
      const normalizedGender = data.gender ? normalizeGender(data.gender) : undefined;
      const next = {
        ...userData,
        displayName: data.displayName ?? userData.displayName,
        firstName: data.displayName ?? userData.firstName,
        gender: normalizedGender ?? userData.gender,
        preferredCoach: data.preferredCoach ?? userData.preferredCoach,
        coach: data.preferredCoach ?? userData.coach,
      };
      setUserData(next);
      await storage.setUserData(next);
      if (profileIsComplete(toProfile(next))) {
        void syncUserToSupabase(next);
      }

      if (profileIsComplete(toProfile(next)) && !hasCompletedOnboarding) {
        setHasCompletedOnboarding(true);
        await storage.setOnboardingComplete(true);
      }
    },
    [hasCompletedOnboarding, syncUserToSupabase, userData],
  );

  const saveProfile = useCallback(
    async (data: Partial<Profile>) => {
      const baseProfile = toProfile(userData);
      const mergedProfile = { ...baseProfile, ...data };
      const updatedUser: UserData = {
        ...userData,
        displayName: mergedProfile.firstName || userData.displayName,
        firstName: mergedProfile.firstName || userData.firstName,
        gender: normalizeGender(mergedProfile.gender),
        preferredCoach: mergedProfile.coach,
        coach: mergedProfile.coach,
        wakeUpTime: mergedProfile.wakeTime,
        preferredWakeTime: mergedProfile.wakeTime,
        isProfileComplete: true,
      };

      setUserData(updatedUser);
      await storage.setUserData(updatedUser);
      if (profileIsComplete(mergedProfile)) {
        void syncUserToSupabase(updatedUser);
      }

      if (profileIsComplete(mergedProfile) && !hasCompletedOnboarding) {
        setHasCompletedOnboarding(true);
        await storage.setOnboardingComplete(true);
      }
    },
    [hasCompletedOnboarding, syncUserToSupabase, userData],
  );

  const checkInNow = useCallback(async () => {
    const now = new Date();
    const today = normalizeDate(now);
    const existing = checkIns || [];

    if (existing.some((x) => x.date === today)) {
      return { success: false, updatedUser: { ...userData, checkIns: existing } };
    }

    const onTime = isWithinWakeUpWindow(now, userData.wakeUpTime);
    const updatedCheckIn: CheckIn = {
      date: today,
      timestamp: now.toISOString(),
      onTime,
    };

    const updated = [...existing, updatedCheckIn];
    const { currentStreak: streak, bestStreak: best } = computeStreak(updated);
    const total = updated.length;

    const newUserState: UserData = {
      ...userData,
      currentStreak: streak,
      bestStreak: best,
      totalCheckIns: total,
      lastCheckInDate: today,
      firstChallengeStartDate: userData.firstChallengeStartDate ?? today,
    };

    setCheckIns(updated);
    setHasCheckedInToday(true);
    setCurrentStreak(streak);
    setBestStreak(best);
    setTotalCheckIns(total);
    setUserData(newUserState);

    await storage.setCheckIns(updated as any);
    await storage.setUserData(newUserState);
    await AsyncStorage.setItem('APP_DATA', JSON.stringify({ ...newUserState, checkIns: updated }));
    void syncUserToSupabase(newUserState);
    void maybeAskForReview(newUserState);

    try {
      await cancelMissReminderNotification();
    } catch (error) {
      console.warn('Failed to cancel miss reminder notification', error);
    }

    return { success: true, wasLate: !onTime, updatedUser: { ...newUserState, checkIns: updated } };
  }, [checkIns, maybeAskForReview, syncUserToSupabase, userData]);

  const checkInToday = useCallback(async () => {
    await checkInNow();
  }, [checkInNow]);

  const addChatMessage = useCallback(
    async (message: ChatMessage) => {
      const updated = [...chatMessages, message];
      setChatMessages(updated);
      await storage.setChatMessages(updated);
    },
    [chatMessages],
  );

  const resetChallengeProgress = useCallback(async () => {
    // Resets streak and total check-ins so a free user can restart the 7-day challenge.
    setCheckIns([]);
    setHasCheckedInToday(false);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalCheckIns(0);
    setSuccessRate(0);
    await storage.setCheckIns([]);
    const updatedUser = {
      ...userData,
      firstChallengeStartDate: null,
      hasCompletedFreeChallenge: false,
      currentStreak: 0,
      bestStreak: 0,
      totalCheckIns: 0,
      lastCheckInDate: null,
    };
    setUserData(updatedUser);
    await storage.setUserData(updatedUser);
  }, [userData]);

  const addJournalEntry = useCallback(
    async (entry: JournalEntry) => {
      const updated = [...journalEntries, entry];
      setJournalEntries(updated);
      await storage.setJournalEntries(updated);
    },
    [journalEntries],
  );

  const markMessageSeen = useCallback(async () => {
    const today = getToday();
    setHasSeenTodayMessage(true);
    await storage.setMessageSeenToday(today);
  }, []);

  const resetAllData = useCallback(async () => {
    await storage.clear();
    await AsyncStorage.removeItem(PREMIUM_KEY);
    setHasCompletedOnboarding(false);
    setUserData(DEFAULT_USER_DATA);
    setIsPremium(false);
    setCheckIns([]);
    setChatMessages([]);
    setJournalEntries([]);
    setHasCheckedInToday(false);
    setHasSeenTodayMessage(false);
    setCurrentStreak(0);
    setBestStreak(0);
    setTotalCheckIns(0);
    setSuccessRate(0);
  }, []);

  const contextValue = useMemo(
    () => ({
      userData,
      setUserData,
      updateUserData,
      updateProfile,
      language,
      setLanguage,
      hasCompletedOnboarding,
      completeOnboarding,
      profile,
      saveProfile,
      isProfileComplete,
      checkIns,
      hasCheckedInToday,
      currentStreak,
      bestStreak,
      totalCheckIns,
      successRate,
      checkInToday,
      checkInNow,
      resetChallengeProgress,
      chatMessages,
      addChatMessage,
      journalEntries,
      addJournalEntry,
      hasSeenTodayMessage,
      markMessageSeen,
      isDarkMode,
      isPremium,
      setPremiumFromPurchase,
      restorePremiumFromPurchases,
      resetAllData,
      isLoading,
    }),
    [
      userData,
      updateUserData,
      updateProfile,
      language,
      setLanguage,
      hasCompletedOnboarding,
      completeOnboarding,
      profile,
      saveProfile,
      isProfileComplete,
      checkIns,
      hasCheckedInToday,
      currentStreak,
      bestStreak,
      totalCheckIns,
      successRate,
      checkInToday,
      checkInNow,
      resetChallengeProgress,
      chatMessages,
      addChatMessage,
      journalEntries,
      addJournalEntry,
      hasSeenTodayMessage,
      markMessageSeen,
      isDarkMode,
      isPremium,
      setPremiumFromPurchase,
      restorePremiumFromPurchases,
      resetAllData,
      isLoading,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
