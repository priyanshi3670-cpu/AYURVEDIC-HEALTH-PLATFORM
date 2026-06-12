import React from 'react';
import { RecoveryAchievement } from '../../types';
import { Flame, Shield, Award, Sparkles, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  achievements: RecoveryAchievement[];
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievements }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return Flame;
      case 'Shield':
        return Shield;
      case 'Award':
        return Award;
      case 'Sparkles':
        return Sparkles;
      default:
        return Award;
    }
  };

  const colors = {
    Flame: 'from-amber-500/10 to-orange-500/10 text-orange-600 border-orange-500/20',
    Shield: 'from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-500/20',
    Award: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-500/20',
    Sparkles: 'from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-500/20',
  };

  return (
    <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-5">
      <div className="flex items-center space-x-3 border-b border-emerald-50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 text-purple-700 flex items-center justify-center border border-purple-500/20 shadow-sm">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-base font-black text-text-primary">Healing Achievements</h3>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Milestone badges earned in wellness path</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach, idx) => {
          const Icon = getIcon(ach.icon);
          const isUnlocked = !!ach.unlockedDate;
          const colorClass = colors[ach.icon as keyof typeof colors] || colors.Award;

          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={isUnlocked ? { y: -3 } : {}}
              className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-between text-center relative ${
                isUnlocked 
                  ? 'bg-gradient-to-br from-white to-emerald-50/10 border-emerald-950/5 hover:border-emerald-600/20 shadow-sm' 
                  : 'bg-emerald-50/5 border-dashed border-emerald-950/10 opacity-60'
              }`}
            >
              {!isUnlocked && (
                <div className="absolute top-2 right-2 text-text-secondary">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm mb-3 ${
                isUnlocked ? `bg-gradient-to-br ${colorClass}` : 'bg-emerald-950/5 text-text-secondary/60 border-emerald-950/10'
              }`}>
                <Icon className="w-6 h-6 shrink-0" />
              </div>

              <div className="space-y-1 mb-3">
                <strong className={`text-xs font-bold block ${isUnlocked ? 'text-text-primary' : 'text-text-secondary/80'}`}>
                  {ach.title}
                </strong>
                <p className="text-[10px] text-text-secondary leading-normal font-medium max-w-[150px]">
                  {ach.description}
                </p>
              </div>

              {isUnlocked ? (
                <span className="text-[9px] font-black text-emerald-800 bg-emerald-50 border border-emerald-500/15 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Unlocked: {ach.unlockedDate}
                </span>
              ) : (
                <span className="text-[9px] font-bold text-text-secondary/70 bg-emerald-950/5 border border-emerald-950/5 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Locked
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementBadge;
