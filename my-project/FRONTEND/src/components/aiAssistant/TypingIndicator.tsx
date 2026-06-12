import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8960C] flex items-center justify-center text-white shadow-md shrink-0">
        <span className="text-xs font-bold">AI</span>
      </div>
      <div className="bg-white border border-emerald-100 rounded-2xl rounded-tl-md px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#81C784]"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
          <span className="text-xs text-gray-400 ml-2 font-medium">AI is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
