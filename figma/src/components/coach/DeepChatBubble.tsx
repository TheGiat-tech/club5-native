import { motion } from 'motion/react';
import type { Message } from './deepSessions';

interface DeepChatBubbleProps {
  message: Message;
}

export function DeepChatBubble({ message }: DeepChatBubbleProps) {
  const isMax = message.sender === 'max';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex items-start gap-3 ${isMax ? 'justify-start' : 'justify-end'}`}
    >
      {isMax && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
          <span className="text-base">👨</span>
        </div>
      )}
      
      <div
        className={`max-w-[70%] rounded-[18px] px-5 py-3.5 ${
          isMax
            ? 'bg-white shadow-sm border border-gray-50'
            : 'bg-gradient-to-r from-[#FF7A00] to-[#FF2E9B] text-white shadow-md'
        }`}
      >
        <p className={`leading-relaxed ${isMax ? 'text-gray-800' : 'text-white'}`}>
          {message.text}
        </p>
      </div>
    </motion.div>
  );
}
