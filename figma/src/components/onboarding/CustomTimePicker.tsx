import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface CustomTimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export function CustomTimePicker({ value, onChange }: CustomTimePickerProps) {
  // Parse existing value or default to 5:00 AM
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)?/i);
    if (match) {
      return {
        hour: parseInt(match[1]),
        minute: parseInt(match[2]),
        period: match[3]?.toUpperCase() || 'AM',
      };
    }
    return { hour: 5, minute: 0, period: 'AM' };
  };

  const parsed = parseTime(value);
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState<'AM' | 'PM'>(parsed.period as 'AM' | 'PM');

  const updateTime = (newHour: number, newMinute: number, newPeriod: 'AM' | 'PM') => {
    const formattedTime = `${newHour}:${newMinute.toString().padStart(2, '0')} ${newPeriod}`;
    onChange(formattedTime);
  };

  const incrementHour = () => {
    const newHour = hour >= 12 ? 1 : hour + 1;
    setHour(newHour);
    updateTime(newHour, minute, period);
  };

  const decrementHour = () => {
    const newHour = hour <= 1 ? 12 : hour - 1;
    setHour(newHour);
    updateTime(newHour, minute, period);
  };

  const incrementMinute = () => {
    const newMinute = minute >= 59 ? 0 : minute + 1;
    setMinute(newMinute);
    updateTime(hour, newMinute, period);
  };

  const decrementMinute = () => {
    const newMinute = minute <= 0 ? 59 : minute - 1;
    setMinute(newMinute);
    updateTime(hour, newMinute, period);
  };

  const togglePeriod = () => {
    const newPeriod = period === 'AM' ? 'PM' : 'AM';
    setPeriod(newPeriod);
    updateTime(hour, minute, newPeriod);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="flex items-center justify-center gap-4 py-6"
    >
      {/* Hour Picker */}
      <div className="flex flex-col items-center">
        <button
          onClick={incrementHour}
          className="w-12 h-10 flex items-center justify-center text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div className="w-20 h-20 flex items-center justify-center bg-white border-2 border-orange-300 rounded-xl shadow-lg my-2">
          <span className="text-4xl font-bold text-gray-800">{hour}</span>
        </div>
        <button
          onClick={decrementHour}
          className="w-12 h-10 flex items-center justify-center text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Separator */}
      <span className="text-4xl font-bold text-gray-800 mb-8">:</span>

      {/* Minute Picker */}
      <div className="flex flex-col items-center">
        <button
          onClick={incrementMinute}
          className="w-12 h-10 flex items-center justify-center text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div className="w-20 h-20 flex items-center justify-center bg-white border-2 border-orange-300 rounded-xl shadow-lg my-2">
          <span className="text-4xl font-bold text-gray-800">{minute.toString().padStart(2, '0')}</span>
        </div>
        <button
          onClick={decrementMinute}
          className="w-12 h-10 flex items-center justify-center text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* AM/PM Toggle */}
      <div className="flex flex-col gap-2 ml-2">
        <button
          onClick={togglePeriod}
          className={`w-16 h-10 rounded-lg font-semibold transition-all shadow-md ${
            period === 'AM'
              ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white'
              : 'bg-white text-gray-600 border-2 border-gray-200'
          }`}
        >
          AM
        </button>
        <button
          onClick={togglePeriod}
          className={`w-16 h-10 rounded-lg font-semibold transition-all shadow-md ${
            period === 'PM'
              ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white'
              : 'bg-white text-gray-600 border-2 border-gray-200'
          }`}
        >
          PM
        </button>
      </div>
    </motion.div>
  );
}
