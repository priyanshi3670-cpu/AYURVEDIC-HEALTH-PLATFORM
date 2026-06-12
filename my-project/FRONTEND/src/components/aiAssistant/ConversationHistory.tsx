import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AIConversationRecord } from '../../types';
import { FiSearch, FiMessageSquare, FiClock, FiTrash2 } from 'react-icons/fi';

interface ConversationHistoryProps {
  conversations: AIConversationRecord[];
  onSelect?: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Dosha: 'bg-purple-100 text-purple-700',
  Diet: 'bg-green-100 text-green-700',
  Wellness: 'bg-blue-100 text-blue-700',
  Treatment: 'bg-amber-100 text-amber-700',
};

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ conversations, onSelect }) => {
  const [search, setSearch] = useState('');
  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">Conversation History</h3>
      <p className="text-xs text-gray-400 mb-4">Previous AI chat sessions</p>

      {/* Search */}
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="w-full bg-[#F8FFF8] border border-emerald-100 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-all"
        />
      </div>

      {/* List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-4">No conversations found.</p>
        )}
        {filtered.map((conv) => (
          <motion.button
            key={conv.id}
            whileHover={{ x: 4 }}
            onClick={() => onSelect?.(conv.id)}
            className="w-full flex items-start gap-3 p-3 rounded-xl bg-[#F8FFF8] border border-emerald-50 hover:border-emerald-200 transition-all cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
              <FiMessageSquare className="w-3.5 h-3.5 text-[#2E7D32]" />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4 className="text-xs font-bold text-gray-800 truncate">{conv.title}</h4>
                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0 ml-2 ${categoryColors[conv.category] || 'bg-gray-100 text-gray-600'}`}>
                  {conv.category}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 truncate">{conv.lastMessage}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[9px] text-gray-400">
                  <FiClock className="w-2.5 h-2.5" /> {conv.date}
                </span>
                <span className="text-[9px] text-gray-400">{conv.messageCount} messages</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ConversationHistory;
