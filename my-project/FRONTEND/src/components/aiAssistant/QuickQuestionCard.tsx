import React from 'react';
import { motion } from 'framer-motion';

interface QuickQuestionCardProps {
  questions: string[];
  onAsk: (question: string) => void;
}

const QuickQuestionCard: React.FC<QuickQuestionCardProps> = ({ questions, onAsk }) => {
  const icons = ['🧬', '🥗', '🌿', '🫁', '🌙', '🏥', '🧘', '🕯️'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-2xl border border-emerald-100 p-6 shadow-sm"
    >
      <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">Quick Questions</h3>
      <p className="text-xs text-gray-400 mb-4">Tap to ask our AI assistant instantly</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {questions.map((q, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAsk(q)}
            className="flex items-center gap-3 bg-[#F8FFF8] hover:bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-left transition-all cursor-pointer group"
          >
            <span className="text-lg">{icons[i % icons.length]}</span>
            <span className="text-xs font-medium text-gray-600 group-hover:text-[#2E7D32] transition-colors">{q}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickQuestionCard;
