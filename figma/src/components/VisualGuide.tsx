import { motion } from 'motion/react';
import { X, Home, TrendingUp, MessageCircle, Settings, CheckCircle, Calendar } from 'lucide-react';

interface VisualGuideProps {
  onClose: () => void;
}

export function VisualGuide({ onClose }: VisualGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[32px] p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Where Everything Is 📍
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Feature Location Guide */}
        <div className="space-y-4">
          {/* Daily Check-In */}
          <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-5 border-2 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  "I'm Awake" Check-In Button
                  <span className="text-lg">🌅</span>
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Giant button on the Home screen - you can't miss it!
                </p>
                <div className="bg-white rounded-xl p-3 border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-semibold text-orange-700">HOME TAB</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    ➜ Top section (largest element)<br/>
                    ➜ Tap to check in daily<br/>
                    ➜ Triggers confetti + AI message
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Momentum Map - 7 Day */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border-2 border-indigo-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  7-Day Momentum Widget
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Quick view of this week's progress
                </p>
                <div className="bg-white rounded-xl p-3 border border-indigo-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-semibold text-indigo-700">HOME TAB</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    ➜ Below the stats cards<br/>
                    ➜ Shows last 7 days<br/>
                    ➜ Green ✓ for completed days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Momentum Map - 30 Day */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  30-Day Full Calendar
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Complete monthly view with stats
                </p>
                <div className="bg-white rounded-xl p-3 border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-semibold text-green-700">PROGRESS TAB</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    ➜ Tap "Progress" in bottom nav<br/>
                    ➜ Full 30-day calendar grid<br/>
                    ➜ 4 stat cards + milestones
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coach Selection */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  Coach Settings
                  <span className="text-lg">👩👨</span>
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Change between Natalie and Max anytime
                </p>
                <div className="space-y-2">
                  <div className="bg-white rounded-xl p-3 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Settings className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700">SETTINGS TAB</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      ➜ "AI Coach" section<br/>
                      ➜ Tap to open picker modal<br/>
                      ➜ Instant switching
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-700">COACH TAB</span>
                    </div>
                    <p className="text-xs text-gray-600">
                      ➜ View full coach profile<br/>
                      ➜ Daily wisdom section
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* All Settings */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">
                  Customization Settings
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Edit name, time, pronouns & more
                </p>
                <div className="bg-white rounded-xl p-3 border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">SETTINGS TAB</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    ✓ First name<br/>
                    ✓ Gender pronouns<br/>
                    ✓ Wake-up time<br/>
                    ✓ AI coach<br/>
                    ✓ Focus mode<br/>
                    ✓ Reset data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Nav Guide */}
        <div className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 text-white">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <span>📱</span>
            Bottom Navigation
          </h3>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-white/10 rounded-xl p-3">
              <Home className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">Home</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <TrendingUp className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">Progress</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <MessageCircle className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">Coach</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <Settings className="w-5 h-5 mx-auto mb-1" />
              <div className="font-semibold">Settings</div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl font-semibold shadow-lg"
        >
          Got It! 🎉
        </button>
      </motion.div>
    </motion.div>
  );
}
