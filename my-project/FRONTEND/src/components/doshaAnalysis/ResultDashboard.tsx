import React, { useState } from 'react';
import { DoshaResult } from '../../types';
import { Award, Leaf, Clock, Brain, Activity, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Subcomponents
import DoshaCharts from './DoshaCharts';
import FoodRecommendation from './FoodRecommendation';
import DailyRoutineCard from './DailyRoutineCard';
import TreatmentRecommendation from './TreatmentRecommendation';
import RiskInsightCard from './RiskInsightCard';
import ReportExporter from './ReportExporter';

interface ResultDashboardProps {
  result: DoshaResult;
  recom: any; // recommendation dataset for dominant dosha
  isFallback: boolean;
  onRetake: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, recom, isFallback, onRetake }) => {
  const [activeTab, setActiveTab] = useState<'diet' | 'routine' | 'mind' | 'remedies'>('diet');

  const getDoshaTitleInfo = (dosha: string) => {
    switch (dosha) {
      case 'Vata': return { title: 'Vata Dominant', desc: 'Air & Ether energies shape your body. You are highly creative, quick-minded, energetic, and active, but prone to anxiety, dry skin, and irregular digestion.' };
      case 'Pitta': return { title: 'Pitta Dominant', desc: 'Fire & Water bio-energies rule your system. You are highly intelligent, focused, determined, and possess strong digestion, but easily prone to acidity, skin inflammation, and impatience.' };
      case 'Kapha': return { title: 'Kapha Dominant', desc: 'Water & Earth forces govern your framework. You are calm, loving, patient, physically strong, and steady, but prone to weight gain, lethargy, and mucous congestion.' };
      default:
        // Dual doshas
        if (dosha.startsWith('Vata-Pitta') || dosha.startsWith('Pitta-Vata')) {
          return { title: 'Vata-Pitta Constitution', desc: 'You carry a double bio-energy makeup. Creative, talkative, and swift like Vata, combined with the sharp intellect, focus, and digestive warmth of Pitta.' };
        }
        if (dosha.startsWith('Pitta-Kapha') || dosha.startsWith('Kapha-Pitta')) {
          return { title: 'Pitta-Kapha Constitution', desc: 'A double bio-energy blend. Sharp, competitive, and active like Pitta, balanced by the calm, patient stability and physical strength of Kapha.' };
        }
        return { title: 'Vata-Kapha Constitution', desc: 'A double bio-energy blend. Imaginative, quick-thinking, and light like Vata, combined with the cool, calm, slow-paced, and sturdy physical framework of Kapha.' };
    }
  };

  const info = getDoshaTitleInfo(result.dominantDosha);

  const tabs = [
    { id: 'diet' as const, name: 'Diet & Food', icon: Leaf },
    { id: 'routine' as const, name: 'Routine & Sleep', icon: Clock },
    { id: 'mind' as const, name: 'Yoga & Mind', icon: Brain },
    { id: 'remedies' as const, name: 'Therapies & Risks', icon: Activity }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 1. DOMINANT CONSTITUTION PROFILE HERO */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-500/10 print:border-black print:text-black print:bg-none print:shadow-none">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none print:hidden" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none print:hidden" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-accent px-4 py-1.5 rounded-full inline-block border border-accent/25 print:border-black print:text-black">
              Your Primary Prakriti Constitution
            </span>
            <h1 className="font-serif text-2xl md:text-4xl font-black leading-tight">
              Dominant Dosha: <span className="text-accent print:text-black">{result.dominantDosha}</span>
            </h1>
            {result.secondaryDosha && (
              <h2 className="text-sm font-bold text-white/90 print:text-black">
                Secondary Bio-energy: <strong className="text-emerald-300 print:text-black">{result.secondaryDosha}</strong>
              </h2>
            )}
            <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed print:text-black pt-1">
              {info.desc}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl print:border-black print:text-black print:bg-none self-start sm:self-center">
            <div className="text-left text-xs font-bold space-y-1">
              <span className="text-white/60 text-[9px] uppercase font-black block print:text-black">Composition breakdown</span>
              <div className="flex space-x-3 text-[11px]">
                <span className="text-sky-300 print:text-black">V: {result.vataPercentage}%</span>
                <span className="text-orange-300 print:text-black">P: {result.pittaPercentage}%</span>
                <span className="text-emerald-300 print:text-black">K: {result.kaphaPercentage}%</span>
              </div>
            </div>
            <button
              onClick={onRetake}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-serif px-4 py-2 rounded-xl text-xs font-black shadow transition-all cursor-pointer text-center block"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </section>

      {/* 2. RECHARTS PLOTS COMPONENT */}
      <DoshaCharts 
        vata={result.vataPercentage}
        pitta={result.pittaPercentage}
        kapha={result.kaphaPercentage}
      />

      {/* 3. EXPORTERS ACTIONS */}
      <ReportExporter result={result} isFallback={isFallback} />

      {/* 4. INTERACTIVE TABS SELECTOR */}
      <div className="space-y-6">
        <div className="flex items-center space-x-1.5 border-b border-gray-150 pb-2.5 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-primary text-white shadow' 
                    : 'text-text-secondary hover:bg-emerald-50/10 hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* 5. TAB VIEW CONTAINER */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeTab === 'diet' && (
              <motion.div
                key="diet"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Diet recommendations general cards */}
                <div className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                  <span className="text-primary font-black text-xs uppercase tracking-wide block">Ahara Nutrition Path</span>
                  <ul className="space-y-3">
                    {recom.diet.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed font-semibold">
                        <span className="text-emerald-600 mr-2.5 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Favor/Avoid items lists */}
                <FoodRecommendation
                  dosha={result.dominantDosha}
                  eat={recom.eat}
                  avoid={recom.avoid}
                />
              </motion.div>
            )}

            {activeTab === 'routine' && (
              <motion.div
                key="routine"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Lifestyle & Sleep guideline cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                    <span className="text-primary font-black text-xs uppercase tracking-wide block">Dinacharya Lifestyle Tips</span>
                    <ul className="space-y-3">
                      {recom.lifestyle.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed font-semibold">
                          <span className="text-emerald-600 mr-2.5 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-primary font-black text-xs uppercase tracking-wide block">Nidra (Sleep Guidelines)</span>
                      <ul className="space-y-3">
                        {recom.sleep.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed font-semibold">
                            <span className="text-emerald-600 mr-2.5 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-emerald-50/25 p-3 rounded-xl border border-emerald-500/5 text-[10px] text-text-secondary font-bold flex items-center space-x-1 mt-3">
                      <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Syncing sleep cycles with solar clocks enhances cellular metabolism.</span>
                    </div>
                  </div>
                </div>

                {/* Sun schedules Dinacharya timeline card */}
                <DailyRoutineCard routine={recom} />
              </motion.div>
            )}

            {activeTab === 'mind' && (
              <motion.div
                key="mind"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Yoga Poses */}
                <div className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                  <span className="text-primary font-black text-xs uppercase tracking-wide block">Asana (Yoga Postures suggested)</span>
                  <ul className="space-y-3">
                    {recom.yoga.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed font-semibold">
                        <span className="text-emerald-600 mr-2.5 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Meditation */}
                <div className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                  <span className="text-primary font-black text-xs uppercase tracking-wide block">Dhyana & Pranayama (Mind suggestions)</span>
                  <ul className="space-y-3">
                    {recom.meditation.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-xs text-text-primary leading-relaxed font-semibold">
                        <span className="text-emerald-600 mr-2.5 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 'remedies' && (
              <motion.div
                key="remedies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* suggested treatments (panchakarma / herbal remedies) */}
                <TreatmentRecommendation suggestion={recom} />

                {/* risk insights & imbalances preventive lines */}
                <RiskInsightCard
                  imbalances={recom.imbalances}
                  preventive={recom.preventive}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default ResultDashboard;
