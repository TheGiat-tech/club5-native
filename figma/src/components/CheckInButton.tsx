import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

interface CheckInButtonProps {
  hasCheckedIn: boolean;
  onClick: () => void;
}

export function CheckInButton({ hasCheckedIn, onClick }: CheckInButtonProps) {
  const { userData } = useApp();
  const isDark = userData.darkMode || (userData.themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <motion.button
      whileHover={{ scale: hasCheckedIn ? 1 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={hasCheckedIn}
      className={`w-full py-14 rounded-[32px] shadow-lg transition-all relative overflow-hidden ${
        hasCheckedIn
          ? isDark
            ? 'bg-gradient-to-br from-emerald-600 to-teal-700'
            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
          : isDark
          ? 'bg-gradient-to-br from-blue-600 to-indigo-700'
          : 'bg-gradient-to-br from-blue-500 to-indigo-600'
      }`}
    >
      {/* Subtle pulse effect when not checked in */}
      {!hasCheckedIn && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-[32px]"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        animate={{ 
          scale: hasCheckedIn ? [1, 1.05, 1] : 1,
        }}
        transition={{ 
          repeat: hasCheckedIn ? Infinity : 0,
          duration: 3,
          ease: "easeInOut"
        }}
        className="text-6xl mb-3 relative z-10"
      >
        {hasCheckedIn ? '✓' : '☀️'}
      </motion.div>
      
      <div className="text-white text-2xl font-semibold mb-1 relative z-10 tracking-wide">
        {hasCheckedIn ? "Today Complete" : "I'm Awake"}
      </div>
      
      <div className="text-white/80 text-sm relative z-10 font-light">
        {hasCheckedIn 
          ? 'Well done. Rest and prepare for tomorrow.' 
          : 'Tap to confirm your morning check-in'}
      </div>
    </motion.button>
  );
}
