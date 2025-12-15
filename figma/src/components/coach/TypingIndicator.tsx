import { motion } from 'motion/react';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 justify-start">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
        <span className="text-base">👨</span>
      </div>
      
      <div className="bg-white shadow-sm border border-gray-50 rounded-[18px] px-5 py-4">
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                y: [0, -6, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}