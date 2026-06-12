import React from 'react';
import { motion } from 'framer-motion';
import { AITreatmentRec } from '../../types';
import { FiClock, FiUser, FiTrendingUp } from 'react-icons/fi';

interface TreatmentRecommendationProps {
  treatments: AITreatmentRec[];
}

const TreatmentRecommendation: React.FC<TreatmentRecommendationProps> = ({ treatments }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <h3 className="font-serif text-lg font-bold text-gray-800 mb-1">Treatment Recommendation Engine</h3>
      <p className="text-xs text-gray-400 mb-5">AI-suggested Ayurvedic treatments based on your profile</p>

      <div className="space-y-3">
        {treatments.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#F8FFF8] border border-emerald-100 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-gray-800">{t.treatmentName}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[10px] text-gray-500">
                    <FiClock className="w-3 h-3" /> {t.estimatedDuration}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-500">
                    <FiUser className="w-3 h-3" /> {t.recommendedDoctor}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-emerald-100 px-2 py-1 rounded-full">
                <FiTrendingUp className="w-3 h-3 text-[#2E7D32]" />
                <span className="text-[10px] font-bold text-[#2E7D32]">{t.confidence}%</span>
              </div>
            </div>

            {/* Confidence Bar */}
            <div className="w-full h-1.5 bg-emerald-100 rounded-full mb-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${t.confidence}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full bg-gradient-to-r from-[#2E7D32] to-[#81C784] rounded-full"
              />
            </div>

            <div className="flex flex-wrap gap-1.5">
              {t.benefits.map((b, j) => (
                <span key={j} className="text-[10px] bg-white border border-emerald-200 text-[#2E7D32] px-2 py-0.5 rounded-full font-medium">
                  {b}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TreatmentRecommendation;
