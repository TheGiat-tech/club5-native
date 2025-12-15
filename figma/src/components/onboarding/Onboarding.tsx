import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, CoachType, Gender } from '../../context/AppContext';
import { Sparkles, Clock, User2, Heart } from 'lucide-react';
import { CustomTimePicker } from './CustomTimePicker';

export function Onboarding() {
  const { updateUserData, completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState<Gender>('he');
  const [wakeUpTime, setWakeUpTime] = useState('5:00 AM');
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState('5:00 AM');
  const [coach, setCoach] = useState<CoachType>('natalie');

  const timeOptions = [
    '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM'
  ];

  const handleFinish = () => {
    updateUserData({
      firstName,
      gender,
      coach,
      wakeUpTime: isCustomTime ? customTime : wakeUpTime,
      focusMode: false,
    });
    completeOnboarding();
  };

  const screens = [
    // Step 0: Welcome
    <motion.div
      key="welcome"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="flex flex-col items-center justify-center h-full px-8 text-center bg-gradient-to-br from-orange-100 via-amber-50 to-sky-100"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-8xl mb-8"
      >
        🌅
      </motion.div>
      <h1 className="text-5xl mb-4 text-gray-900 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">
        Club5 AI
      </h1>
      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        Build unshakeable discipline.<br />
        Wake up with purpose.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setStep(1)}
        className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-2xl shadow-orange-500/40"
      >
        Begin Your Journey
      </motion.button>
    </motion.div>,

    // Step 1: Name
    <motion.div
      key="name"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center h-full px-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        <User2 className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl mb-3 text-gray-900 font-bold text-center">
        What's your first name?
      </h2>
      <p className="text-gray-600 mb-10 text-center text-lg">
        Your coach will use this to connect with you
      </p>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your name"
        className="w-full max-w-xs px-6 py-5 rounded-2xl border-3 border-orange-200 text-center text-xl focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 bg-white shadow-lg mb-10 transition-all"
        autoFocus
      />
      <button
        onClick={() => firstName.trim() && setStep(2)}
        disabled={!firstName.trim()}
        className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-2xl transition-all"
      >
        Continue
      </button>
    </motion.div>,

    // Step 2: Gender
    <motion.div
      key="gender"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center h-full px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        <Heart className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl mb-3 text-gray-900 font-bold text-center">
        How should we refer to you?
      </h2>
      <p className="text-gray-600 mb-12 text-center text-lg">
        This personalizes your coaching experience
      </p>
      <div className="flex gap-4 mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGender('he')}
          className={`px-14 py-7 rounded-3xl text-xl font-semibold transition-all shadow-xl ${
            gender === 'he'
              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110'
              : 'bg-white text-gray-700 border-3 border-gray-200'
          }`}
        >
          He
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGender('she')}
          className={`px-14 py-7 rounded-3xl text-xl font-semibold transition-all shadow-xl ${
            gender === 'she'
              ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white scale-110'
              : 'bg-white text-gray-700 border-3 border-gray-200'
          }`}
        >
          She
        </motion.button>
      </div>
      <button
        onClick={() => setStep(3)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
      >
        Continue
      </button>
    </motion.div>,

    // Step 3: Wake-up Time
    <motion.div
      key="time"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center h-full px-8 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        <Clock className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl mb-3 text-gray-900 font-bold text-center">
        What time will you wake up?
      </h2>
      <p className="text-gray-600 mb-10 text-center text-lg">
        Choose your daily commitment
      </p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-12">
        {timeOptions.map((time) => (
          <motion.button
            key={time}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsCustomTime(false);
              setWakeUpTime(time);
            }}
            className={`py-4 rounded-2xl font-semibold transition-all shadow-lg ${
              !isCustomTime && wakeUpTime === time
                ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white scale-105'
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            {time}
          </motion.button>
        ))}
        <motion.button
          key="custom"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsCustomTime(true);
            setWakeUpTime(customTime);
          }}
          className={`py-4 rounded-2xl font-semibold transition-all shadow-lg ${
            isCustomTime
              ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white scale-105'
              : 'bg-white text-gray-700 border-2 border-gray-200'
          }`}
        >
          {isCustomTime ? `${customTime}` : 'Custom'}
        </motion.button>
      </div>
      {isCustomTime && (
        <CustomTimePicker
          value={customTime}
          onChange={(time) => {
            setCustomTime(time);
            setWakeUpTime(time);
          }}
        />
      )}
      <button
        onClick={() => setStep(4)}
        className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
      >
        Continue
      </button>
    </motion.div>,

    // Step 4: Coach Selection
    <motion.div
      key="coach"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center h-full px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl mb-3 text-gray-900 font-bold text-center">
        Choose your AI coach
      </h2>
      <p className="text-gray-600 mb-10 text-center text-lg">
        They'll guide you every morning
      </p>
      <div className="space-y-4 w-full max-w-sm mb-12">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCoach('natalie')}
          className={`w-full p-6 rounded-3xl transition-all text-left shadow-xl ${
            coach === 'natalie'
              ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white scale-105'
              : 'bg-white text-gray-700 border-3 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="text-5xl">👩</div>
            <div>
              <div className="text-2xl font-bold mb-1">Natalie</div>
              <div className={`text-sm ${coach === 'natalie' ? 'text-white/90' : 'text-gray-500'}`}>
                Wise, calm, and nurturing
              </div>
            </div>
          </div>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCoach('max')}
          className={`w-full p-6 rounded-3xl transition-all text-left shadow-xl ${
            coach === 'max'
              ? 'bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white scale-105'
              : 'bg-white text-gray-700 border-3 border-gray-200'
          }`}
        >
          <div className="flex items-center gap-5">
            <div className="text-5xl">👨</div>
            <div>
              <div className="text-2xl font-bold mb-1">Max</div>
              <div className={`text-sm ${coach === 'max' ? 'text-white/90' : 'text-gray-500'}`}>
                Grounded, strong, supportive
              </div>
            </div>
          </div>
        </motion.button>
      </div>
      <button
        onClick={() => setStep(5)}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
      >
        Continue
      </button>
    </motion.div>,

    // Step 5: Ready
    <motion.div
      key="ready"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center h-full px-8 text-center bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut"
        }}
        className="text-8xl mb-8"
      >
        ✨
      </motion.div>
      <h1 className="text-4xl mb-4 text-gray-900 font-bold">
        You're all set, {firstName}!
      </h1>
      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        {coach === 'natalie' ? 'Natalie' : 'Max'} will see you tomorrow at {isCustomTime ? customTime : wakeUpTime} 🌅
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFinish}
        className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white px-16 py-6 rounded-full text-2xl font-bold shadow-2xl shadow-pink-500/50 flex items-center gap-3"
      >
        Let's Go!
        <span className="text-3xl">🚀</span>
      </motion.button>
    </motion.div>,
  ];

  return (
    <div className="h-[844px] relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 z-50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(step / (screens.length - 1)) * 100}%` }}
          className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-lg"
          transition={{ type: 'spring', stiffness: 100 }}
        />
      </div>

      {/* Screen Content */}
      <AnimatePresence mode="wait">
        {screens[step]}
      </AnimatePresence>

      {/* Step Counter */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-50">
        {screens.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === step 
                ? 'w-8 bg-gradient-to-r from-orange-500 to-pink-500' 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}