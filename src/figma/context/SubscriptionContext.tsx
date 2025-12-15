import React, { createContext, useContext } from 'react';

type SubscriptionState = {
  isPremium: boolean;
  currentPlan: string;
};

const SubscriptionContext = createContext<SubscriptionState>({
  isPremium: false,
  currentPlan: 'free',
});

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SubscriptionContext.Provider value={{ isPremium: false, currentPlan: 'free' }}>
    {children}
  </SubscriptionContext.Provider>
);

export function useSubscription() {
  return useContext(SubscriptionContext);
}
