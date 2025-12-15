import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Calendar, TrendingUp } from 'lucide-react';

export function MomentumMapWidget() {
  const { checkIns, userData } = useApp();

  const isDark = userData.darkMode;

  // Get last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isCompleted = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return checkIns.some(c => c.date === dateStr);
  };

  const completedCount = last7Days.filter(isCompleted).length;
  const successPercent = Math.round((completedCount / 7) * 100);

  return (
    <div className={`rounded-[28px] p-6 shadow-xl border transition-colors ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-indigo-100'
    }`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-bold transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>This Week</h3>
            <p className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>{completedCount}/7 days</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {successPercent}%
          </div>
          <div className={`text-xs transition-colors ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>Success</div>
        </div>
      </div>
      
      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {last7Days.map((date, index) => {
          const completed = isCompleted(date);
          const dayOfWeek = date.getDay();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div key={date.toISOString()} className="flex flex-col items-center gap-2">
              <div className={`text-xs font-medium transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {dayLabels[dayOfWeek]}
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-semibold transition-all relative ${
                  completed
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30 text-white'
                    : isDark
                    ? 'bg-gray-700 text-gray-500'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {completed ? (
                  <span className="text-lg">✓</span>
                ) : (
                  <span className="text-xs">{date.getDate()}</span>
                )}
                {isToday && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className={`rounded-2xl p-4 border transition-colors ${
        isDark
          ? 'bg-gradient-to-br from-gray-700 to-slate-700 border-gray-600'
          : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100'
      }`}>
        <div className="flex items-center gap-3">
          <TrendingUp className={`w-5 h-5 flex-shrink-0 transition-colors ${
            isDark ? 'text-indigo-400' : 'text-indigo-600'
          }`} />
          <div className="flex-1">
            <div className={`h-3 rounded-full overflow-hidden shadow-inner mb-2 ${
              isDark ? 'bg-gray-800' : 'bg-white'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${successPercent}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className={`text-xs transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {completedCount === 7 ? "Perfect week! 🎉" : completedCount >= 5 ? "Almost there! 💪" : "Keep going! 🌱"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}