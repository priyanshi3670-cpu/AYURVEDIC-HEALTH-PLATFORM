import React from 'react';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface DoshaHeroProps {
  onStartAssessment: () => void;
  onScrollToLearn: () => void;
}

export const DoshaHero: React.FC<DoshaHeroProps> = ({ onStartAssessment, onScrollToLearn }) => {
  return (
    <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl border border-emerald-500/10">
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl space-y-6 relative z-10">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-[10px] font-black uppercase tracking-widest bg-amber-500/25 text-accent px-4 py-1.5 rounded-full inline-block border border-accent/20"
        >
          AI PRAKRITI ASSESSMENT
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="font-serif text-3xl md:text-5xl font-black leading-tight text-white"
        >
          Discover Your Ayurveda <br/>Body Constitution
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-xl"
        >
          Understand your unique Dosha balance (Vata, Pitta, Kapha) and receive personalized Vedic guidelines for diet, lifestyle, daily routines, and therapies.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <button
            onClick={onStartAssessment}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-serif px-6 py-3.5 rounded-2xl text-sm font-black flex items-center space-x-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span>Start AI Assessment</span>
            <ArrowRight className="w-4.5 h-4.5 text-accent" />
          </button>
          
          <button
            onClick={onScrollToLearn}
            className="bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center space-x-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <BookOpen className="w-4.5 h-4.5 text-accent" />
            <span>Learn About Doshas</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default DoshaHero;
