import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

interface SuitableConditionsProps {
  conditions: string[];
}

export const SuitableConditions: React.FC<SuitableConditionsProps> = ({ conditions }) => {
  // Map typical conditions to brief details
  const conditionDetails: Record<string, string> = {
    'Diabetes': 'Regulates blood glucose (Madhumeha) by correcting lipid metabolism and pancreas Agni.',
    'PCOS': 'Resolves ovarian cysts and regulates menstruation cycles by dissolving channel blocks.',
    'Arthritis': 'Removes accumulated synovial toxins (Amavata) and relieves severe joint swelling.',
    'Stress': 'Calms hyperactive brain waves and stabilizes nervous system pathways.',
    'Migraine': 'Pacifies aggravated Pitta-Vata channels near the forehead and neck areas.',
    'Sinusitis': 'Expels accumulated Kapha congestion from the cranial cavities.',
    'Chronic Digestive Issues': 'Kindles digestive fire, repairs gut lining, and regularizes elimination.',
    'Skin Conditions': 'Cleanses blood impurities (Kitibha Kushtha) and calms inflammation.',
    'Metabolic Disorders': 'Resets fat tissue metabolism (Meda Dhatu Agni) to restore energy.',
    'Chronic Constipation': 'Lubricates colon channels, pacifies Apana Vayu, and clears blocks.',
    'Sinusitis & Headache': 'Clears sinus blocks and calms tense cranial nerve endings.',
    'Eczema & Acne': 'Cools aggravated Pitta toxins manifesting in skin tissues.',
    'Insomnia & Anxiety': 'Calms nervous system winds (Vata) to restore deep sleep cycles.',
    'Obesity & Cellulite': 'Scrapes away fat tissue overgrowth and improves lymphatic flows.',
    'PCOS & Thyroid Imbalance': 'Restores hormone feedback loops by clearing metabolic stagnation.'
  };

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block">indications</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Suitable Clinical Conditions</h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
          Clinical conditions and chronic imbalances that show significant improvements under this specialized treatment protocol.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
        {conditions.map((item, idx) => {
          const detail = conditionDetails[item] || 'Restores doshic alignment and improves tissue strength for this condition.';
          return (
            <div 
              key={idx} 
              className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 p-4.5 rounded-2xl flex flex-col justify-between space-y-3 transition-all shadow-sm"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-primary">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-serif font-bold text-[12px]">{item}</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">
                  {detail}
                </p>
              </div>

              <div className="text-[8.5px] text-[#2E7D32] bg-[#2E7D32]/5 px-2 py-0.5 rounded-md self-start border border-primary/10 uppercase font-bold tracking-wider">
                Approved Indication
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SuitableConditions;
