import React from 'react';
import { Check, X, Leaf, Ban } from 'lucide-react';
import { motion } from 'framer-motion';

interface FoodRecommendationProps {
  dosha: string;
  eat: string[];
  avoid: string[];
}

export const FoodRecommendation: React.FC<FoodRecommendationProps> = ({ dosha, eat, avoid }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Leaf className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Ahara nutrition planner</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Foods to Favor & Avoid</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Favor - Eat */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-emerald-500/[0.02] border border-emerald-500/20 p-5 rounded-2xl space-y-3.5"
        >
          <div className="flex items-center space-x-2 text-emerald-800">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/15">
              <Check className="w-4.5 h-4.5" />
            </div>
            <strong className="text-xs font-serif font-black uppercase tracking-wider block">Favor (Foods to Eat)</strong>
          </div>
          
          <ul className="space-y-2.5">
            {eat.map((item, idx) => (
              <li key={idx} className="flex items-start text-xs text-text-primary font-medium leading-relaxed">
                <span className="text-emerald-600 mr-2.5 font-bold shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Avoid */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-rose-500/[0.02] border border-rose-500/20 p-5 rounded-2xl space-y-3.5"
        >
          <div className="flex items-center space-x-2 text-rose-800">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/15">
              <Ban className="w-4.5 h-4.5" />
            </div>
            <strong className="text-xs font-serif font-black uppercase tracking-wider block">Avoid (Limit/Reduce)</strong>
          </div>
          
          <ul className="space-y-2.5">
            {avoid.map((item, idx) => (
              <li key={idx} className="flex items-start text-xs text-text-primary font-medium leading-relaxed">
                <span className="text-rose-500 mr-2.5 font-bold shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
};

export default FoodRecommendation;
