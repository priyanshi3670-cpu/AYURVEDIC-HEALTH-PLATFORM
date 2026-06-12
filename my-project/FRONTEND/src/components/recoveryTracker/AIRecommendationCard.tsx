import React from 'react';
import { Sparkles, Utensils, Heart, AlertCircle, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIRecommendationCardProps {
  doshaType?: string;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({ doshaType = 'Vata-Kapha' }) => {
  const recommendations = {
    diet: [
      "Warm cooked grains (Quinoa, Barley, Brown Rice).",
      "Favor bitter, pungent, and astringent tastes to pacify Kapha.",
      "Avoid raw salads and heavy cold dairy after sunset."
    ],
    lifestyle: [
      "Practice cooling breath Sheetali pranayama for 10 minutes daily.",
      "Retire to bed by 10:30 PM to optimize Pitta liver detox cycles.",
      "Daily gentle self-Abhyanga foot massage with organic sesame oil."
    ],
    treatment: "Shirodhara (3 sessions) for stress reduction and hormonal alignment.",
    herbTips: "Incorporate Gurmar and Nisha-Amalaki before breakfast to stabilize digestive Agni."
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 text-amber-700 flex items-center justify-center border border-amber-500/20 shadow-sm">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-black text-text-primary">AI Healing Insights</h3>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
              Dosha: {doshaType} Balancing
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-amber-500/10 text-amber-700 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-500/25">
          Real-time Tips
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diet section */}
        <div className="space-y-3 bg-emerald-50/30 p-4 rounded-xl border border-emerald-500/5">
          <h4 className="flex items-center text-xs font-black text-emerald-800 uppercase tracking-wider space-x-2">
            <Utensils className="w-4 h-4 text-emerald-700" />
            <span>Recommended Diet Path</span>
          </h4>
          <ul className="space-y-2">
            {recommendations.diet.map((item, idx) => (
              <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed">
                <span className="text-emerald-600 mr-2 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lifestyle section */}
        <div className="space-y-3 bg-amber-50/30 p-4 rounded-xl border border-amber-500/5">
          <h4 className="flex items-center text-xs font-black text-amber-800 uppercase tracking-wider space-x-2">
            <Compass className="w-4 h-4 text-amber-700" />
            <span>Lifestyle & Dinacharya</span>
          </h4>
          <ul className="space-y-2">
            {recommendations.lifestyle.map((item, idx) => (
              <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed">
                <span className="text-amber-600 mr-2 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="flex items-start space-x-3 p-3 bg-emerald-50/20 border border-emerald-500/10 rounded-xl">
          <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-text-primary leading-snug">Suggested Therapy</h5>
            <p className="text-xs text-text-secondary leading-normal mt-0.5">{recommendations.treatment}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3 p-3 bg-amber-50/20 border border-amber-500/10 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-bold text-text-primary leading-snug">Ayurvedic Herb Tip</h5>
            <p className="text-xs text-text-secondary leading-normal mt-0.5">{recommendations.herbTips}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIRecommendationCard;
