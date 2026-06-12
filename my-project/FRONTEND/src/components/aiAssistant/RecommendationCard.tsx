import React from 'react';
import { motion } from 'framer-motion';
import { AIRecommendationCard as RecCardType } from '../../types';

interface RecommendationCardProps {
  recommendation: RecCardType;
  index: number;
}

const categoryColors: Record<string, string> = {
  Diet: 'from-green-500 to-emerald-600',
  Lifestyle: 'from-amber-500 to-orange-500',
  Exercise: 'from-blue-500 to-cyan-500',
  Meditation: 'from-purple-500 to-violet-500',
  Sleep: 'from-indigo-500 to-blue-600',
};

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, index }) => {
  const gradient = categoryColors[recommendation.category] || 'from-gray-500 to-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
    >
      {/* Color bar */}
      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-2xl">{recommendation.icon}</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            {recommendation.category}
          </span>
        </div>

        <h4 className="font-serif text-base font-bold text-gray-800 mb-1.5">{recommendation.title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">{recommendation.description}</p>

        <div className="space-y-1.5">
          {recommendation.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-[#81C784] mt-0.5 shrink-0">✦</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
