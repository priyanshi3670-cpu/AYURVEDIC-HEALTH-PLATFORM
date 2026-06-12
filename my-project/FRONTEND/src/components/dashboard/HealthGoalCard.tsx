import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { HealthGoal } from '../../types';
import { motion } from 'framer-motion';

interface HealthGoalCardProps {
  goals: HealthGoal[];
  onGoalSelect?: (goal: HealthGoal) => void;
}

export const HealthGoalCard: React.FC<HealthGoalCardProps> = ({
  goals,
  onGoalSelect
}) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Target className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">sankalpa milestones</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Active Ayurvedic Health Goals</h3>
        </div>
      </div>

      {/* Goals listing */}
      <div className="space-y-5">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            onClick={() => onGoalSelect && onGoalSelect(goal)}
            className={`space-y-2.5 ${onGoalSelect ? 'cursor-pointer hover:opacity-95' : ''}`}
          >
            {/* Title & percentage */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <strong className="font-serif font-bold text-text-primary text-[13px]">{goal.title}</strong>
              </div>
              <strong className="text-primary font-black text-sm">{goal.progress}%</strong>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 w-full bg-gray-200/60 rounded-full overflow-hidden shadow-inner border border-gray-100/50">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${goal.progress}%` }}
              />
            </div>

            {/* Target text */}
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-text-secondary block pl-6">
              Target Indicator: <span className="text-primary">{goal.target}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HealthGoalCard;
