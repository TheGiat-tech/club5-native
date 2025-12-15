import { motion } from 'motion/react';
import type { Choice } from './sessions';

interface ChoiceChipsProps {
  choices: Choice[];
  onSelect: (choiceId: string, choiceText: string, nextId: string) => void;
}

export function ChoiceChips({ choices, onSelect }: ChoiceChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 pb-6 space-y-2"
    >
      {choices.map((choice, index) => (
        <motion.button
          key={choice.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(choice.id, choice.text, choice.next)}
          className="w-full bg-white border-2 border-gray-200 hover:border-orange-300 rounded-xl px-4 py-3 transition-all active:scale-95 shadow-sm hover:shadow-md"
        >
          <span className="text-gray-900">
            {choice.text}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
}
