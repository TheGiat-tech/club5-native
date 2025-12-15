import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Calendar } from 'lucide-react';

export function MomentumMap() {
  const { checkIns } = useApp();

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
    <div className="bg-white rounded-[28px] p-6 shadow-xl border border-orange-100">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl text-gray-900 font-bold">Momentum Map</h3>
      </div>
      
      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-2 mb-5">
        {last7Days.map((date, index) => {
          const completed = isCompleted(date);
          const dayOfWeek = date.getDay();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <div key={date.toISOString()} className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-500 font-medium">
                {dayLabels[dayOfWeek]}
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, type: 'spring' }}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-semibold transition-all relative ${
                  completed
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30 text-white'
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

      {/* Success Rate */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700 font-medium">This Week</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {successPercent}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${successPercent}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
            {completedCount}/7
          </span>
        </div>
      </div>
    </div>
  );
}
