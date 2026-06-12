import React, { useState } from 'react';
import { Sparkles, Activity, ShieldCheck, Heart, Brain, ChevronRight } from 'lucide-react';

export const TreatmentBenefits: React.FC = () => {
  const benefitCards = [
    {
      id: 'detox',
      title: 'Detoxification',
      subtitle: 'Ama Purging',
      description: 'Expels deep-seated cellular toxins (Ama) that cause immunological sludge and tissue blockages, renewing cellular respiration.',
      icon: Sparkles,
      color: 'from-[#4CAF50]/10 to-[#2E7D32]/10',
      borderColor: 'border-[#4CAF50]/20'
    },
    {
      id: 'stress',
      title: 'Stress Relief',
      subtitle: 'Vata Stabilization',
      description: 'Soothes the sympathetic nervous system and regulates Prana Vayu (neurological flow) to resolve chronic anxiety and sleep issues.',
      icon: Brain,
      color: 'from-blue-500/10 to-indigo-600/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 'weight',
      title: 'Weight Management',
      subtitle: 'Meda Dhatu Balancing',
      description: 'Stimulates lipid tissue digestion (Meda Dhatu Agni), helping clear stagnant channels and reducing excessive subcutaneous fat.',
      icon: Activity,
      color: 'from-amber-500/10 to-orange-600/10',
      borderColor: 'border-amber-500/20'
    },
    {
      id: 'digestive',
      title: 'Digestive Health',
      subtitle: 'Agni Stimulation',
      description: 'Rekindles the stomach fire (Jatharagni), optimizing nutrient assimilation, resolving bloating, and restoring bowel regularity.',
      icon: Heart,
      color: 'from-rose-500/10 to-red-600/10',
      borderColor: 'border-rose-500/20'
    },
    {
      id: 'hormonal',
      title: 'Hormonal Balance',
      subtitle: 'Endocrine Regulation',
      description: 'Balances glandular secretions and restores organic cycle rhythms (Artava Srotas) naturally via metabolic detox paths.',
      icon: ShieldCheck,
      color: 'from-[#D4AF37]/10 to-[#E5C358]/10',
      borderColor: 'border-[#D4AF37]/20'
    }
  ];

  const [activeCard, setActiveCard] = useState<string>('detox');

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1 text-center md:text-left">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Therapeutic Action</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Core Healing Benefits</h3>
        <p className="text-[11px] text-text-secondary">Click on any core biological benefit card to learn about its physiological mechanism in Ayurveda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Left 5 cards selectors */}
        {benefitCards.map((b) => {
          const IconComponent = b.icon;
          const isActive = activeCard === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setActiveCard(b.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${b.color} border-primary shadow-md transform -translate-y-1`
                  : 'bg-[#FAF9F6] border-gray-150 text-text-primary hover:border-primary/20 hover:bg-white'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-primary/10' : 'bg-gray-100'}`}>
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-text-secondary'}`} />
              </div>

              <div className="space-y-0.5">
                <span className="text-[7.5px] uppercase font-bold text-text-secondary block">
                  {b.subtitle}
                </span>
                <h4 className="text-[11px] font-black text-primary uppercase tracking-wide leading-tight">
                  {b.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded detail box */}
      <div className="bg-[#FAF9F6] border border-[#2E7D32]/10 p-5 rounded-2xl flex items-start space-x-4 animate-fade-in-up">
        <div className="w-10 h-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shrink-0">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-black text-primary uppercase tracking-wider">
            {benefitCards.find(b => b.id === activeCard)?.title} Details Mechanism
          </h4>
          <p className="text-xs text-text-secondary leading-relaxed font-semibold">
            {benefitCards.find(b => b.id === activeCard)?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatmentBenefits;
