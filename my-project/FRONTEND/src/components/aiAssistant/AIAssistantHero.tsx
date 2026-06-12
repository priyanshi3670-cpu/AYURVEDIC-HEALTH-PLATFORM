import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiActivity } from 'react-icons/fi';

interface AIAssistantHeroProps {
  onStartChat: () => void;
  onViewInsights: () => void;
}

const AIAssistantHero: React.FC<AIAssistantHeroProps> = ({ onStartChat, onViewInsights }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#1B5E20] p-8 md:p-12 text-white shadow-2xl"
    >
      {/* Decorative floating orbs */}
      <div className="absolute top-6 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-4 left-20 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          {/* AI Badge */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">AI Powered</span>
          </motion.div>

          <h1 className="font-serif text-3xl md:text-4xl font-black leading-tight mb-3">
            Your Personal AI Ayurveda<br />Health Advisor
          </h1>
          <p className="text-emerald-100/80 text-sm md:text-base leading-relaxed max-w-xl">
            Get instant Ayurveda guidance, wellness recommendations and personalized insights powered by ancient wisdom and modern intelligence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartChat}
            className="flex items-center gap-2 bg-white text-[#2E7D32] px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <FiMessageCircle className="w-4 h-4" />
            Start Chat
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewInsights}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/25 transition-colors cursor-pointer"
          >
            <FiActivity className="w-4 h-4" />
            View Health Insights
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantHero;
