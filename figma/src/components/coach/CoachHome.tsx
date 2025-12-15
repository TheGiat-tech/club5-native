import { Sunrise, Moon, Zap, Frown, Sparkles } from 'lucide-react';

type SessionType = 'wakeup' | 'tired' | 'motivation' | 'focus' | 'down' | 'night';

interface CoachHomeProps {
  onSelectSession: (session: SessionType, mode?: 'regular' | 'deep') => void;
}

const prompts = [
  { id: 'wakeup' as SessionType, label: 'Hard to wake up', icon: Sunrise, color: 'from-amber-400 to-orange-500' },
  { id: 'tired' as SessionType, label: "I'm tired", icon: Moon, color: 'from-indigo-400 to-purple-500' },
  { id: 'motivation' as SessionType, label: 'Need motivation', icon: Zap, color: 'from-yellow-400 to-orange-500' },
  { id: 'focus' as SessionType, label: 'Need focus', icon: Sparkles, color: 'from-pink-400 to-rose-500' },
  { id: 'down' as SessionType, label: 'Feeling down', icon: Frown, color: 'from-pink-400 to-rose-500' },
  { id: 'night' as SessionType, label: 'Night reflection', icon: Sparkles, color: 'from-purple-400 to-pink-500' },
];

export function CoachHome({ onSelectSession }: CoachHomeProps) {
  return (
    <div className="flex-1 flex flex-col px-6 pt-16 pb-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
          <span className="text-4xl">👨</span>
        </div>
        <h1 className="text-gray-900 mb-2">
          Hey, I'm Max 👋
        </h1>
        <p className="text-gray-600">
          What do you need right now?
        </p>
      </div>

      {/* Deep Mode Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-gray-900">Deep Mode</h2>
        </div>
        <div className="space-y-2">
          {prompts.slice(0, 4).map((prompt) => {
            const Icon = prompt.icon;
            return (
              <button
                key={`deep-${prompt.id}`}
                onClick={() => onSelectSession(prompt.id, 'deep')}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-300 transition-all active:scale-[0.98]"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prompt.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 text-sm text-left">
                  {prompt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Regular Sessions */}
      <div className="mb-6">
        <h2 className="text-gray-900 mb-3">Quick Sessions</h2>
        <div className="space-y-2">
          {prompts.map((prompt) => {
            const Icon = prompt.icon;
            return (
              <button
                key={`regular-${prompt.id}`}
                onClick={() => onSelectSession(prompt.id, 'regular')}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prompt.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 text-sm text-left">
                  {prompt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quote */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <p className="text-gray-500 text-center italic text-sm">
          "Discipline is choosing what you want most over what you want now."
        </p>
      </div>
    </div>
  );
}