import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Screen } from '../App';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface YourPracticeProps {
  onNavigate: (screen: Screen) => void;
}

export function YourPractice({ onNavigate }: YourPracticeProps) {
  const { settings, updateSettings } = useApp();
  const [showTimePicker, setShowTimePicker] = useState(false);

  const timeOptions = [
    '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', 
    '6:00 AM', '6:30 AM', '7:00 AM'
  ];

  const handleToggleFocus = () => {
    updateSettings({ focusMode: !settings.focusMode });
  };

  const handleToggleJournal = () => {
    updateSettings({ journalActive: !settings.journalActive });
  };

  const handleTimeChange = (time: string) => {
    updateSettings({ wakeUpTime: time });
    setShowTimePicker(false);
  };

  return (
    <div className="h-full flex flex-col items-center px-6 py-12 relative">
      {/* Time Picker Overlay */}
      {showTimePicker && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#1C1C1C]/95 z-10 flex items-center justify-center"
          onClick={() => setShowTimePicker(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#252525] rounded-3xl p-6 max-w-xs w-full mx-6"
          >
            <h3 className="font-manrope text-[#F4F4F4] text-xl mb-6 text-center">
              Wake-up Time
            </h3>
            <div className="space-y-2">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeChange(time)}
                  className={`w-full py-3 rounded-xl font-poppins transition-colors ${
                    settings.wakeUpTime === time
                      ? 'bg-[#6A5AE0] text-[#F4F4F4]'
                      : 'bg-[#1C1C1C] text-[#A7A7A7] hover:bg-[#2A2A2A]'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTimePicker(false)}
              className="w-full mt-6 py-3 text-[#A7A7A7] font-poppins"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Title */}
      <div className="w-full text-center pt-8 mb-24">
        <h1 className="font-manrope text-[#F4F4F4] text-2xl">
          Your Practice
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex flex-col gap-6 w-full max-w-sm">
        {/* Practice Item 1 - Wake-up time */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowTimePicker(true)}
          className="bg-[#252525] rounded-2xl p-6 flex items-center justify-between hover:bg-[#2A2A2A] transition-colors"
        >
          <div className="flex flex-col items-start">
            <span className="text-[#A7A7A7] text-xs font-poppins mb-1">Wake-up time</span>
            <span className="text-[#F4F4F4] font-poppins">{settings.wakeUpTime}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#6A5AE0]" />
        </motion.button>

        {/* Practice Item 2 - Focus Mode */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-[#252525] rounded-2xl p-6 flex items-center justify-between"
        >
          <div className="flex flex-col items-start">
            <span className="text-[#A7A7A7] text-xs font-poppins mb-1">Focus Mode</span>
            <span className="text-[#F4F4F4] font-poppins">
              {settings.focusMode ? 'ON' : 'OFF'}
            </span>
          </div>
          <button
            onClick={handleToggleFocus}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-all ${
              settings.focusMode ? 'bg-[#6A5AE0] justify-end' : 'bg-[#3A3A3A] justify-start'
            }`}
          >
            <motion.div
              layout
              className="w-5 h-5 bg-[#F4F4F4] rounded-full shadow-lg"
            />
          </button>
        </motion.div>

        {/* Practice Item 3 - AI Journal */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="bg-[#252525] rounded-2xl p-6 flex items-center justify-between"
        >
          <div className="flex flex-col items-start">
            <span className="text-[#A7A7A7] text-xs font-poppins mb-1">AI Reflection Journal</span>
            <span className="text-[#F4F4F4] font-poppins">
              {settings.journalActive ? 'Active' : 'Paused'}
            </span>
          </div>
          <button
            onClick={handleToggleJournal}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-all ${
              settings.journalActive ? 'bg-[#6A5AE0] justify-end' : 'bg-[#3A3A3A] justify-start'
            }`}
          >
            <motion.div
              layout
              className="w-5 h-5 bg-[#F4F4F4] rounded-full shadow-lg"
            />
          </button>
        </motion.div>

        {/* Bottom Note */}
        <p className="text-[#A7A7A7] text-center text-sm font-poppins mt-12 px-4">
          Edit your routine when you're ready. Not before.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => onNavigate('home')}
          className="bg-[#6A5AE0] text-[#F4F4F4] px-12 py-4 rounded-full font-poppins hover:bg-[#7A6AE8] transition-colors mt-8"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
