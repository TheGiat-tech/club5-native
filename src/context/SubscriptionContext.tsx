import React, { createContext, useContext, useMemo, ReactNode, useCallback } from 'react';
import { Alert } from 'react-native';
import { useApp } from '@/figma/context/AppContext';

export type SubscriptionPlan = 'free' | 'premium';

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: string;
  description: string;
}

interface SubscriptionContextValue {
  currentPlan: SubscriptionPlan;
  isPremium: boolean;
  plans: Record<SubscriptionPlan, SubscriptionPlanDetails>;
  upgradeToPremium: () => Promise<void>;
  restorePurchase: () => Promise<void>;
  downgradeToFree: () => void;
}

export const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

const PLANS: Record<SubscriptionPlan, SubscriptionPlanDetails> = {
  free: {
    id: 'free',
    name: 'Free Plan',
    price: '$0',
    description: 'One 7-day challenge with core tracking and mini coaching.',
  },
  premium: {
    id: 'premium',
    name: 'Premium Plan',
    price: '$4.99/month',
    description: 'Unlimited challenges, longer AI coaching, and deeper insights.',
  },
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { isPremium, restorePremiumFromPurchases } = useApp();
  const currentPlan: SubscriptionPlan = isPremium ? 'premium' : 'free';

  const upgradeToPremium = useCallback(async () => {
    Alert.alert(
      'Go Premium',
      'Open the Premium tab to choose monthly or annual plans.',
    );
  }, []);

  const restorePurchase = useCallback(async () => {
    const restored = await restorePremiumFromPurchases();
    Alert.alert(
      restored ? 'Purchases restored' : 'No purchases found',
      restored ? 'Welcome back! Your premium access is active.' : 'We could not find active purchases.',
    );
  }, [restorePremiumFromPurchases]);

  const downgradeToFree = useCallback(() => {
    Alert.alert(
      'Manage subscription',
      'To switch plans, manage your subscription from the App Store / Google Play.',
    );
  }, []);

  const value = useMemo(
    () => ({
      currentPlan,
      isPremium,
      plans: PLANS,
      upgradeToPremium,
      restorePurchase,
      downgradeToFree,
    }),
    [currentPlan, isPremium, upgradeToPremium, restorePurchase, downgradeToFree],
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
}
