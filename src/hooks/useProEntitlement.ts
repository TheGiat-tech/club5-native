import { useCallback, useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import { getIsProFromCustomerInfo } from '@/src/lib/revenuecat';

export function useProEntitlement() {
  const [isPro, setIsPro] = useState(false);

  const refreshEntitlement = useCallback(async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      setIsPro(getIsProFromCustomerInfo(customerInfo));
    } catch (error) {
      console.warn('Failed to refresh RevenueCat entitlement', error);
    }
  }, []);

  useEffect(() => {
    void refreshEntitlement();
  }, [refreshEntitlement]);

  return {
    isPro,
    refreshEntitlement,
  };
}
