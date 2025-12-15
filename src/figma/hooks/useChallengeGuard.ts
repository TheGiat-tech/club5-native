import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { useSubscription } from '@/src/context/SubscriptionContext';
import { useApp } from '../context/AppContext';

// Free users can only have one 7-day challenge: enforced with total check-ins >= 7.
const FREE_CHECKIN_LIMIT = 7;

export interface ChallengeGuardResult {
  isOverFreeLimit: boolean;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  startOver: () => void;
  goPremium: () => void;
  isDarkMode: boolean;
}

export function useChallengeGuard(): ChallengeGuardResult {
  const { checkIns, resetChallengeProgress, isDarkMode, userData } = useApp();
  const { isPremium } = useSubscription();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const isOverFreeLimit = useMemo(() => {
    if (isPremium) return false;
    const completedFlag = userData.hasCompletedFreeChallenge ?? false;
    return completedFlag || checkIns.length >= FREE_CHECKIN_LIMIT;
  }, [checkIns.length, isPremium, userData.hasCompletedFreeChallenge]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const startOver = () => {
    resetChallengeProgress();
    setModalVisible(false);
  };

  const goPremium = () => {
    router.push('/(tabs)/subscription');
    setModalVisible(false);
  };

  return {
    isOverFreeLimit,
    modalVisible,
    openModal,
    closeModal,
    startOver,
    goPremium,
    isDarkMode,
  };
}
