import React from 'react';
import { Utensils, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface DietHeroProps {
  onGenerateClick: () => void;
  onScrollToRecommendations: () => void;
}

export const DietHero: React.FC<DietHeroProps> = ({
  onGenerateClick,
  onScrollToRecommendations
}) => {
  return (
    <section className="bg-gradient-to-br from-primary via-[#2E7D32] to-emerald-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg border border-primary-light/10">
      {/* Decorative Orbs */}
      <div className="absolute -right-24 -top-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-accent/25 border border-accent/20 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-accent mx-auto lg:mx-0">
            <Utensils className="w-3.5 h-3.5" />
            <span>Pathya Ahara Planner</span>
          </div>
          <h2 className="font-serif text-2xl md:text-3.5xl font-black leading-tight max-w-xl">
            Personalized Ayurveda Diet Planner & Nutrition recommendation
          </h2>
          <p className="text-xs text-white/80 max-w-lg leading-relaxed font-medium">
            Get customized meal plans based on your unique body constitution (Dosha), metabolic fire (Agni), health goals, and current medical conditions.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={onGenerateClick}
              className="bg-accent hover:bg-amber-600 text-primary font-black text-xs px-6 py-3 rounded-xl shadow-md uppercase tracking-wider transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Generate Diet Plan
            </button>
            <button
              onClick={onScrollToRecommendations}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>View Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Badge Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl flex items-center space-x-4 max-w-xs shadow-inner"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-accent tracking-wider block">Nutrition Rule</span>
            <p className="text-[11px] text-white/90 font-semibold leading-relaxed">
              "Ahara is the best medicine. Eating right restores metabolic Agni and drives natural cell renewal."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DietHero;
