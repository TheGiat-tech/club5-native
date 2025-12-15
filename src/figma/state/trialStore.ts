import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simple 14-day free trial tracking for premium features on Momentum.
// Stores trialStartDate in AsyncStorage and exposes derived state.

export interface TrialInfo {
  trialStartDate: string | null;
  trialLengthDays: number;
  daysUsed: number;
  daysLeft: number;
  isTrialActive: boolean;
}

const TRIAL_START_KEY = 'trialStartDate';
const TRIAL_LENGTH_DAYS = 14;

const getMidnight = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const calculateDiff = (start: Date, today: Date) => {
  const startDay = getMidnight(start).getTime();
  const todayDay = getMidnight(today).getTime();
  const diff = todayDay - startDay;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  return days;
};

export function useTrialInfo(): TrialInfo {
  const [info, setInfo] = useState<TrialInfo>({
    trialStartDate: null,
    trialLengthDays: TRIAL_LENGTH_DAYS,
    daysUsed: 0,
    daysLeft: TRIAL_LENGTH_DAYS,
    isTrialActive: true,
  });

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const stored = await AsyncStorage.getItem(TRIAL_START_KEY);
        let startDate = stored ? new Date(stored) : new Date();
        if (!stored || Number.isNaN(startDate.getTime())) {
          startDate = new Date();
          await AsyncStorage.setItem(TRIAL_START_KEY, startDate.toISOString());
        }

        const daysUsed = calculateDiff(startDate, new Date());
        const daysLeft = Math.max(0, TRIAL_LENGTH_DAYS - daysUsed);
        const next: TrialInfo = {
          trialStartDate: startDate.toISOString(),
          trialLengthDays: TRIAL_LENGTH_DAYS,
          daysUsed,
          daysLeft,
          isTrialActive: daysLeft > 0,
        };
        if (mounted) {
          setInfo(next);
        }
      } catch (e) {
        // Fallback: reset trial if storage fails
        const startDate = new Date();
        const next: TrialInfo = {
          trialStartDate: startDate.toISOString(),
          trialLengthDays: TRIAL_LENGTH_DAYS,
          daysUsed: 0,
          daysLeft: TRIAL_LENGTH_DAYS,
          isTrialActive: true,
        };
        if (mounted) {
          setInfo(next);
        }
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, []);

  return info;
}
