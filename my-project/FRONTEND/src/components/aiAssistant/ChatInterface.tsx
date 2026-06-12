import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMaximize2, FiMinimize2, FiTrash2 } from 'react-icons/fi';
import { ChatMessage as ChatMessageType } from '../../types';
import ChatMessageComponent from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  suggestions: string[];
  isTyping: boolean;
  onSendMessage: (msg: string) => void;
  onBookmark: (msg: ChatMessageType) => void;
  onClearChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages, suggestions, isTyping, onSendMessage, onBookmark, onClearChat
}) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      layout
      className={`bg-white rounded-2xl border border-emerald-100 shadow-lg overflow-hidden flex flex-col ${
        isExpanded ? 'fixed inset-4 z-50' : 'h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-sm font-bold">AyurVeda AI Assistant</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-[10px] text-emerald-200">Online · Ready to help</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClearChat} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" title="Clear chat">
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
            {isExpanded ? <FiMinimize2 className="w-3.5 h-3.5" /> : <FiMaximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-[#F8FFF8] to-white">
        <AnimatePresence>
          {messages.map((msg) => (
            <ChatMessageComponent key={msg.id} message={msg} onBookmark={onBookmark} />
          ))}
        </AnimatePresence>
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-5 py-3 border-t border-emerald-50 bg-[#F8FFF8]">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Suggested Questions</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.slice(0, 5).map((q, i) => (
              <button
                key={i}
                onClick={() => onSendMessage(q)}
                className="text-xs bg-white border border-emerald-200 text-[#2E7D32] px-3 py-1.5 rounded-full hover:bg-emerald-50 transition-colors cursor-pointer font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-emerald-100 bg-white">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Ayurveda, Dosha, diet, treatments..."
            className="flex-grow bg-[#F8FFF8] border border-emerald-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <FiSend className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-[9px] text-gray-400 mt-2 text-center italic">
          This AI assistant provides educational wellness information and is not a substitute for professional medical advice.
        </p>
      </div>
    </motion.div>
  );
};

export default ChatInterface;
