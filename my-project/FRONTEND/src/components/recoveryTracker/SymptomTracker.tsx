import React from 'react';
import { AlertCircle, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { SymptomRecord } from '../../types';
import { motion } from 'framer-motion';

interface SymptomTrackerProps {
  symptoms: SymptomRecord[];
}

export const SymptomTracker: React.FC<SymptomTrackerProps> = ({ symptoms }) => {
  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'Severe': return 'bg-red-500/10 text-red-700 border-red-500/20';
      case 'Moderate': return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      default: return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Improving': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'Stable': return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      default: return 'bg-red-500/10 text-red-700 border-red-500/20';
    }
  };

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">symptom intensity logs</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Active Symptoms Tracker</h3>
        </div>
      </div>

      {/* Symptoms Grid */}
      <div className="space-y-4">
        {symptoms.map((sym, index) => (
          <motion.div
            key={sym.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-[#FAF9F6] border border-primary/5 p-4.5 rounded-2xl space-y-3.5 shadow-sm"
          >
            {/* Top Details line */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <h4 className="font-serif font-black text-xs md:text-sm text-text-primary">
                  {sym.symptom}
                </h4>
                <span className="text-[8.5px] text-text-secondary font-bold">Recorded Date: {sym.recordedDate}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[8px] font-black uppercase tracking-wider shrink-0">
                <span className={`px-2.5 py-1 rounded-md border ${getSeverityStyle(sym.severity)}`}>
                  {sym.severity} Severity
                </span>
                <span className={`px-2.5 py-1 rounded-md border ${getStatusStyle(sym.status)}`}>
                  {sym.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[9.5px] font-bold">
                <span className="text-text-secondary">Improvement Ratio</span>
                <span className="text-primary flex items-center">
                  <span>{sym.improvementPercentage}%</span>
                  <ArrowUpRight className="w-3 h-3 text-accent shrink-0 ml-0.5" />
                </span>
              </div>
              <div className="relative h-2.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${sym.improvementPercentage}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SymptomTracker;
