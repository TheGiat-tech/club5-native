import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Screen } from '../App';
import { motion } from 'motion/react';

interface HomeProps {
  onNavigate: (screen: Screen) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const { streak, markTodayComplete, hasCompletedToday } = useApp();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAwake = () => {
    if (!hasCompletedToday) {
      markTodayComplete();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onNavigate('reflections');
      }, 1500);
    } else {
      onNavigate('reflections');
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-between px-6 py-12 relative">
      {/* Success Animation */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-[#1C1C1C]/95 z-20"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="text-6xl mb-4"
            >
              ✓
            </motion.div>
            <p className="text-[#6A5AE0] font-manrope text-xl">Day marked!</p>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <div className="w-full text-center pt-8">
        <h1 className="font-manrope text-[#F4F4F4] text-xl tracking-wide">
          Club5 AI – Real Life Coach
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center gap-6 -mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-manrope text-[#F4F4F4] text-3xl text-center leading-relaxed px-8"
        >
          You showed up.<br />That's everything.
        </motion.h2>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAwake}
          className="bg-[#6A5AE0] text-[#F4F4F4] px-16 py-4 rounded-full font-poppins text-lg hover:bg-[#7A6AE8] transition-colors shadow-lg"
        >
          {hasCompletedToday ? "Continue" : "I'm Awake"}
        </motion.button>

        <p className="text-[#A7A7A7] text-center px-12 mt-2 font-poppins">
          You didn't beat the alarm — you beat yesterday.
        </p>
      </div>

      {/* Bottom Text */}
      <div className="w-full text-center pb-8">
        <p className="text-[#A7A7A7] text-sm font-poppins">
          {streak} {streak === 1 ? 'morning' : 'mornings'} strong • keep walking
        </p>
      </div>
    </div>
  );
}
