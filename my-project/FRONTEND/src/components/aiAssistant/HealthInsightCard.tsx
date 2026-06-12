import React from 'react';
import { motion } from 'framer-motion';
import { AIDoshaInsight } from '../../types';
import { FiZap, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

interface HealthInsightCardProps {
  insight: AIDoshaInsight;
  index: number;
}

const doshaColors: Record<string, { bg: string; border: string; accent: string; text: string }> = {
  Vata: { bg: 'bg-sky-50', border: 'border-sky-200', accent: 'text-sky-700', text: 'bg-sky-100' },
  Pitta: { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-700', text: 'bg-orange-100' },
  Kapha: { bg: 'bg-emerald-50', border: 'border-emerald-200', accent: 'text-emerald-700', text: 'bg-emerald-100' },
};

const HealthInsightCard: React.FC<HealthInsightCardProps> = ({ insight, index }) => {
  const colors = doshaColors[insight.doshaType] || doshaColors.Vata;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`${colors.bg} ${colors.border} border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className={`font-serif text-lg font-bold ${colors.accent}`}>{insight.doshaType} Dosha</h4>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.text} px-2 py-1 rounded-full`}>
          {insight.doshaType === 'Vata' ? 'Air + Space' : insight.doshaType === 'Pitta' ? 'Fire + Water' : 'Earth + Water'}
        </span>
      </div>

      <p className="text-xs text-gray-600 mb-4 leading-relaxed">{insight.description}</p>

      {/* Strengths */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <FiZap className="w-3.5 h-3.5 text-green-600" />
          <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Strengths</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {insight.strengths.map((s, i) => (
            <span key={i} className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{s}</span>
          ))}
        </div>
      </div>

      {/* Imbalances */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <FiAlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Imbalance Signs</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {insight.imbalances.map((s, i) => (
            <span key={i} className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">{s}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <FiCheckCircle className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Recommended Actions</span>
        </div>
        <ul className="space-y-1">
          {insight.recommendedActions.map((a, i) => (
            <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
              <span className="text-[#2E7D32] mt-0.5">•</span>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default HealthInsightCard;
