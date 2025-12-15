import { motion } from 'motion/react';
import type { Choice } from './deepSessions';

interface DeepChoiceChipsProps {
  choices: Choice[];
  onSelect: (choiceId: string, choiceText: string, nextId: string) => void;
}

export function DeepChoiceChips({ choices, onSelect }: DeepChoiceChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-5 pb-8 space-y-3"
    >
      {choices.map((choice, index) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.12, ease: 'easeOut' }}
          onClick={() => onSelect(choice.id, choice.text, choice.next)}
          className="w-full bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 rounded-2xl px-5 py-4 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
        >
          <span className="text-gray-800">
            {choice.text}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
