import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp, CoachType, Gender } from '../../context/AppContext';
import { 
  X, User, Clock, Sparkles, Focus, Trash2, ChevronRight, 
  TrendingUp, Target, Calendar 
} from 'lucide-react';

interface SettingsScreenProps {
  onClose: () => void;
}

export function SettingsScreen({ onClose }: SettingsScreenProps) {
  const { userData, updateUserData, resetAllData, currentStreak, successRate, checkIns } = useApp();
  const isDark = userData.darkMode;
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(userData.firstName);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCoachPicker, setShowCoachPicker] = useState(false);

  const timeOptions = [
    '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM',
    '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM', '8:00 AM'
  ];

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateUserData({ firstName: tempName.trim() });
      setEditingName(false);
    }
  };

  const handleGenderToggle = () => {
    const newGender: Gender = userData.gender === 'he' ? 'she' : 'he';
    updateUserData({ gender: newGender });
  };

  const handleCoachChange = (coach: CoachType) => {
    updateUserData({ coach });
    setShowCoachPicker(false);
  };

  const handleTimeChange = (time: string) => {
    updateUserData({ wakeUpTime: time });
    setShowTimePicker(false);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className={`h-full overflow-y-auto transition-colors duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800'
          : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}
    >
      {/* Header */}
      <div className={`sticky top-0 backdrop-blur-xl border-b p-6 flex items-center justify-between z-20 shadow-sm transition-colors duration-300 ${
        isDark
          ? 'bg-gray-900/90 border-gray-700'
          : 'bg-white/90 border-gray-200'
      }`}>
        <h1 className={`text-3xl font-bold transition-colors ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Settings</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            isDark 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <X className={`w-6 h-6 transition-colors ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`} />
        </motion.button>
      </div>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-6"
          onClick={() => setShowTimePicker(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[32px] p-6 max-w-sm w-full shadow-2xl"
          >
            <h3 className="text-2xl text-gray-900 font-bold mb-6">Wake-up Time</h3>
            <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto mb-4">
              {timeOptions.map((time) => (
                <motion.button
                  key={time}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTimeChange(time)}
                  className={`py-4 rounded-2xl font-semibold transition-all ${
                    userData.wakeUpTime === time
                      ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setShowTimePicker(false)}
              className="w-full py-4 text-gray-600 font-medium hover:bg-gray-50 rounded-2xl transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Coach Picker Modal */}
      {showCoachPicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-6"
          onClick={() => setShowCoachPicker(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[32px] p-6 max-w-sm w-full shadow-2xl"
          >
            <h3 className="text-2xl text-gray-900 font-bold mb-6">Choose Your Coach</h3>
            <div className="space-y-3 mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCoachChange('natalie')}
                className={`w-full p-5 rounded-3xl transition-all flex items-center gap-4 shadow-lg ${
                  userData.coach === 'natalie'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-4xl">👩</div>
                <div className="text-left">
                  <div className="font-bold text-lg">Natalie</div>
                  <div className={`text-sm ${userData.coach === 'natalie' ? 'text-white/90' : 'text-gray-500'}`}>
                    Wise, calm, nurturing
                  </div>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCoachChange('max')}
                className={`w-full p-5 rounded-3xl transition-all flex items-center gap-4 shadow-lg ${
                  userData.coach === 'max'
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-4xl">👨</div>
                <div className="text-left">
                  <div className="font-bold text-lg">Max</div>
                  <div className={`text-sm ${userData.coach === 'max' ? 'text-white/90' : 'text-gray-500'}`}>
                    Grounded, strong, supportive
                  </div>
                </div>
              </motion.button>
            </div>
            <button
              onClick={() => setShowCoachPicker(false)}
              className="w-full py-4 text-gray-600 font-medium hover:bg-gray-50 rounded-2xl transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Content */}
      <div className="p-6 space-y-6 pb-32">
        {/* Stats Overview */}
        <div className="bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 rounded-[32px] p-6 text-white shadow-2xl">
          <h3 className="text-sm font-semibold opacity-90 mb-4">Your Journey</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{currentStreak}</div>
              <div className="text-xs opacity-90">Day Streak</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-3xl font-bold mb-1">{successRate}%</div>
              <div className="text-xs opacity-90">Success</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{checkIns.length}</div>
              <div className="text-xs opacity-90">Total Days</div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-[28px] p-6 shadow-xl border border-gray-100">
          <h2 className="text-lg text-gray-900 font-bold mb-5 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Profile
          </h2>
          
          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 font-medium mb-2 block">First Name</label>
            {editingName ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="flex-1 px-5 py-4 rounded-2xl border-2 border-orange-300 focus:border-orange-500 outline-none text-lg"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-7 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingName(true)}
                className="w-full px-5 py-4 bg-gray-50 rounded-2xl text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-900 font-medium text-lg">{userData.firstName}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-600 font-medium mb-2 block">Pronouns</label>
            <button
              onClick={handleGenderToggle}
              className="w-full px-5 py-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <span className="text-gray-900 font-medium text-lg capitalize">{userData.gender}</span>
              <div className={`w-14 h-7 rounded-full flex items-center px-1 transition-all shadow-inner ${
                userData.gender === 'she' ? 'bg-pink-500 justify-end' : 'bg-blue-500 justify-start'
              }`}>
                <div className="w-6 h-6 bg-white rounded-full shadow-lg" />
              </div>
            </button>
          </div>
        </div>

        {/* Coach Section */}
        <div className="bg-white rounded-[28px] p-6 shadow-xl border border-gray-100">
          <h2 className="text-lg text-gray-900 font-bold mb-5 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI Coach
          </h2>
          <button
            onClick={() => setShowCoachPicker(true)}
            className="w-full p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl flex items-center justify-between hover:from-purple-100 hover:to-pink-100 transition-all border border-purple-100"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {userData.coach === 'natalie' ? '👩' : '👨'}
              </div>
              <div className="text-left">
                <div className="text-gray-900 font-bold text-lg capitalize">{userData.coach}</div>
                <div className="text-sm text-gray-600">
                  {userData.coach === 'natalie' ? 'Wise & nurturing' : 'Strong & supportive'}
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Tap to change your coach anytime
          </p>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-[28px] p-6 shadow-xl border border-gray-100">
          <h2 className="text-lg text-gray-900 font-bold mb-5 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            Schedule
          </h2>
          <button
            onClick={() => setShowTimePicker(true)}
            className="w-full px-5 py-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div className="text-left">
              <div className="text-sm text-gray-600 font-medium mb-1">Wake-up Time</div>
              <div className="text-gray-900 font-bold text-lg">{userData.wakeUpTime}</div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Focus Mode */}
        <div className={`rounded-[28px] p-6 shadow-xl border transition-colors ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
        }`}>
          <h2 className={`text-lg font-bold mb-5 flex items-center gap-2 transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <Focus className="w-5 h-5 text-white" />
            </div>
            Appearance & Focus
          </h2>
          
          {/* Dark Mode Toggle */}
          <div className="mb-3">
            <div className={`font-bold text-lg mb-3 transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Theme</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => updateUserData({ themeMode: 'light', darkMode: false })}
                className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                  userData.themeMode === 'light'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => updateUserData({ themeMode: 'dark', darkMode: true })}
                className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                  userData.themeMode === 'dark'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  updateUserData({ themeMode: 'system', darkMode: prefersDark });
                }}
                className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                  userData.themeMode === 'system'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Auto
              </button>
            </div>
            <p className={`text-xs mt-2 transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {userData.themeMode === 'system' ? 'Follows your device settings' : `${userData.themeMode === 'dark' ? 'Dark' : 'Light'} mode enabled`}
            </p>
          </div>
          
          {/* Focus Mode */}
          <button
            onClick={() => updateUserData({ focusMode: !userData.focusMode })}
            className={`w-full px-5 py-4 rounded-2xl flex items-center justify-between transition-colors ${
              isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="text-left">
              <div className={`font-bold text-lg transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Focus Mode</div>
              <div className={`text-sm transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>Hide distractions, stay focused</div>
            </div>
            <div className={`w-14 h-7 rounded-full flex items-center px-1 transition-all shadow-inner ${
              userData.focusMode ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
            }`}>
              <div className="w-6 h-6 bg-white rounded-full shadow-lg" />
            </div>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-[28px] p-6 shadow-xl border-2 border-red-200">
          <h2 className="text-lg text-red-600 font-bold mb-5 flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-white" />
            </div>
            Danger Zone
          </h2>
          <button
            onClick={resetAllData}
            className="w-full px-5 py-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors font-semibold"
          >
            Reset All Data
          </button>
          <p className="text-xs text-gray-500 mt-3 text-center">
            This will delete all your progress permanently
          </p>
        </div>
      </div>
    </motion.div>
  );
}