import { Slot } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import { AppProvider } from "@/figma/context/AppContext";
import { SubscriptionProvider } from "../src/context/SubscriptionContext";
import { initRevenueCat } from "../src/lib/revenuecat";

// Configure notification handler globally
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    // Initialize RevenueCat
    initRevenueCat().catch((error) => {
      console.warn('Failed to initialize RevenueCat', error);
    });

    // Initialize Android notification channel at startup
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF6B35',
      }).catch((error) => {
        console.warn('Failed to create notification channel', error);
      });
    }
  }, []);

  return (
    <AppProvider>
      <SubscriptionProvider>
        <Slot />
      </SubscriptionProvider>
    </AppProvider>
  );
}
