import React from 'react';
import { Clipboard, ShieldAlert, Heart, Activity, CalendarCheck, FileCheck } from 'lucide-react';
import { Treatment } from '../../types';

interface ProcedureTimelineProps {
  treatment: Treatment;
}

export const ProcedureTimeline: React.FC<ProcedureTimelineProps> = ({ treatment }) => {
  const defaultSteps = [
    {
      label: 'Consultation',
      description: 'Initial Vaidya pulse assessment (Nadi Pariksha) to identify the root doshic imbalance.'
    },
    {
      label: 'Assessment',
      description: 'Determining your primary body constitution (Prakriti) and present imbalances (Vikriti).'
    },
    {
      label: 'Preparation',
      description: 'Poorva Karma acts: internal Ghee drinking (Snehapana) and local steam sweating (Swedana).'
    },
    {
      label: 'Treatment',
      description: `Performing the core purging or calming therapy of ${treatment.name} under doctor supervision.`
    },
    {
      label: 'Recovery',
      description: 'Paschat Karma dietary protocol (Samsarjana Krama) to gradually rekindle stomach heat.'
    },
    {
      label: 'Follow-up',
      description: 'Final review consultation to prescribe seasonal herbs and maintain systemic dosha alignment.'
    }
  ];

  // Map icons to index
  const icons = [FileCheck, CalendarCheck, ShieldAlert, Activity, Heart, Clipboard];

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="bg-[#2E7D32]/5 text-primary border border-primary/10 text-[9px] font-bold py-1 px-3.5 rounded-full uppercase tracking-wider inline-block">
          Clinical Protocol
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Procedure Step-by-Step</h2>
        <p className="text-xs text-text-secondary leading-relaxed">
          The structural phases of the treatment cycle, detailing preparatory detoxification through rehabilitation follow-up.
        </p>
      </div>

      {/* Grid Timeline Layout */}
      <div className="relative border-l border-primary/20 ml-4 md:ml-6 pl-6 md:pl-8 space-y-8 py-2 max-w-3xl mx-auto text-xs">
        {defaultSteps.map((step, idx) => {
          const IconComponent = icons[idx];
          return (
            <div key={idx} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[45px] md:-left-[53px] top-0.5 w-9 h-9 rounded-full bg-[#F8FFF8] border-2 border-primary/25 flex items-center justify-center text-primary shadow-sm group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <IconComponent className="w-4 h-4 shrink-0" />
              </div>

              {/* Card item */}
              <div className="bg-[#FAF9F6] border border-[#2E7D32]/5 hover:border-primary/25 p-4 rounded-2xl space-y-1.5 transition-all shadow-sm">
                <span className="text-[9px] font-black text-accent block uppercase tracking-wider">
                  Stage 0{idx + 1} &bull; {step.label}
                </span>
                <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProcedureTimeline;
