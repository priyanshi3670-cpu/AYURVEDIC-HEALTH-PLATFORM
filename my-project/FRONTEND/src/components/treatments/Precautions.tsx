import React from 'react';
import { ShieldAlert, AlertCircle, Info } from 'lucide-react';

interface PrecautionsProps {
  precautions: string[];
  contraindications: string[];
}

export const Precautions: React.FC<PrecautionsProps> = ({ precautions, contraindications }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-amber-600 text-[9px] font-bold uppercase tracking-widest block flex items-center space-x-1">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Patient Guidelines</span>
        </span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Precautions & Contraindications</h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
          Important safety alerts and physical conditions when this therapy should be skipped or strictly monitored.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Contraindications Warning Card */}
        <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-red-950 text-sm flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <span>Absolute Contraindications (Do Not Undergo)</span>
          </h4>
          <ul className="space-y-2.5 text-[11px] text-red-900 font-semibold list-disc list-inside leading-relaxed">
            {contraindications.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Precautions Guidelines Card */}
        <div className="bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl space-y-4 shadow-sm">
          <h4 className="font-serif font-bold text-amber-950 text-sm flex items-center space-x-2">
            <Info className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Precautions & Post-Therapy Care Rules</span>
          </h4>
          <ul className="space-y-2.5 text-[11px] text-amber-900 font-semibold list-disc list-inside leading-relaxed">
            {precautions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Precautions;
