import React from 'react';
import { Clock, Sun, Moon, Coffee, Heart, Compass } from 'lucide-react';
import { DailyRoutine } from '../../types';
import { motion } from 'framer-motion';

interface DailyRoutineCardProps {
  routine: DailyRoutine;
}

export const DailyRoutineCard: React.FC<DailyRoutineCardProps> = ({ routine }) => {
  const steps = [
    { label: 'Brahma Muhurta (Wake Up)', time: routine.wakeUp, icon: Sun, desc: 'Wake up during the auspicious hours of morning when energy is fresh.' },
    { label: 'Pratah Ahara (Morning Meal)', time: routine.morningMeal, icon: Coffee, desc: 'Consume a warm, light nourishing breakfast matching dosha requirements.' },
    { label: 'Madhyahna (Midday Digest)', time: routine.midday, icon: Compass, desc: 'Eat your largest, most robust meal when sun and digestive fire (Agni) are highest.' },
    { label: 'Sayahna (Light Dinner)', time: routine.eveningMeal, icon: Heart, desc: 'Have a light warm dinner at least 2.5-3 hours before retiring to sleep.' },
    { label: 'Nidra (Sleep Time)', time: routine.sleepTime, icon: Moon, desc: 'Rest before 10:30 PM to optimize cellular regeneration and liver detoxification cycles.' }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Clock className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">dinacharya sun alignment</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Ayurvedic Daily Routine</h3>
        </div>
      </div>

      {/* Routine Timeline list */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#FAF9F6] border border-primary/5 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="font-serif font-black text-xs text-text-primary">
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-text-secondary leading-normal font-semibold">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-150 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 text-[9.5px] font-bold text-text-secondary shrink-0 self-start sm:self-center">
                <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>{step.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyRoutineCard;
