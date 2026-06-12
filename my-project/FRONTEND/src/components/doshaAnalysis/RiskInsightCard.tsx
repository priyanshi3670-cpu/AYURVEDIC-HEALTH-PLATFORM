import React from 'react';
import { ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RiskInsightCardProps {
  imbalances: string;
  preventive: string;
}

export const RiskInsightCard: React.FC<RiskInsightCardProps> = ({ imbalances, preventive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">constitution health alerts</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Health Risk Insights</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Potential Imbalances */}
        <div className="flex items-start space-x-3.5 p-4.5 bg-amber-50/30 border border-amber-500/10 rounded-2xl">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-serif font-black text-text-primary">Potential Imbalances</h4>
            <p className="text-text-secondary leading-relaxed font-semibold">{imbalances}</p>
          </div>
        </div>

        {/* Preventive Measures */}
        <div className="flex items-start space-x-3.5 p-4.5 bg-emerald-50/20 border border-emerald-500/10 rounded-2xl">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-serif font-black text-text-primary">Preventive Measures</h4>
            <p className="text-text-secondary leading-relaxed font-semibold">{preventive}</p>
          </div>
        </div>
      </div>

      <div className="flex items-start space-x-2 text-[10px] text-text-secondary font-bold bg-[#FAF9F6] p-3.5 rounded-xl border border-primary/5">
        <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>Prakriti represents your permanent constitution. Vikriti represents your current temporary state of imbalance. Always verify detailed health changes under professional Vaidya guidelines.</span>
      </div>
    </motion.div>
  );
};

export default RiskInsightCard;
