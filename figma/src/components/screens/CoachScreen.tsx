import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageCircle, Send, Lock, Crown, Sunrise, Moon, Zap, Frown } from 'lucide-react';
import { DeepChatSession } from '../coach/DeepChatSession';

type DeepModeSession = 'wakeup' | 'tired' | 'motivation' | 'down' | 'night' | null;

export function CoachScreen() {
  const { userData, currentStreak } = useApp();
  const [input, setInput] = useState('');
  const [activeDeepSession, setActiveDeepSession] = useState<DeepModeSession>(null);

  const getCoachAvatar = () => userData.coach === 'natalie' ? '👩' : '👨';
  const getCoachName = () => userData.coach === 'natalie' ? 'Natalie' : 'Max';

  // If in deep mode session, show that
  if (activeDeepSession) {
    return (
      <div className="h-full flex flex-col bg-[#FFF9F5]">
        <DeepChatSession 
          sessionType={activeDeepSession} 
          onClose={() => setActiveDeepSession(null)} 
        />
      </div>
    );
  }

  const deepModePrompts = [
    { id: 'wakeup' as const, label: 'Hard to wake up', icon: Sunrise, color: 'from-amber-400 to-orange-500' },
    { id: 'tired' as const, label: "I'm tired", icon: Moon, color: 'from-indigo-400 to-purple-500' },
    { id: 'motivation' as const, label: 'Need motivation', icon: Zap, color: 'from-yellow-400 to-orange-500' },
    { id: 'down' as const, label: 'Feeling down', icon: Frown, color: 'from-pink-400 to-rose-500' },
  ];

  const quickPrompts = [
    "I'm feeling unmotivated today",
    "How do I stay consistent?",
    "I broke my streak, help",
    "What should I do in the morning?",
    "I'm tired but want to keep going",
  ];

  const getDailyInsight = (): string => {
    const insights = [
      "Discipline is doing what you need to do, even when you don't feel like it.",
      "Every morning you show up, you're investing in the person you're becoming.",
      "The gap between who you are and who you want to be is what you do daily.",
      "Small actions, done consistently, create extraordinary results.",
      "You don't need motivation. You need commitment and a system.",
    ];
    
    const day = new Date().getDay();
    return insights[day % insights.length];
  };

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-y-auto">
      <div className="px-6 pt-16 pb-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center text-6xl mb-4 shadow-2xl ${
              userData.coach === 'natalie'
                ? 'bg-gradient-to-br from-purple-400 to-pink-500'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
            }`}
          >
            {getCoachAvatar()}
          </motion.div>
          <h1 className="text-4xl text-gray-900 mb-2 font-bold">
            {getCoachName()}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Sparkles className="w-4 h-4" />
            <span>Your AI Life Coach</span>
          </div>
        </motion.div>

        {/* Current Streak Badge */}
        {currentStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[24px] p-5 shadow-lg border border-orange-200 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">🔥</span>
              <div className="text-left">
                <div className="text-3xl font-bold text-gray-900">{currentStreak}</div>
                <div className="text-sm text-gray-600">day streak</div>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              {getCoachName()} is proud of your consistency!
            </p>
          </motion.div>
        )}

        {/* Daily Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-[28px] p-6 shadow-xl border-2 ${
            userData.coach === 'natalie'
              ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
          }`}
        >
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Today's Wisdom</h3>
              <p className="text-gray-700 leading-relaxed italic">
                "{getDailyInsight()}"
              </p>
              <p className="text-sm text-gray-600 mt-3">
                — {getCoachName()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Deep Mode Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-gradient-to-br from-[#FFF9F5] to-white rounded-[28px] p-6 shadow-xl border-2 border-orange-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Deep Mode</h3>
              <p className="text-xs text-gray-600">Empathetic coaching conversations</p>
            </div>
          </div>
          <div className="space-y-2">
            {deepModePrompts.map((prompt) => {
              const Icon = prompt.icon;
              return (
                <button
                  key={prompt.id}
                  onClick={() => setActiveDeepSession(prompt.id)}
                  className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.98] hover:border-orange-300"
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
        </motion.div>

        {/* Premium Chat Feature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 rounded-[28px] p-6 shadow-2xl text-white relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Premium Feature</h3>
                <p className="text-white/80 text-sm">Unlock full AI coaching</p>
              </div>
            </div>
            
            <p className="text-white/90 mb-4 leading-relaxed">
              Get unlimited conversations with {getCoachName()}, personalized advice, and deep coaching sessions.
            </p>

            <div className="space-y-2 mb-5">
              {[
                'Unlimited AI conversations',
                'Personalized daily coaching',
                'Goal setting & accountability',
                'Mood tracking & insights',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-white/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full bg-white text-orange-600 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all">
              Upgrade to Premium
            </button>
          </div>
        </motion.div>

        {/* Chat Input (Locked) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-[24px] p-4 shadow-lg border border-gray-200 relative"
        >
          <div className="flex gap-3 items-center opacity-50 pointer-events-none">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-5 py-4 rounded-2xl bg-gray-50 border-2 border-gray-200"
              disabled
            />
            <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4 rounded-2xl">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-[24px]">
            <div className="text-center">
              <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">Premium Feature</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}