import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiMessageCircle, FiArrowRight } from 'react-icons/fi';

interface CTABannerProps {
  onStartChat: () => void;
}

const CTABanner: React.FC<CTABannerProps> = ({ onStartChat }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#388E3C] p-8 text-white shadow-xl"
    >
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full translate-y-1/2" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-black mb-2">
            Get Personalized Ayurveda<br className="hidden md:block" /> Guidance Anytime
          </h3>
          <p className="text-emerald-200 text-xs max-w-md">
            Our AI assistant is available 24/7 to answer your Ayurveda questions, suggest treatments, and guide your wellness journey.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartChat}
            className="flex items-center gap-2 bg-white text-[#2E7D32] px-6 py-3 rounded-xl font-bold text-sm shadow-lg cursor-pointer"
          >
            <FiMessageCircle className="w-4 h-4" />
            Ask AI
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/treatments')}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-bold text-sm cursor-pointer hover:bg-white/25 transition-colors"
          >
            Explore Treatments
            <FiArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CTABanner;
