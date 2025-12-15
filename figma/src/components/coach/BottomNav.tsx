import { MessageCircle, BarChart3, Trophy, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'coach' | 'progress' | 'achievements' | 'settings';
}

export function BottomNav({ activeTab }: BottomNavProps) {
  const tabs = [
    { id: 'coach', icon: MessageCircle, label: 'Coach' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'achievements', icon: Trophy, label: 'Wins' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] as const;

  return (
    <div className="bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-around">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            className="flex flex-col items-center gap-1 py-2 px-3 transition-colors"
          >
            <Icon 
              className={`w-6 h-6 ${
                isActive 
                  ? 'text-orange-500' 
                  : 'text-gray-400'
              }`}
            />
            <span 
              className={`text-xs ${
                isActive 
                  ? 'text-orange-500' 
                  : 'text-gray-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
