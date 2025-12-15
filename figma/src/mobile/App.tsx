import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import './src/i18n'; // Initialize i18n
import { AppProvider } from './src/context/AppContext';
import MainNavigator from './src/navigation/MainNavigator';
import { registerForPushNotifications } from './src/utils/notifications';

export default function App() {
  useEffect(() => {
    // Register for push notifications
    registerForPushNotifications();
  }, []);

  return (
    <AppProvider>
      <MainNavigator />
      <StatusBar style="auto" />
    </AppProvider>
  );
}