import React from 'react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '../../types';
import { FiUser, FiCpu, FiBookmark } from 'react-icons/fi';

interface ChatMessageProps {
  message: ChatMessageType;
  onBookmark?: (msg: ChatMessageType) => void;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, onBookmark }) => {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
        isUser ? 'bg-[#2E7D32] text-white' : 'bg-gradient-to-br from-[#D4AF37] to-[#B8960C] text-white'
      }`}>
        {isUser ? <FiUser className="w-4 h-4" /> : <FiCpu className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[75%] relative ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'bg-[#2E7D32] text-white rounded-tr-md'
            : 'bg-white border border-emerald-100 text-gray-700 rounded-tl-md'
        }`}>
          {/* Render markdown-like content */}
          <div className="whitespace-pre-wrap">
            {message.message.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} className="font-bold mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
              }
              if (line.startsWith('- ') || line.startsWith('✅') || line.startsWith('❌') || line.startsWith('🔥') || line.startsWith('🌿') || line.startsWith('🧘') || line.startsWith('🍵') || line.startsWith('⏰') || line.startsWith('🌙') || line.startsWith('🫁')) {
                return <p key={i} className="ml-2 my-0.5">{line}</p>;
              }
              if (line.startsWith('*') && line.endsWith('*')) {
                return <p key={i} className="italic text-xs opacity-80 mt-2">{line.replace(/\*/g, '')}</p>;
              }
              if (line.match(/^\d+\.\s/)) {
                return <p key={i} className="ml-2 my-0.5 font-medium">{line}</p>;
              }
              return <p key={i} className={line === '' ? 'h-2' : ''}>{line}</p>;
            })}
          </div>
        </div>

        {/* Timestamp + Bookmark */}
        <div className={`flex items-center gap-2 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-[10px] text-gray-400">{time}</span>
          {!isUser && onBookmark && (
            <button
              onClick={() => onBookmark(message)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#D4AF37] cursor-pointer"
              title="Bookmark this response"
            >
              <FiBookmark className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessageComponent;
