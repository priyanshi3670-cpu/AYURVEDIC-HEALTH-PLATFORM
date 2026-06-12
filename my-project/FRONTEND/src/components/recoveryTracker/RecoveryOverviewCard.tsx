import React from 'react';
import { Heart, Activity, Zap, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecoveryOverviewCardProps {
  completionPercentage: number;
  healthScore: number;
  energyLevel: number;
  sleepQuality: number;
  stressLevel: number;
}

export const RecoveryOverviewCard: React.FC<RecoveryOverviewCardProps> = ({
  completionPercentage,
  healthScore,
  energyLevel,
  sleepQuality,
  stressLevel
}) => {
  const cards = [
    {
      id: 'completion',
      title: 'Overall Recovery',
      value: `${completionPercentage}%`,
      subText: 'Expected: 3 days remaining',
      icon: Heart,
      color: 'from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-500/20'
    },
    {
      id: 'health',
      title: 'Vedic Health Score',
      value: `${healthScore}/100`,
      subText: 'Based on Agni fire balance',
      icon: Activity,
      color: 'from-blue-500/10 to-cyan-500/10 text-blue-700 border-blue-500/20'
    },
    {
      id: 'energy',
      title: 'Ojas Energy Level',
      value: `${energyLevel}%`,
      subText: 'Optimized morning baseline',
      icon: Zap,
      color: 'from-amber-500/10 to-yellow-500/10 text-amber-700 border-amber-500/20'
    },
    {
      id: 'sleep',
      title: 'Nidra Sleep Quality',
      value: `${sleepQuality}%`,
      subText: 'Deep restorative cycles',
      icon: Moon,
      color: 'from-indigo-500/10 to-indigo-650/10 text-indigo-700 border-indigo-500/20'
    },
    {
      id: 'stress',
      title: 'Mental Calmness',
      value: `${100 - stressLevel}%`,
      subText: 'Reduced cortisol markers',
      icon: Sparkles,
      color: 'from-rose-500/10 to-pink-500/10 text-rose-700 border-rose-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ y: -3 }}
            className="bg-white border border-emerald-950/5 rounded-2xl p-5 flex flex-col justify-between h-36 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <span className="text-[9px] uppercase font-black text-text-secondary tracking-wider block">
                {card.title}
              </span>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center border shadow-sm`}>
                <IconComponent className="w-4 h-4 shrink-0" />
              </div>
            </div>

            <div className="space-y-1">
              <strong className="font-serif text-2xl font-black text-text-primary block leading-none">
                {card.value}
              </strong>
              <span className="text-[8.5px] text-text-secondary font-bold block truncate">
                {card.subText}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecoveryOverviewCard;
