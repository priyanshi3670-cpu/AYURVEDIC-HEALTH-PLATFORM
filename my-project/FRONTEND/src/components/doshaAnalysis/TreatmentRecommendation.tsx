import React from 'react';
import { Heart, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { TreatmentSuggestion } from '../../types';
import { motion } from 'framer-motion';

interface TreatmentRecommendationProps {
  suggestion: TreatmentSuggestion;
}

export const TreatmentRecommendation: React.FC<TreatmentRecommendationProps> = ({ suggestion }) => {
  const sections = [
    { title: 'Suitable Therapies', items: suggestion.therapies, icon: Heart, color: 'text-rose-700 bg-rose-50 border-rose-500/10' },
    { title: 'Panchakarma Suggestion', items: suggestion.panchakarma, icon: Activity, color: 'text-blue-700 bg-blue-50 border-blue-500/10' },
    { title: 'Herbal Support Remedies', items: suggestion.herbalSupport, icon: Sparkles, color: 'text-amber-700 bg-amber-50 border-amber-500/10' }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Activity className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Veda treatments suggested</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Recommended Therapies & Herbs</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((sec, index) => {
          const Icon = sec.icon;
          return (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={`p-5 rounded-2xl border flex flex-col justify-between h-fit shadow-sm bg-gradient-to-br from-white to-gray-50 ${sec.color}`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center space-x-2 border-b border-current/5 pb-2">
                  <Icon className="w-4 h-4 shrink-0" />
                  <strong className="text-xs font-serif font-black uppercase tracking-wider block text-text-primary">
                    {sec.title}
                  </strong>
                </div>
                
                <ul className="space-y-2">
                  {sec.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-xs text-text-primary font-medium leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TreatmentRecommendation;
