import React from 'react';
import { Target, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Treatment } from '../../types';

interface TreatmentOverviewProps {
  treatment: Treatment;
}

export const TreatmentOverview: React.FC<TreatmentOverviewProps> = ({ treatment }) => {
  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-primary">Therapeutic Profile & Overview</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Description & Purpose */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-4.5 h-4.5 text-accent shrink-0" />
              <span>What is {treatment.name}?</span>
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-medium">
              {treatment.overview}
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-50">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center space-x-1.5">
              <Target className="w-4.5 h-4.5 text-accent shrink-0" />
              <span>Physiological Purpose & Target Doshas</span>
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed font-medium">
              The primary aim of {treatment.name} is to clean accumulated metabolic waste (Ama) from bodily pathways (Srotas), restoring primary metabolic fire (Agni) and soothing aggravated dosha constitution.
            </p>
          </div>
        </div>

        {/* Right Column: Suitability & Key Benefits */}
        <div className="space-y-5 bg-[#FAF9F6] p-5 rounded-2xl border border-primary/5">
          <div className="space-y-3">
            <h3 className="text-xs font-black text-primary uppercase tracking-wider block">
              Who Should Consider It?
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {treatment.suitableFor.map((cond, i) => (
                <span 
                  key={i} 
                  className="bg-[#2E7D32]/5 border border-primary/10 text-primary py-1 px-2.5 rounded-lg font-bold text-[9px] uppercase tracking-wide"
                >
                  {cond}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-gray-150">
            <h4 className="text-[10px] font-black text-text-secondary uppercase tracking-widest block">
              Immediate Outcomes
            </h4>
            <div className="space-y-2">
              {treatment.benefits.slice(0, 3).map((benefit, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs font-semibold text-text-primary">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentOverview;
