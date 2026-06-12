import React from 'react';
import { Calendar, ShieldAlert } from 'lucide-react';
import { RecoveryMilestone } from '../../types';

interface RecoveryTimelineProps {
  milestones: RecoveryMilestone[];
  isFallback: boolean;
}

export const RecoveryTimeline: React.FC<RecoveryTimelineProps> = ({ milestones, isFallback }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-150 pb-4 gap-4">
        <div className="space-y-1">
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block">Benchmarks</span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Expected Recovery Timeline</h3>
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-text-secondary bg-[#FAF9F6] border border-primary/10 py-1.5 px-4 rounded-xl font-bold">
          <Calendar className="w-4 h-4 text-primary" />
          <span>Timeline Scale: 90 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {milestones.map((m, idx) => (
          <div 
            key={idx} 
            className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 p-5 rounded-2xl flex flex-col justify-between space-y-3 transition-all h-40 shadow-sm"
          >
            <div className="space-y-1">
              <span className="text-[14px] font-black text-primary font-serif block">
                {m.step}
              </span>
              <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
                {m.description}
              </p>
            </div>
            
            <div className="w-full bg-primary/10 h-1 rounded-full overflow-hidden shrink-0">
              <div 
                className="bg-accent h-full rounded-full" 
                style={{ width: `${(idx + 1) * 20}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {isFallback && (
        <p className="text-[9px] text-text-secondary italic text-center pt-2">
          🍃 Timeline recovery indexes loaded from offline cached values.
        </p>
      )}
    </section>
  );
};

export default RecoveryTimeline;
