import React from 'react';
import { ShieldCheck, Heart, Sparkles, Star } from 'lucide-react';
import { RecoveryWellnessScore } from '../../types';
import { motion } from 'framer-motion';

interface WellnessScoreCardProps {
  score: RecoveryWellnessScore;
}

export const WellnessScoreCard: React.FC<WellnessScoreCardProps> = ({ score }) => {
  const categories = [
    { id: 'overall', name: 'Overall Index', value: score.overall, color: 'text-primary', stroke: '#2E7D32', icon: Star },
    { id: 'physical', name: 'Annamaya (Physical)', value: score.physical, color: 'text-blue-600', stroke: '#2563EB', icon: Heart },
    { id: 'mental', name: 'Manomaya (Mental)', value: score.mental, color: 'text-purple-600', stroke: '#9333EA', icon: Sparkles },
    { id: 'lifestyle', name: 'Vijnanamaya (Life)', value: score.lifestyle, color: 'text-amber-600', stroke: '#D97706', icon: ShieldCheck }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">holistic indexes</span>
        <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Vedic Wellness Scoreboard</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, index) => {
          const IconComp = cat.icon;
          // SVG Circle calculation
          const radius = 35;
          const strokeWidth = 6;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (cat.value / 100) * circumference;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="bg-[#FAF9F6] border border-primary/5 rounded-2xl p-5 flex flex-col items-center text-center space-y-4 shadow-sm"
            >
              {/* Circular Gauge */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="transparent"
                    stroke="#E2E8F0"
                    strokeWidth={strokeWidth}
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    fill="transparent"
                    stroke={cat.stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                {/* Center score details */}
                <div className="absolute flex flex-col items-center justify-center leading-none">
                  <strong className="text-text-primary text-lg font-black">{cat.value}%</strong>
                  <IconComp className="w-3.5 h-3.5 text-accent mt-0.5" />
                </div>
              </div>

              {/* Title label */}
              <div className="space-y-0.5">
                <h4 className="font-serif font-black text-text-primary text-xs leading-tight">
                  {cat.name}
                </h4>
                <span className="text-[8.5px] uppercase font-bold text-text-secondary">
                  Target: 90% Optimal
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WellnessScoreCard;
