import React from 'react';
import { motion } from 'framer-motion';
import { AIDoshaInsight } from '../../types';
import { FiStar, FiAlertTriangle, FiTarget } from 'react-icons/fi';

interface DoshaDashboardProps {
  insights: AIDoshaInsight[];
  dominantDosha?: string;
}

const doshaEmojis: Record<string, string> = { Vata: '💨', Pitta: '🔥', Kapha: '🌍' };

const DoshaDashboard: React.FC<DoshaDashboardProps> = ({ insights, dominantDosha = 'Pitta' }) => {
  const active = insights.find(i => i.doshaType === dominantDosha) || insights[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#388E3C] px-6 py-4 text-white">
        <h3 className="font-serif text-lg font-bold">Dosha Intelligence Dashboard</h3>
        <p className="text-[10px] text-emerald-200 mt-0.5">Your constitutional analysis & balance insights</p>
      </div>

      <div className="p-6">
        {/* Dosha Selector */}
        <div className="flex gap-2 mb-6">
          {insights.map(insight => (
            <div
              key={insight.id}
              className={`flex-1 text-center py-3 rounded-xl border cursor-pointer transition-all ${
                insight.doshaType === active?.doshaType
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-md'
                  : 'bg-[#F8FFF8] text-gray-600 border-emerald-100 hover:border-[#81C784]'
              }`}
            >
              <span className="text-xl block mb-1">{doshaEmojis[insight.doshaType] || '🌿'}</span>
              <span className="text-xs font-bold">{insight.doshaType}</span>
            </div>
          ))}
        </div>

        {active && (
          <div className="space-y-4">
            {/* Type Badge */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{doshaEmojis[active.doshaType]}</span>
              <div>
                <h4 className="font-bold text-gray-800">{active.doshaType} Dosha</h4>
                <p className="text-xs text-gray-500">{active.description}</p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Strengths */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <FiStar className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-[10px] font-bold text-green-800 uppercase tracking-wider">Strengths</span>
                </div>
                <ul className="space-y-1">
                  {active.strengths.map((s, i) => (
                    <li key={i} className="text-xs text-green-700 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Imbalances */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <FiAlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Imbalances</span>
                </div>
                <ul className="space-y-1">
                  {active.imbalances.map((s, i) => (
                    <li key={i} className="text-xs text-amber-700 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <FiTarget className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Actions</span>
                </div>
                <ul className="space-y-1">
                  {active.recommendedActions.map((s, i) => (
                    <li key={i} className="text-xs text-blue-700 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoshaDashboard;
