import { motion } from 'motion/react';
import type { Message } from './sessions';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isMax = message.sender === 'max';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 ${isMax ? 'justify-start' : 'justify-end'}`}
    >
      {isMax && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-sm">👨</span>
        </div>
      )}
      
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isMax
            ? 'bg-white shadow-sm border border-gray-100'
            : 'bg-gradient-to-r from-[#FF7A00] to-[#FF2E9B] text-white'
        }`}
      >
        <p className={`${isMax ? 'text-gray-900' : 'text-white'}`}>
          {message.text}
        </p>
      </div>
    </motion.div>
  );
}
