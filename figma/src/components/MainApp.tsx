import { useApp } from '../context/AppContext';
import { Onboarding } from './onboarding/Onboarding';
import { MainScreen } from './screens/MainScreen';
import { MomentumScreen } from './screens/MomentumScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { CoachScreen } from './screens/CoachScreen';
import { BottomNav } from './BottomNav';
import { useState } from 'react';
import { Toaster } from './ui/sonner';

export type Screen = 'home' | 'momentum' | 'coach' | 'settings';

export function MainApp() {
  const { hasCompletedOnboarding } = useApp();
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  if (!hasCompletedOnboarding) {
    return <Onboarding />;
  }

  return (
    <div className="h-screen w-full max-w-[430px] mx-auto bg-gradient-to-b from-blue-50 via-amber-50 to-white flex flex-col">
      <div className="flex-1 overflow-y-auto pb-2">
        {activeScreen === 'home' && <MainScreen />}
        {activeScreen === 'momentum' && <MomentumScreen />}
        {activeScreen === 'coach' && <CoachScreen />}
        {activeScreen === 'settings' && <SettingsScreen />}
      </div>
      <BottomNav activeTab={activeScreen} onTabChange={setActiveScreen} />
      <Toaster />
    </div>
  );
}