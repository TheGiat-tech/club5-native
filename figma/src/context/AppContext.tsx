import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CoachType = 'natalie' | 'max';
export type Gender = 'he' | 'she';

export interface UserData {
  firstName: string;
  gender: Gender;
  coach: CoachType;
  wakeUpTime: string;
  focusMode: boolean;
  darkMode: boolean;
  themeMode: 'light' | 'dark' | 'system';
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

interface AppContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  
  // Check-ins
  checkIns: CheckIn[];
  hasCheckedInToday: boolean;
  currentStreak: number;
  successRate: number;
  checkInToday: () => void;
  
  // Coach message
  hasSeenTodayMessage: boolean;
  markMessageSeen: () => void;
  
  // Quick Start Guide
  hasSeenQuickStart: boolean;
  markQuickStartSeen: () => void;
  
  // Reset
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER_DATA: UserData = {
  firstName: '',
  gender: 'he',
  coach: 'natalie',
  wakeUpTime: '5:00 AM',
  focusMode: false,
  darkMode: false,
  themeMode: 'system',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [hasSeenTodayMessage, setHasSeenTodayMessage] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [hasSeenQuickStart, setHasSeenQuickStart] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Update stats when checkIns change
  useEffect(() => {
    updateStats();
  }, [checkIns]);

  const loadData = () => {
    try {
      const savedOnboarding = localStorage.getItem('club5_onboarding_complete');
      const savedUserData = localStorage.getItem('club5_user_data');
      const savedCheckIns = localStorage.getItem('club5_checkins');
      const savedMessageSeen = localStorage.getItem('club5_message_seen_today');
      const savedQuickStartSeen = localStorage.getItem('club5_quickstart_seen');

      if (savedOnboarding === 'true') {
        setHasCompletedOnboarding(true);
      }

      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      }

      if (savedCheckIns) {
        const parsed = JSON.parse(savedCheckIns);
        if (Array.isArray(parsed)) {
          setCheckIns(parsed);
        }
      }

      // Check if message was seen today
      const today = new Date().toISOString().split('T')[0];
      if (savedMessageSeen === today) {
        setHasSeenTodayMessage(true);
      } else {
        setHasSeenTodayMessage(false);
        localStorage.removeItem('club5_message_seen_today');
      }

      // Check if quick start guide was seen
      if (savedQuickStartSeen === 'true') {
        setHasSeenQuickStart(true);
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  };

  const updateStats = () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if checked in today
    const todayCheckIn = checkIns.find(c => c.date === today);
    setHasCheckedInToday(!!todayCheckIn);

    // Calculate streak
    let streak = 0;
    const sortedCheckIns = [...checkIns].sort((a, b) => b.date.localeCompare(a.date));
    
    // Start from today and count backwards
    let currentDate = new Date();
    for (let i = 0; i < 365; i++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const hasCheckIn = sortedCheckIns.some(c => c.date === dateStr);
      
      if (hasCheckIn) {
        streak++;
      } else if (dateStr !== today) {
        // If not today and no check-in, break streak
        break;
      }
      
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    setCurrentStreak(streak);

    // Calculate success rate (last 7 days)
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }
    
    const completedDays = last7Days.filter(date => 
      checkIns.some(c => c.date === date)
    ).length;
    
    setSuccessRate(Math.round((completedDays / 7) * 100));
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('club5_onboarding_complete', 'true');
  };

  const updateUserData = (data: Partial<UserData>) => {
    const updated = { ...userData, ...data };
    setUserData(updated);
    localStorage.setItem('club5_user_data', JSON.stringify(updated));
  };

  const checkInToday = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Check if already checked in
    if (hasCheckedInToday) return;

    // Validate time (±20 mins from wake up time)
    const onTime = isWithinWakeUpWindow(now, userData.wakeUpTime);

    const newCheckIn: CheckIn = {
      date: today,
      timestamp: now.toISOString(),
      onTime,
    };

    const updated = [...checkIns, newCheckIn];
    setCheckIns(updated);
    localStorage.setItem('club5_checkins', JSON.stringify(updated));
  };

  const isWithinWakeUpWindow = (checkTime: Date, wakeUpTime: string): boolean => {
    // Parse wake up time (e.g., "5:00 AM")
    const [time, period] = wakeUpTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let targetHour = hours;
    if (period === 'PM' && hours !== 12) targetHour += 12;
    if (period === 'AM' && hours === 12) targetHour = 0;

    const targetTime = new Date(checkTime);
    targetTime.setHours(targetHour, minutes, 0, 0);

    // Calculate difference in minutes (±20 min window)
    const diffMs = Math.abs(checkTime.getTime() - targetTime.getTime());
    const diffMins = Math.floor(diffMs / (1000 * 60));

    return diffMins <= 20;
  };

  const markMessageSeen = () => {
    const today = new Date().toISOString().split('T')[0];
    setHasSeenTodayMessage(true);
    localStorage.setItem('club5_message_seen_today', today);
  };

  const markQuickStartSeen = () => {
    setHasSeenQuickStart(true);
    localStorage.setItem('club5_quickstart_seen', 'true');
  };

  const resetAllData = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        updateUserData,
        hasCompletedOnboarding,
        completeOnboarding,
        checkIns,
        hasCheckedInToday,
        currentStreak,
        successRate,
        checkInToday,
        hasSeenTodayMessage,
        markMessageSeen,
        hasSeenQuickStart,
        markQuickStartSeen,
        resetAllData,
      }}
    >
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