import React from 'react';
import { Leaf, Award, Compass, Heart, AlertCircle } from 'lucide-react';
import { LifestyleMetricRecord } from '../../types';
import { motion } from 'framer-motion';

interface LifestyleTrackerProps {
  lifestyleMetrics: LifestyleMetricRecord[];
}

export const LifestyleTracker: React.FC<LifestyleTrackerProps> = ({ lifestyleMetrics }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Compass className="w-5 h-5 text-accent animate-spin-slow" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">svara lifestyle compliance</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Daily Lifestyle Compliance</h3>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lifestyleMetrics.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#FAF9F6] border border-primary/5 p-4.5 rounded-2xl space-y-2.5 shadow-sm"
          >
            {/* Title & metrics */}
            <div className="flex items-center justify-between text-xs text-text-primary">
              <span className="font-serif font-bold text-[13px]">{item.name}</span>
              <span className="font-bold text-primary">
                {item.current}/{item.target} {item.unit}
              </span>
            </div>

            {/* Progress line */}
            <div className="space-y-1">
              <div className="relative h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-550 ease-out"
                  style={{ width: `${item.compliancePercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[8px] font-extrabold uppercase text-text-secondary">
                <span>Compliance Level</span>
                <span className="text-primary">{item.compliancePercentage}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LifestyleTracker;
