import { motion } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

interface QuickStartGuideProps {
  onClose: () => void;
}

export function QuickStartGuide({ onClose }: QuickStartGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Club5 AI! 🌅",
      description: "Let me show you the 3 main features you need to know",
      emoji: "👋",
      image: null,
    },
    {
      title: "1. Daily Check-In Button",
      description: "The GIANT button on your home screen. Tap it every morning when you wake up!",
      emoji: "🌅",
      highlight: "I'M AWAKE",
      location: "Home Screen - You can't miss it!",
    },
    {
      title: "2. Momentum Map (7-Day Tracker)",
      description: "See your weekly progress with green checkmarks for completed days",
      emoji: "📊",
      highlight: "THIS WEEK",
      location: "Home Screen - Scroll down below stats",
    },
    {
      title: "3. Change Your Coach",
      description: "Switch between Natalie 👩 and Max 👨 anytime you want",
      emoji: "⚙️",
      highlight: "SETTINGS → AI COACH",
      location: "Tap Settings tab (gear icon at bottom)",
    },
    {
      title: "You're All Set! 🎉",
      description: "All features are ready to use. Start by tapping the 'I'm Awake' button!",
      emoji: "✨",
      image: null,
    },
  ];

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="bg-white rounded-[36px] p-8 max-w-md w-full shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-gradient-to-r from-orange-500 to-pink-500'
                  : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <motion.div
            key={currentStep}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="text-7xl mb-6"
          >
            {step.emoji}
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {step.title}
          </h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {step.description}
          </p>

          {step.highlight && (
            <div className="bg-gradient-to-br from-orange-100 to-pink-100 border-2 border-orange-300 rounded-2xl p-4 mb-4">
              <div className="text-2xl font-bold text-orange-900 mb-2">
                {step.highlight}
              </div>
              <div className="text-sm text-orange-700 font-medium">
                📍 {step.location}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {!isFirstStep && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={() => {
              if (isLastStep) {
                onClose();
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {isLastStep ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Start Using App
              </>
            ) : (
              'Next'
            )}
          </button>
        </div>

        {/* Skip Button */}
        {!isLastStep && (
          <button
            onClick={onClose}
            className="w-full mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            Skip Tutorial
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
