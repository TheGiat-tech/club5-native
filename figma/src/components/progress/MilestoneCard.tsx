import { motion } from 'motion/react';
import { Trophy, Medal, Lock, Check } from 'lucide-react';

type MilestoneVariant = 'unlocked' | 'locked' | 'achieved';

interface MilestoneCardProps {
  title: string;
  sublabel: string;
  variant?: MilestoneVariant;
  iconType?: 'trophy' | 'medal';
  onClick?: () => void;
}

export function MilestoneCard({ 
  title, 
  sublabel, 
  variant = 'unlocked',
  iconType = 'trophy',
  onClick 
}: MilestoneCardProps) {
  const IconComponent = iconType === 'trophy' ? Trophy : Medal;
  
  const getStatusTag = () => {
    if (variant === 'locked') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
          <Lock className="w-3 h-3 text-gray-500" />
          <span className="text-xs text-gray-600">Premium</span>
        </div>
      );
    }
    if (variant === 'achieved') {
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
          <Check className="w-3 h-3 text-emerald-600" />
          <span className="text-xs text-emerald-700">Completed</span>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.button
      whileTap={{ scale: variant === 'locked' ? 0.98 : 1 }}
      onClick={onClick}
      disabled={variant === 'achieved'}
      className={`w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border transition-all ${
        variant === 'locked' 
          ? 'border-gray-200 hover:border-gray-300 cursor-pointer' 
          : variant === 'achieved'
          ? 'border-emerald-200 opacity-75'
          : 'border-gray-100'
      }`}
    >
      {/* Left Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        variant === 'locked'
          ? 'bg-gray-100'
          : variant === 'achieved'
          ? 'bg-gradient-to-br from-emerald-400 to-green-500'
          : 'bg-gradient-to-br from-orange-400 to-pink-500'
      }`}>
        <IconComponent className={`w-6 h-6 ${
          variant === 'locked' ? 'text-gray-400' : 'text-white'
        }`} />
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h3 className={`font-bold mb-0.5 ${
          variant === 'locked' ? 'text-gray-400' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{sublabel}</p>
        {variant === 'locked' && (
          <p className="text-xs text-gray-400 mt-1">Unlock with Premium</p>
        )}
      </div>

      {/* Right Status */}
      {getStatusTag()}
    </motion.button>
  );
}
