import React from 'react';
import { RecoveryTimeline } from '../../services/diseaseApi';

interface DiseaseTimelineProps {
  timeline: RecoveryTimeline[];
}

export const DiseaseTimeline: React.FC<DiseaseTimelineProps> = ({ timeline }) => {
  return (
    <div className="space-y-6">
      <h4 className="font-serif text-base font-bold text-primary border-b border-gray-150 pb-2">
        Clinical Recovery Timeline
      </h4>
      <div className="relative pl-6 border-l-2 border-[#81C784]/30 space-y-6">
        {timeline.map((step, idx) => (
          <div key={idx} className="relative animate-fade-in-up">
            {/* Timeline bullet dot */}
            <div className="absolute -left-[1.85rem] top-0.5 w-4 h-4 rounded-full bg-accent border-4 border-[#F8FFF8]" />
            
            <div className="flex justify-between items-start gap-4">
              <h5 className="font-bold text-primary text-xs">{step.step}</h5>
              {step.duration && (
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {step.duration}
                </span>
              )}
            </div>
            <p className="text-[11px] text-text-secondary mt-1 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiseaseTimeline;
