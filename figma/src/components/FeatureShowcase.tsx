import { motion } from 'motion/react';
import { CheckCircle, TrendingUp, MessageCircle, Settings } from 'lucide-react';

interface FeatureShowcaseProps {
  onClose: () => void;
}

export function FeatureShowcase({ onClose }: FeatureShowcaseProps) {
  const features = [
    {
      icon: CheckCircle,
      title: 'Daily Check-In',
      description: 'Tap "I\'m Awake" every morning to mark your victory',
      color: 'from-orange-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Momentum Map',
      description: '7-day tracker with green checkmarks for completed days',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageCircle,
      title: 'AI Coach',
      description: 'Get personalized motivation from Natalie or Max',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Settings,
      title: 'Full Control',
      description: 'Change coach, time, name, and all settings anytime',
      color: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[32px] p-8 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">🌅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Club5 AI
          </h2>
          <p className="text-gray-600">
            Everything you need to build morning discipline
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-semibold shadow-lg"
        >
          Got It! Let's Start
        </button>
      </motion.div>
    </motion.div>
  );
}
