import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { SessionType } from '../../App';
import { sessions, type Message } from './sessions';
import { ChatBubble } from './ChatBubble';
import { ChoiceChips } from './ChoiceChips';
import { TypingIndicator } from './TypingIndicator';

interface ChatSessionProps {
  sessionType: SessionType;
  onClose: () => void;
}

interface ChatMessage extends Message {
  timestamp: number;
}

export function ChatSession({ sessionType, onClose }: ChatSessionProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentMessageId, setCurrentMessageId] = useState<string>('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const session = sessionType ? sessions[sessionType] : null;

  useEffect(() => {
    if (session) {
      // Start the session
      setCurrentMessageId(session.startId);
      addMessage(session.messages[session.startId]);
    }
  }, [session]);

  useEffect(() => {
    // Auto-scroll to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const addMessage = (message: Message) => {
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, { ...message, timestamp: Date.now() }]);
      
      // If message has choices, show them
      if (message.choices && message.choices.length > 0) {
        setTimeout(() => setShowChoices(true), 300);
      } 
      // If message has a next but no choices, auto-continue
      else if (message.next) {
        setTimeout(() => {
          const nextMsg = session?.messages[message.next!];
          if (nextMsg) {
            setCurrentMessageId(message.next!);
            addMessage(nextMsg);
          }
        }, 1000);
      }
    }, 1200);
  };

  const handleChoice = (choiceId: string, choiceText: string, nextId: string) => {
    // Add user's choice to chat
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text: choiceText,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setShowChoices(false);
    
    // Get next message from coach
    setTimeout(() => {
      const nextMsg = session?.messages[nextId];
      if (nextMsg) {
        setCurrentMessageId(nextId);
        addMessage(nextMsg);
      }
    }, 500);
  };

  if (!session) return null;

  const currentMessage = session.messages[currentMessageId];
  const hasChoices = currentMessage?.choices && currentMessage.choices.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-xl">👨</span>
          </div>
          <div>
            <div className="text-gray-900">Max</div>
            <div className="text-xs text-gray-500">Your AI Coach</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {chatHistory.map((msg, index) => (
          <ChatBubble key={`${msg.id}-${index}`} message={msg} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={chatEndRef} />
      </div>

      {/* Choice Chips */}
      {showChoices && hasChoices && (
        <ChoiceChips
          choices={currentMessage.choices!}
          onSelect={handleChoice}
        />
      )}
    </div>
  );
}
