import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  color: string; // e.g. "from-emerald-500/10 to-teal-500/10 text-emerald-700 border-emerald-500/20"
  description?: string;
  delayIndex?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: IconComponent,
  color,
  description,
  delayIndex = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delayIndex * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-emerald-950/5 rounded-3xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden"
    >
      <div className="space-y-2.5 relative z-10">
        <span className="text-[10px] uppercase font-black text-text-secondary tracking-widest block">
          {title}
        </span>
        <strong className="font-serif text-3xl font-black text-text-primary block leading-none">
          {value}
        </strong>
        {description && (
          <span className="text-[10px] text-text-secondary font-medium block">
            {description}
          </span>
        )}
      </div>

      {/* Icon Circle */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center border shadow-inner shrink-0 relative z-10`}>
        <IconComponent className="w-6 h-6" />
      </div>
    </motion.div>
  );
};

export default StatCard;
