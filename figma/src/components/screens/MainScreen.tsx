import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Flame, TrendingUp, Target, Sparkles, Info, MapPin } from 'lucide-react';
import { CoachMessage } from '../CoachMessage';
import { MomentumMapWidget } from '../MomentumMapWidget';
import { Confetti } from '../Confetti';
import { CheckInButton } from '../CheckInButton';
import { FeatureShowcase } from '../FeatureShowcase';
import { VisualGuide } from '../VisualGuide';

export function MainScreen() {
  const { 
    userData, 
    hasCheckedInToday, 
    currentStreak, 
    successRate,
    checkInToday,
    hasSeenTodayMessage,
    checkIns
  } = useApp();
  
  const isDark = userData.darkMode;
  
  const [showCoachMessage, setShowCoachMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [showFeatureInfo, setShowFeatureInfo] = useState(false);
  const [showVisualGuide, setShowVisualGuide] = useState(false);

  const handleCheckIn = () => {
    if (hasCheckedInToday) {
      setShowCoachMessage(true);
      return;
    }

    const now = new Date();
    setCheckInTime(now);
    checkInToday();
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setShowCoachMessage(true);
    }, 2500);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const isOnTime = () => {
    if (!checkInTime) return true;
    
    const [time, period] = userData.wakeUpTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let targetHour = hours;
    if (period === 'PM' && hours !== 12) targetHour += 12;
    if (period === 'AM' && hours === 12) targetHour = 0;

    const targetTime = new Date(checkInTime);
    targetTime.setHours(targetHour, minutes, 0, 0);

    const diffMs = Math.abs(checkInTime.getTime() - targetTime.getTime());
    const diffMins = Math.floor(diffMs / (1000 * 60));

    return diffMins <= 60;
  };

  return (
    <div className={`h-full overflow-y-auto relative pb-28 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800'
        : 'bg-gradient-to-br from-orange-50 via-amber-50 to-sky-50'
    }`}>
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      {/* Coach Message */}
      <AnimatePresence>
        {showCoachMessage && (
          <CoachMessage 
            onClose={() => setShowCoachMessage(false)}
            onTime={isOnTime()}
          />
        )}
      </AnimatePresence>

      {/* Feature Showcase */}
      <AnimatePresence>
        {showFeatureInfo && (
          <FeatureShowcase onClose={() => setShowFeatureInfo(false)} />
        )}
      </AnimatePresence>

      {/* Visual Guide */}
      <AnimatePresence>
        {showVisualGuide && (
          <VisualGuide onClose={() => setShowVisualGuide(false)} />
        )}
      </AnimatePresence>

      {/* Info Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowFeatureInfo(true)}
        className="absolute top-16 right-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-30 border border-orange-200"
      >
        <Info className="w-5 h-5 text-orange-600" />
      </motion.button>

      {/* Visual Guide Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowVisualGuide(true)}
        className="absolute top-16 right-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-30 border border-purple-200"
      >
        <MapPin className="w-5 h-5 text-purple-600" />
      </motion.button>

      {/* Main Content */}
      <div className="px-6 pt-16 pb-8 space-y-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-4"
        >
          <h1 className="text-5xl mb-3 font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            {getGreeting()}
          </h1>
          <p className={`text-xl font-medium transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {userData.firstName}
          </p>
        </motion.div>

        {/* I'm Awake Button - HERO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="pt-4"
        >
          <CheckInButton 
            hasCheckedIn={hasCheckedInToday}
            onClick={handleCheckIn}
          />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Streak */}
          <div className="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-[28px] p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-6 h-6" />
              <span className="text-sm font-semibold opacity-90">Streak</span>
            </div>
            <div className="text-5xl font-bold mb-1">{currentStreak}</div>
            <div className="text-sm opacity-90">
              {currentStreak === 1 ? 'day' : 'days'}
            </div>
          </div>

          {/* Total Check-ins */}
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-[28px] p-6 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-semibold opacity-90">Total</span>
            </div>
            <div className="text-5xl font-bold mb-1">{checkIns.length}</div>
            <div className="text-sm opacity-90">check-ins</div>
          </div>
        </motion.div>

        {/* Momentum Map Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <MomentumMapWidget />
        </motion.div>

        {/* Daily Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-[28px] p-8 text-center border-2 shadow-lg transition-colors ${
            isDark
              ? 'bg-gradient-to-br from-gray-800 via-slate-800 to-gray-700 border-gray-600'
              : 'bg-gradient-to-br from-amber-100 via-orange-100 to-pink-100 border-orange-200'
          }`}
        >
          <div className="text-4xl mb-4">💭</div>
          <p className={`italic leading-relaxed text-lg mb-3 transition-colors ${
            isDark ? 'text-gray-200' : 'text-gray-800'
          }`}>
            "The secret of getting ahead is getting started."
          </p>
          <p className={`font-medium transition-colors ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>— Mark Twain</p>
        </motion.div>

        {/* Coach Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`rounded-[28px] p-6 shadow-xl border transition-colors ${
            isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
              userData.coach === 'natalie'
                ? 'bg-gradient-to-br from-purple-400 to-pink-500'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600'
            }`}>
              {userData.coach === 'natalie' ? '👩' : '👨'}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Your Coach</div>
              <div className={`text-2xl font-bold capitalize transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {userData.coach}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowCoachMessage(true)}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Daily Motivation
          </button>
        </motion.div>
      </div>
    </div>
  );
}