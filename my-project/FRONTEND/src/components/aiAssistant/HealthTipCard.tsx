import React from 'react';
import { motion } from 'framer-motion';
import { AIHealthTip } from '../../types';

interface HealthTipCardProps {
  tips: AIHealthTip[];
}

const categoryBg: Record<string, string> = {
  Daily: 'bg-emerald-50 border-emerald-200',
  Seasonal: 'bg-orange-50 border-orange-200',
  Stress: 'bg-purple-50 border-purple-200',
  Digestive: 'bg-amber-50 border-amber-200',
};

const categoryTag: Record<string, string> = {
  Daily: 'bg-emerald-100 text-emerald-700',
  Seasonal: 'bg-orange-100 text-orange-700',
  Stress: 'bg-purple-100 text-purple-700',
  Digestive: 'bg-amber-100 text-amber-700',
};

const HealthTipCard: React.FC<HealthTipCardProps> = ({ tips }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">Health Tips Feed</h3>
      <p className="text-xs text-gray-400 mb-5">Daily Ayurveda wisdom for holistic wellness</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={`${categoryBg[tip.category] || 'bg-gray-50 border-gray-200'} border rounded-xl p-4 hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{tip.icon}</span>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${categoryTag[tip.category] || 'bg-gray-100 text-gray-600'}`}>
                {tip.category}
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-800 mb-1">{tip.title}</h4>
            <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HealthTipCard;
