import React, { useState } from 'react';
import { Check, Clipboard, Calendar, Flame, Compass, Star, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineStep {
  id: number;
  label: string;
  desc: string;
  icon: React.ComponentType<any>;
  status: 'done' | 'active' | 'upcoming';
}

const defaultSteps: TimelineStep[] = [
  { id: 1, label: 'Initial Diagnosis', desc: 'Pulse-diagnosis read as Vata accumulation.', icon: Clipboard, status: 'done' },
  { id: 2, label: 'Consultation', desc: 'Custom 30-day retreat schedule mapped.', icon: Calendar, status: 'done' },
  { id: 3, label: 'Treatment Started', desc: 'Localized warm Janu Basti oil pool treatment.', icon: Flame, status: 'done' },
  { id: 4, label: 'Lifestyle Changes', desc: 'Organic dietary logs & morning stretches.', icon: Compass, status: 'done' },
  { id: 5, label: 'Milestone Achieved', desc: 'Agni digestive fire index fully rebalanced.', icon: Star, status: 'active' },
  { id: 6, label: 'Recovery Progress', desc: 'Joint soreness reduced by 75%.', icon: Heart, status: 'upcoming' },
  { id: 7, label: 'Wellness Achieved', desc: 'Complete physical & mental vitality restore.', icon: Award, status: 'upcoming' }
];

export const HealingTimeline: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(5);

  const activeStepDetail = defaultSteps.find(s => s.id === selectedStep) || defaultSteps[4];

  const getStatusColor = (status: string, isSelected: boolean) => {
    if (isSelected) return 'bg-primary text-white border-primary scale-103 shadow-md';
    switch (status) {
      case 'done':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-50';
      case 'active':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-50';
      default:
        return 'bg-gray-50 text-text-secondary border-gray-150 hover:bg-gray-100/50';
    }
  };

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">healing sequence</span>
        <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Healing Journey Roadmap</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Interactive steps mapping your diagnostic sequence. Select a node to view accomplishments.
        </p>
      </div>

      {/* Horizontal Flex Grid on Desktop, Vertical on Mobile */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 relative">
        {/* Connection line behind nodes on desktop */}
        <div className="hidden lg:block absolute left-6 right-6 top-[38px] h-1.5 bg-[#FAF9F6] border-y border-emerald-950/5 -z-10" />

        {defaultSteps.map((step) => {
          const IconComponent = step.icon;
          const isSelected = selectedStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step.id)}
              className="flex items-center lg:flex-col lg:text-center text-left gap-4 lg:gap-3 cursor-pointer shrink-0 lg:w-32 group"
            >
              {/* Connector line for mobile */}
              <div className="lg:hidden w-0.5 h-8 bg-gray-200 -mt-6 absolute left-8 -z-10" />

              {/* Node Circle */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 ${getStatusColor(step.status, isSelected)}`}>
                {step.status === 'done' && !isSelected ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <IconComponent className="w-5 h-5 shrink-0" />
                )}
              </div>

              {/* Label */}
              <div className="space-y-0.5">
                <span className={`text-[11px] font-bold block transition-colors group-hover:text-primary ${
                  isSelected ? 'text-primary font-black' : 'text-text-primary'
                }`}>
                  {step.label}
                </span>
                <span className="lg:hidden text-[9.5px] text-text-secondary font-medium block truncate max-w-[200px]">
                  {step.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Display */}
      {activeStepDetail && (
        <div className="bg-[#FAF9F6] border border-primary/10 p-5 rounded-2xl flex items-start space-x-4 animate-fade-in-up">
          <div className="w-12 h-12 rounded-2xl bg-white border border-primary/5 flex items-center justify-center text-primary shadow-sm shrink-0">
            {React.createElement(activeStepDetail.icon, { className: 'w-6 h-6 text-accent shrink-0' })}
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center space-x-2.5">
              <h4 className="font-serif font-black text-primary text-sm leading-none">
                {activeStepDetail.label}
              </h4>
              <span className={`text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${
                activeStepDetail.status === 'done' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' :
                activeStepDetail.status === 'active' ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' :
                'bg-gray-50 text-text-secondary border-gray-150'
              }`}>
                {activeStepDetail.status}
              </span>
            </div>
            <p className="text-text-secondary font-semibold leading-relaxed">
              {activeStepDetail.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HealingTimeline;
