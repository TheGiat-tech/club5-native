import { motion } from 'motion/react';
import { Home, TrendingUp, MessageCircle, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

export type Screen = 'home' | 'momentum' | 'coach' | 'settings';

interface BottomNavProps {
  activeTab: Screen;
  onTabChange: (screen: Screen) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { userData } = useApp();
  const isDark = userData.darkMode;
  
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'momentum' as Screen, icon: TrendingUp, label: 'Progress' },
    { id: 'coach' as Screen, icon: MessageCircle, label: 'Coach' },
    { id: 'settings' as Screen, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`backdrop-blur-xl border-t px-4 pb-6 pt-3 transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className={`relative p-3 rounded-2xl transition-all ${
                isActive 
                  ? 'bg-gradient-to-br from-orange-500 to-pink-500' 
                  : 'bg-transparent'
              }`}>
                <Icon 
                  className={`w-6 h-6 transition-colors ${
                    isActive 
                      ? 'text-white' 
                      : isDark 
                      ? 'text-gray-400' 
                      : 'text-gray-500'
                  }`} 
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl -z-10"
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}
              </div>
              <span className={`text-xs font-medium transition-colors ${
                isActive 
                  ? isDark ? 'text-white' : 'text-gray-900'
                  : isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}