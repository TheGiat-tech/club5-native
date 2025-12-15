import { useState } from 'react';
import { Screen } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface ReflectionsProps {
  onNavigate: (screen: Screen) => void;
}

const dailyInsights = [
  "Growth doesn't shout — it whispers every morning you get up.",
  "Discipline is choosing what you want most over what you want now.",
  "The person you're becoming is watching what you do today.",
  "Consistency isn't perfection. It's showing up, even when you don't feel like it.",
  "You're not behind. You're exactly where your habits have brought you.",
  "Every morning is a chance to prove yesterday wrong.",
  "The gap between who you are and who you want to be is filled with what you do.",
];

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export function Reflections({ onNavigate }: ReflectionsProps) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const todayInsight = dailyInsights[new Date().getDay()];

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('motivated')) {
      return "Motivation is temporary. Discipline is what gets you through the days when motivation is gone. What's one small action you can take right now?";
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      return "Tiredness is real, but so is your commitment. Rest when you need to, but don't quit. Sometimes the best thing you can do is the smallest next step.";
    } else if (lowerMessage.includes('why') || lowerMessage.includes('purpose')) {
      return "Your 'why' isn't always loud. Sometimes it's quiet, like the sunrise. You showed up at 5 AM because part of you knows this matters. Trust that part.";
    } else if (lowerMessage.includes('fail') || lowerMessage.includes('mistake')) {
      return "Failure isn't the opposite of success — it's part of the path. You didn't fail. You learned where the edge is. Now you know more than yesterday.";
    } else if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
      return "You already started. Being here, asking this question — that's the beginning. Don't wait for perfect conditions. They don't exist.";
    } else {
      return "I hear you. Growth isn't always visible, but it's happening. Keep showing up. The practice itself is the transformation.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="h-full flex flex-col items-center px-6 py-12 relative">
      {/* Chat Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1C1C1C] z-10 flex flex-col"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6">
              <h2 className="font-manrope text-[#F4F4F4] text-xl">AI Coach</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-[#A7A7A7] hover:text-[#F4F4F4]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-[#A7A7A7] font-poppins mt-12">
                  <p>Ask me anything real.</p>
                  <p className="text-sm mt-2">I'm here to listen and guide.</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.role === 'user'
                        ? 'bg-[#6A5AE0] text-[#F4F4F4]'
                        : 'bg-[#252525] text-[#F4F4F4]'
                    }`}
                  >
                    <p className="font-poppins text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#252525] rounded-2xl p-4">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-[#6A5AE0] rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-[#6A5AE0] rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-[#6A5AE0] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-[#2A2A2A]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="flex-1 bg-[#252525] text-[#F4F4F4] rounded-full px-6 py-3 font-poppins outline-none focus:ring-2 focus:ring-[#6A5AE0]"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-[#6A5AE0] text-[#F4F4F4] rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#7A6AE8] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <div className="w-full text-center pt-8 mb-24">
        <h1 className="font-manrope text-[#F4F4F4] text-2xl">
          Reflections
        </h1>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center gap-6 flex-1">
        {/* Insight Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#252525] rounded-2xl p-8 shadow-lg w-full max-w-sm"
        >
          <p className="text-[#F4F4F4] text-center font-poppins leading-relaxed">
            {todayInsight}
          </p>
        </motion.div>

        {/* Button */}
        <button
          onClick={() => setShowChat(true)}
          className="bg-[#6A5AE0] text-[#F4F4F4] px-12 py-4 rounded-full font-poppins hover:bg-[#7A6AE8] transition-colors mt-6"
        >
          Ask something real
        </button>

        {/* Note */}
        <p className="text-[#A7A7A7] text-center text-sm font-poppins mt-2">
          AI answers with calm, real advice.
        </p>

        {/* Continue Button */}
        <button
          onClick={() => onNavigate('momentum')}
          className="text-[#6A5AE0] font-poppins mt-auto mb-8 hover:text-[#7A6AE8]"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
