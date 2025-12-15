import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { getCheckInMessage } from '../utils/coachAI';
import { CoachAvatar } from './CoachAvatar';

interface CoachMessageProps {
  onClose: () => void;
  onTime: boolean;
}

export function CoachMessage({ onClose, onTime }: CoachMessageProps) {
  const { userData, currentStreak, hasCheckedInToday, hasSeenTodayMessage, markMessageSeen, checkIns } = useApp();

  const getCoachAvatar = () => userData.coach === 'natalie' ? '👩' : '👨';
  const getCoachName = () => userData.coach === 'natalie' ? 'Natalie' : 'Max';

  const generateMessage = (): string => {
    const name = userData.firstName;
    const pronoun = userData.gender === 'he' ? 'he' : 'she';
    const possessive = userData.gender === 'he' ? 'his' : 'her';
    
    // Special messages for late check-ins
    if (!onTime && hasCheckedInToday) {
      return `Hey ${name}, I see you checked in outside your usual time. That's okay — life happens. What matters is that you still showed up. Keep that mindset, and you'll go far.`;
    }

    // Streak-based messages
    if (currentStreak === 0) {
      return `Welcome back, ${name}! Every master was once a beginner. Today is day one of your new chapter. I'm here with you, every step of the way. Let's build something incredible together.`;
    } else if (currentStreak === 1) {
      return `${name}, that's two days! Do you feel it? The shift is already happening. You're proving to yourself that you can do this. I'm proud of you.`;
    } else if (currentStreak === 2) {
      return `Three days in a row, ${name}! Most people quit by now. But not you. You're building real momentum. This is where discipline starts to feel natural.`;
    } else if (currentStreak === 3) {
      return `Four days, ${name}. You're in the zone now. Your future self is already thanking you for these mornings. Keep the fire burning.`;
    } else if (currentStreak === 6) {
      return `A full week tomorrow, ${name}! Seven mornings where you chose growth over comfort. You're not the same person who started this journey. Can you feel the difference?`;
    } else if (currentStreak === 7) {
      return `ONE WEEK, ${name}! 🎉 This is huge. Seven consecutive mornings. You've proven you can show up when it matters. This is who you are now — someone who keeps promises to ${pronoun}self.`;
    } else if (currentStreak < 14) {
      return `${currentStreak + 1} days, ${name}. You're building a fortress of discipline, one morning at a time. Most people will never experience what you're experiencing right now. Stay the course.`;
    } else if (currentStreak === 13) {
      return `Two weeks tomorrow, ${name}! The habit is forming. Your brain is rewiring. This is where transformation becomes permanent. You're doing incredible work.`;
    } else if (currentStreak === 14) {
      return `TWO FULL WEEKS! ${name}, you've done what most people only dream about. ${currentStreak + 1} consecutive mornings of pure discipline. You're unstoppable.`;
    } else if (currentStreak === 20) {
      return `${currentStreak + 1} days! ${name}, you're approaching something legendary. Three weeks of unbroken commitment. The person you're becoming is extraordinary.`;
    } else if (currentStreak === 29) {
      return `Tomorrow is 30 DAYS, ${name}! A full month! Can you believe it? You're one morning away from a milestone most people never reach. I'm in awe of your dedication.`;
    } else if (currentStreak === 30) {
      return `30 DAYS! 🏆 ${name}, you've done it. A full month of discipline, commitment, and growth. You've transcended goals — this is your lifestyle now. You are proof that transformation is possible. I'm honored to witness your journey.`;
    } else if (currentStreak >= 60) {
      return `${currentStreak + 1} days, ${name}. You're a legend. This level of consistency is rare and beautiful. You've become the person you set out to be. Keep inspiring yourself and others.`;
    } else {
      return `Day ${currentStreak + 1}, ${name}. Every morning you show up, you're writing your own success story. I see the discipline in you. I see the strength. Keep going — you're exactly where you need to be.`;
    }
  };

  const getTimeBasedTip = (): string => {
    const hour = new Date().getHours();
    
    if (!onTime) {
      return "Remember, consistency beats perfection. Tomorrow, let's aim for your target time.";
    }
    
    if (hour < 5) {
      return "Wow, you're up before the sun! Use this quiet time wisely — it's your competitive advantage.";
    } else if (hour < 6) {
      return "Perfect timing! The early morning hours are magic. This is when champions are made.";
    } else if (hour < 7) {
      return "Great start to the day! You're ahead of 90% of people still asleep right now.";
    } else if (hour < 9) {
      return "You made it! Every check-in counts, no matter the time. Progress over perfection.";
    } else {
      return "You showed up, and that's what matters. Tomorrow is a new opportunity to start even earlier.";
    }
  };

  const handleClose = () => {
    markMessageSeen();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-h-[75vh] bg-white rounded-t-[40px] overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="overflow-y-auto max-h-[75vh] p-8 pb-12">
          {/* Coach Avatar */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4 shadow-xl ${
                userData.coach === 'natalie'
                  ? 'bg-gradient-to-br from-purple-400 to-pink-500'
                  : 'bg-gradient-to-br from-blue-500 to-indigo-600'
              }`}
            >
              {getCoachAvatar()}
            </motion.div>
            <h2 className="text-3xl text-gray-900 font-bold">
              {getCoachName()}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Sparkles className="w-4 h-4" />
              <span>Your AI Coach</span>
            </div>
          </div>

          {/* Time Alert (if late) */}
          {!onTime && hasCheckedInToday && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-amber-900 mb-1">Check-in noted</div>
                <div className="text-sm text-amber-700">
                  You checked in outside your target window ({userData.wakeUpTime} ±60 mins).
                  That's okay — what matters is you showed up!
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`rounded-3xl p-8 mb-6 ${
              userData.coach === 'natalie'
                ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-2 border-purple-100'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 border-2 border-blue-100'
            }`}
          >
            <p className="text-gray-800 leading-relaxed text-lg mb-6">
              {generateMessage()}
            </p>
            
            <div className="border-t-2 border-white/50 pt-6">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                <p className="text-gray-600 italic">
                  {getTimeBasedTip()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Streak Badge */}
          {currentStreak > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 via-pink-100 to-purple-100 px-8 py-4 rounded-full border-2 border-orange-200">
                <span className="text-3xl">🔥</span>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{currentStreak + 1}</div>
                  <div className="text-sm text-gray-600">day streak!</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className={`w-full py-5 rounded-2xl font-semibold text-lg shadow-xl text-white ${
              userData.coach === 'natalie'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}
          >
            Thank you, {getCoachName()}! 💪
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}