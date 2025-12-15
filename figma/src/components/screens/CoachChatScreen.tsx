import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp, ChatMessage } from '../../context/AppContext';
import { CoachAvatar } from '../CoachAvatar';
import { Send, Sparkles } from 'lucide-react';
import { generateCoachResponse } from '../../utils/coachAI';

export function CoachChatScreen() {
  const { userData, currentStreak } = useApp();
  const isDark = userData.darkMode || (userData.themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const coachName = userData.coach === 'natalie' ? 'Natalie' : 'Max';

  useEffect(() => {
    // Load messages from localStorage
    const saved = localStorage.getItem('club5_chat_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load messages');
      }
    } else {
      // Welcome message
      const welcomeMsg: ChatMessage = {
        id: Date.now().toString(),
        text: userData.coach === 'natalie' 
          ? `Hello ${userData.firstName}, I'm Natalie. I'm here to support your journey to better mornings. How are you feeling today?`
          : `Hey ${userData.firstName}, I'm Max. Let's build this discipline together. What's on your mind?`,
        sender: 'coach',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMsg]);
      localStorage.setItem('club5_chat_messages', JSON.stringify([welcomeMsg]));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // User message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    // Coach response with delay
    setTimeout(() => {
      const response = generateCoachResponse(
        userMsg.text,
        userData.coach,
        userData.firstName,
        userData.gender
      );

      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        sender: 'coach',
        timestamp: new Date().toISOString()
      };

      const final = [...updatedMessages, coachMsg];
      setMessages(final);
      setIsTyping(false);
      localStorage.setItem('club5_chat_messages', JSON.stringify(final));
    }, 1000 + Math.random() * 1000);
  };

  const quickPrompts = [
    "I'm feeling tired today",
    "I need motivation",
    "How can I stay consistent?",
    "I'm struggling this week"
  ];

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className={`h-full flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-slate-900'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      {/* Header */}
      <div className={`px-6 py-5 border-b backdrop-blur-sm transition-colors ${
        isDark 
          ? 'bg-gray-900/90 border-gray-800'
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="flex items-center gap-4">
          <CoachAvatar coach={userData.coach} size="md" />
          <div className="flex-1">
            <h1 className={`text-xl font-semibold transition-colors ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>{coachName}</h1>
            <p className={`text-sm transition-colors ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>Your AI Coach</p>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            isDark 
              ? 'bg-blue-500/20 text-blue-300'
              : 'bg-blue-50 text-blue-600'
          }`}>
            {currentStreak} day streak
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 pb-24">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {msg.sender === 'coach' && (
                <div className="flex-shrink-0">
                  <CoachAvatar coach={userData.coach} size="sm" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 transition-colors ${
                  msg.sender === 'user'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDark
                    ? 'bg-gray-800 text-gray-100'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="flex-shrink-0">
              <CoachAvatar coach={userData.coach} size="sm" />
            </div>
            <div className={`rounded-2xl px-4 py-3 transition-colors ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  isDark ? 'bg-gray-500' : 'bg-gray-400'
                }`} style={{ animationDelay: '0ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  isDark ? 'bg-gray-500' : 'bg-gray-400'
                }`} style={{ animationDelay: '150ms' }} />
                <div className={`w-2 h-2 rounded-full animate-bounce ${
                  isDark ? 'bg-gray-500' : 'bg-gray-400'
                }`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      {messages.length <= 2 && (
        <div className="px-6 pb-4">
          <p className={`text-xs mb-3 transition-colors ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>Quick prompts:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleQuickPrompt(prompt)}
                className={`px-3 py-2 rounded-full text-xs transition-colors ${
                  isDark
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className={`absolute bottom-0 left-0 right-0 px-6 py-4 border-t backdrop-blur-sm transition-colors ${
        isDark 
          ? 'bg-gray-900/95 border-gray-800'
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="flex gap-3 items-end">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className={`flex-1 px-4 py-3 rounded-2xl outline-none transition-colors text-sm ${
              isDark
                ? 'bg-gray-800 text-white placeholder-gray-500'
                : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            }`}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              inputValue.trim() && !isTyping
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : isDark
                ? 'bg-gray-800 text-gray-600'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
