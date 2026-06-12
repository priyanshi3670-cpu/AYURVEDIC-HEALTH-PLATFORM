import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, HelpCircle, Activity } from 'lucide-react';

interface ComparisonMetric {
  name: string;
  category: string;
  initial: string;
  current: string;
  improvement: string;
  status: 'excellent' | 'good' | 'stable';
}

export const ProgressComparison: React.FC = () => {
  const metrics: ComparisonMetric[] = [
    {
      name: 'Knee Flexion Mobility',
      category: 'Physical Joint',
      initial: '90° (Severe restriction)',
      current: '135° (Near full range)',
      improvement: '+45° Range of Motion',
      status: 'excellent'
    },
    {
      name: 'Morning Pain Index',
      category: 'Symptom Level',
      initial: '8.5 / 10 (Severe stiffness)',
      current: '2.0 / 10 (Mild stiffness)',
      improvement: '76% Pain Reduction',
      status: 'excellent'
    },
    {
      name: 'Toxin (Ama) Cleansing',
      category: 'Systemic Fire',
      initial: 'Heavy coated white tongue',
      current: 'Clear healthy pink tongue',
      improvement: 'Agni Fire Fully Restored',
      status: 'excellent'
    },
    {
      name: 'Digestive Fire (Agni)',
      category: 'Metabolic',
      initial: 'Irregular (Visham Agni)',
      current: 'Balanced (Sama Agni)',
      improvement: 'Consistent Appetite',
      status: 'good'
    },
    {
      name: 'Ojas (Vital Energy)',
      category: 'Energy Levels',
      initial: 'Chronic fatigued morning baseline',
      current: 'Vibrant morning active state',
      improvement: '70% Energy Gain',
      status: 'good'
    },
    {
      name: 'Sleep Adherence',
      category: 'Lifestyle',
      initial: '5.5 hours (Disrupted Vata)',
      current: '7.5 hours (Deep restorative)',
      improvement: '36% Duration Gain',
      status: 'good'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-700 flex items-center justify-center border border-emerald-500/20 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-black text-text-primary">Start vs Current Baseline</h3>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Comparative analysis of recovery metrics</p>
          </div>
        </div>
        <div className="flex items-center text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-500/10 px-2.5 py-1 rounded-full">
          <Activity className="w-3.5 h-3.5 mr-1" />
          <span>Active Plan Day 28</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-emerald-950/5 text-[9px] uppercase font-black text-text-secondary tracking-wider pb-3">
              <th className="pb-3 pr-4">Health Parameter</th>
              <th className="pb-3 pr-4">Initial State (Day 1)</th>
              <th className="pb-3 pr-4">Current State (Day 28)</th>
              <th className="pb-3">Improvement Cleansed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-950/5">
            {metrics.map((m, idx) => (
              <tr key={idx} className="group hover:bg-emerald-50/10 transition-colors duration-150">
                <td className="py-4 pr-4">
                  <div className="space-y-0.5">
                    <strong className="text-xs font-bold text-text-primary group-hover:text-emerald-700 transition-colors">
                      {m.name}
                    </strong>
                    <span className="text-[9px] text-text-secondary font-bold uppercase block tracking-wider">
                      {m.category}
                    </span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs text-rose-700 font-bold bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-500/10">
                    {m.initial}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-500/10">
                    {m.current}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-1">
                    <span className={`text-xs font-black uppercase tracking-wider ${
                      m.status === 'excellent' ? 'text-emerald-600' : 'text-teal-600'
                    }`}>
                      {m.improvement}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center space-x-2 text-[10px] text-text-secondary font-bold bg-emerald-50/20 p-3 rounded-xl border border-emerald-500/5">
        <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Vedic measurements are verified based on tongue diagnostic codes, joint flexion calculations, and pulse-diagnostic metrics.</span>
      </div>
    </motion.div>
  );
};

export default ProgressComparison;
