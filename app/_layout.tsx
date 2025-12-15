import { Slot } from "expo-router";
import { useEffect } from "react";
import { AppProvider } from "@/figma/context/AppContext";
import { SubscriptionProvider } from "../src/context/SubscriptionContext";
import { initRevenueCat } from "../src/lib/revenuecat";

export default function RootLayout() {
  useEffect(() => {
    initRevenueCat().catch((error) => {
      console.warn('Failed to initialize RevenueCat', error);
    });
  }, []);

  return (
    <AppProvider>
      <SubscriptionProvider>
        <Slot />
      </SubscriptionProvider>
    </AppProvider>
  );
}
