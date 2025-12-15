import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Calendar, TrendingUp, Award, Target, Zap, Sparkles, ChevronDown } from 'lucide-react';
import { MilestoneCard } from '../progress/MilestoneCard';
import { PremiumModal } from '../progress/PremiumModal';
import { useState } from 'react';

type UserState = 'trial' | 'free' | 'premium';

export function MomentumScreen() {
  const { checkIns, currentStreak, successRate } = useApp();
  
  // State management
  const [userState, setUserState] = useState<UserState>('trial');
  const [trialDaysLeft, setTrialDaysLeft] = useState(14);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showStateToolbar, setShowStateToolbar] = useState(true);

  // Get last 30 days
  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const last30Days = getLast30Days();

  const isCompleted = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return checkIns.some(c => c.date === dateStr);
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const monthsInView = Array.from(
    new Set(last30Days.map(d => `${getMonthName(d)} ${d.getFullYear()}`))
  );

  // Calculate stats
  const completedLast30 = last30Days.filter(isCompleted).length;
  const successRate30 = Math.round((completedLast30 / 30) * 100);
  const bestStreak = calculateBestStreak();
  const totalDays = checkIns.length;

  function calculateBestStreak(): number {
    if (checkIns.length === 0) return 0;
    
    const sorted = [...checkIns].sort((a, b) => a.date.localeCompare(b.date));
    let maxStreak = 1;
    let currentStreakCalc = 1;
    
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i - 1].date);
      const currDate = new Date(sorted[i].date);
      const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreakCalc++;
        maxStreak = Math.max(maxStreak, currentStreakCalc);
      } else {
        currentStreakCalc = 1;
      }
    }
    
    return maxStreak;
  }

  // Milestones data
  const milestones = [
    { title: '1 Week', sublabel: '7 days', iconType: 'trophy' as const, daysRequired: 7 },
    { title: '2 Weeks', sublabel: '14 days', iconType: 'medal' as const, daysRequired: 14 },
    { title: '1 Month', sublabel: '30 days', iconType: 'trophy' as const, daysRequired: 30 },
    { title: '2 Months', sublabel: '60 days', iconType: 'medal' as const, daysRequired: 60 },
    { title: '3 Months', sublabel: '90 days', iconType: 'trophy' as const, daysRequired: 90 },
  ];

  const getMilestoneVariant = (daysRequired: number): 'unlocked' | 'locked' | 'achieved' => {
    // Check if achieved
    if (currentStreak >= daysRequired) {
      return 'achieved';
    }
    
    // State-based logic
    if (userState === 'trial' || userState === 'premium') {
      return 'unlocked';
    }
    
    // Free state: only 1 week unlocked
    if (userState === 'free' && daysRequired > 7) {
      return 'locked';
    }
    
    return 'unlocked';
  };

  const handleMilestoneClick = (daysRequired: number) => {
    const variant = getMilestoneVariant(daysRequired);
    if (variant === 'locked') {
      setShowPremiumModal(true);
    }
  };

  const handleNextDay = () => {
    if (trialDaysLeft > 0) {
      const newDays = trialDaysLeft - 1;
      setTrialDaysLeft(newDays);
      if (newDays === 0 && userState === 'trial') {
        setUserState('free');
      }
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-[#FDF5FF] to-white overflow-y-auto">
      <div className="px-6 pt-16 pb-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <h1 className="text-4xl text-gray-900 mb-2 font-bold">
            Your Progress
          </h1>
          <p className="text-gray-600">
            Every check-in is a victory
          </p>
        </motion.div>

        {/* Trial Banner */}
        {userState === 'trial' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-5 shadow-xl text-white"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold">14-day full access</span>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  {trialDaysLeft} days left in your trial
                </p>
                <button
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  Upgrade now
                </button>
              </div>
              <div className="text-3xl font-bold opacity-20">
                {trialDaysLeft}
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-4 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium opacity-90">Current Streak</span>
            </div>
            <div className="text-3xl font-bold mb-0.5">{currentStreak}</div>
            <div className="text-xs opacity-80">
              {currentStreak === 1 ? 'day' : 'days'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium opacity-90">Last 30 Days</span>
            </div>
            <div className="text-3xl font-bold mb-0.5">{successRate30}%</div>
            <div className="text-xs opacity-80">success rate</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4" />
              <span className="text-xs font-medium opacity-90">Best Streak</span>
            </div>
            <div className="text-3xl font-bold mb-0.5">{bestStreak}</div>
            <div className="text-xs opacity-80">
              {bestStreak === 1 ? 'day' : 'days'}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-xs font-medium opacity-90">Total Days</span>
            </div>
            <div className="text-3xl font-bold mb-0.5">{totalDays}</div>
            <div className="text-xs opacity-80">all time</div>
          </div>
        </motion.div>

        {/* 30-Day Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[28px] p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">30-Day View</h3>
              <p className="text-xs text-gray-600">{monthsInView.join(' - ')}</p>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {last30Days.map((date, index) => {
              const completed = isCompleted(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <motion.div
                  key={date.toISOString()}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.008, type: 'spring' }}
                  className="aspect-square"
                >
                  <div className={`w-full h-full rounded-lg flex flex-col items-center justify-center relative transition-all ${
                    completed
                      ? 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-sm'
                      : 'bg-gray-100'
                  }`}>
                    <div className={`text-xs font-semibold ${
                      completed ? 'text-white' : 'text-gray-400'
                    }`}>
                      {date.getDate()}
                    </div>
                    {completed && (
                      <div className="text-white text-[10px]">✓</div>
                    )}
                    {isToday && (
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-br from-emerald-400 to-green-500" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gray-100" />
              <span>Missed</span>
            </div>
          </div>
        </motion.div>

        {/* Insights (Collapsed Card) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <button className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="font-bold text-gray-900">Insights</span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
        </motion.div>

        {/* Milestones Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="font-bold text-gray-900 text-lg px-1">Milestones</h3>
          
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <MilestoneCard
                key={milestone.title}
                title={milestone.title}
                sublabel={milestone.sublabel}
                iconType={milestone.iconType}
                variant={getMilestoneVariant(milestone.daysRequired)}
                onClick={() => handleMilestoneClick(milestone.daysRequired)}
              />
            ))}
          </div>
        </motion.div>

        {/* Free State CTA */}
        {userState === 'free' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowPremiumModal(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            Unlock more milestones
          </motion.button>
        )}
      </div>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={() => {
          setUserState('premium');
          setShowPremiumModal(false);
        }}
      />

      {/* State Toolbar (for testing) */}
      {showStateToolbar && (
        <div className="fixed bottom-20 left-0 right-0 z-50 max-w-[430px] mx-auto px-6">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium">Testing Toolbar</span>
              <button
                onClick={() => setShowStateToolbar(false)}
                className="text-gray-400 hover:text-white text-xs"
              >
                Hide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setUserState('trial');
                  setTrialDaysLeft(14);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  userState === 'trial'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Trial
              </button>
              <button
                onClick={() => setUserState('free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  userState === 'free'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setUserState('premium')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  userState === 'premium'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Premium
              </button>
              <button
                onClick={handleNextDay}
                disabled={trialDaysLeft === 0}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  trialDaysLeft === 0
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Next day ({trialDaysLeft})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
