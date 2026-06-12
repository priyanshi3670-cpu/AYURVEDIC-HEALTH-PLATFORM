import React from 'react';
import { Clipboard, Search, Play, Sprout, TrendingUp, Heart } from 'lucide-react';

export const TreatmentTimeline: React.FC = () => {
  const steps = [
    {
      title: 'Consultation',
      description: 'Discuss symptoms and determine root imbalance.',
      icon: Clipboard
    },
    {
      title: 'Assessment',
      description: 'Detailed analysis of physical constitution (Prakriti).',
      icon: Search
    },
    {
      title: 'Treatment Start',
      description: 'Administering tailored therapies and herbal medicines.',
      icon: Play
    },
    {
      title: 'Lifestyle Changes',
      description: 'Implementing custom diets and daily routines (Dinacharya).',
      icon: Sprout
    },
    {
      title: 'Progress Tracking',
      description: 'Weekly evaluations of dosha stabilization changes.',
      icon: TrendingUp
    },
    {
      title: 'Recovery',
      description: 'Restored vitality, balanced Agni, and systemic health.',
      icon: Heart
    }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="bg-[#2E7D32]/5 text-primary border border-primary/10 text-[9px] font-bold py-1 px-3.5 rounded-full uppercase tracking-wider inline-block">
          Patient Journey
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Your Recovery Timeline</h2>
        <p className="text-xs text-text-secondary leading-relaxed">
          See the structured path we follow to guide you from initial diagnosis back to full bodily harmony.
        </p>
      </div>

      {/* Horizontal Timeline Layout for Desktop, Stacked for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative">
        {/* Horizontal Connector Line for Desktop */}
        <div className="absolute top-7 left-[5%] right-[5%] h-[2px] bg-primary/15 z-0 hidden md:block" />

        {steps.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="flex flex-col items-center text-center space-y-3 relative z-10 group">
              {/* Step circle */}
              <div className="w-14 h-14 rounded-full bg-[#F8FFF8] border-2 border-primary/20 flex items-center justify-center text-primary shadow-sm group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <IconComponent className="w-6 h-6 shrink-0" />
              </div>

              {/* Step info */}
              <div className="space-y-1.5 px-2">
                <span className="text-[10px] font-black text-accent block uppercase tracking-wider">
                  Stage 0{idx + 1}
                </span>
                <h4 className="text-xs font-bold text-primary font-serif leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TreatmentTimeline;
