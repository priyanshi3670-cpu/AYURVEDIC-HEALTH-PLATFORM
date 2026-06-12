import React from 'react';
import { Sparkles, Heart, Zap, Clock } from 'lucide-react';

interface NutritionSuggestionProps {
  dosha: string;
  goals: string[];
}

export const NutritionSuggestion: React.FC<NutritionSuggestionProps> = ({ dosha, goals }) => {
  // Compute adaptogen and herbs recommendation based on Dosha
  let lookupDosha = dosha;
  if (lookupDosha.includes('-')) {
    lookupDosha = lookupDosha.split('-')[0];
  }

  const getAdaptogenData = () => {
    switch (lookupDosha) {
      case 'Vata':
        return {
          name: 'Ashwagandha (Withania somnifera)',
          action: 'Grounding & Calming',
          description: 'Soothes hyperactive nervous systems, improves sleep onset latency, and strengthens depleted Dhatus (tissues).',
          intake: '1/2 tsp in warm milk with pinch of nutmeg before bed.'
        };
      case 'Kapha':
        return {
          name: 'Trikatu & Guggulu',
          action: 'Metabolic Stimulant & Scraper',
          description: 'Clears sluggish lymph channels, scrapes excess adipose tissue (Medas), and wakes up sluggish thyroid Agni.',
          intake: '1 capsule with lukewarm water 15 minutes before lunch.'
        };
      case 'Pitta':
      default:
        return {
          name: 'Shatavari & Licorice root',
          action: 'Cooling & Endocrine Tonic',
          description: 'Pacifies burning stomach bile, supports natural estrogen/progesterone balance, and cools tissue inflammation.',
          intake: '1/2 tsp in warm cardamom milk or warm water post dinner.'
        };
    }
  };

  const adaptogen = getAdaptogenData();

  // Tips array
  const tips = [
    {
      icon: <Clock className="w-4 h-4 text-emerald-600" />,
      title: 'Vamkukshi Practice',
      desc: 'Rest on your left side for 10-15 minutes after lunch. This optimizes your stomach position and enhances digestive juice secretion.'
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      title: 'Avoid Iced Water',
      desc: 'Drinking cold beverages with meals extinguishes the digestive fire (Jatharagni), causing metabolic toxic residue (Ama) to form.'
    },
    {
      icon: <Heart className="w-4 h-4 text-red-500" />,
      title: 'Mindful Eating (Ahara Vidhi)',
      desc: 'Eat in a calm environment without screens. Thoroughly chew each mouthful to trigger saliva enzymes and salivary Agni.'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Herb & Lifestyle Suggestions
          </span>
          <h3 className="text-lg font-serif font-bold text-gray-800">
            Ayurvedic Rasayana Recommendation
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Targeted adaptogenic herbs to support your {dosha} constitution
          </p>
        </div>

        {/* Adaptogen Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-5 border border-emerald-700/30 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black text-accent uppercase tracking-widest block">
              Adaptogen of choice
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-white/10 text-white border border-white/10">
              {adaptogen.action}
            </span>
          </div>
          <h4 className="text-sm font-bold font-serif text-white">
            {adaptogen.name}
          </h4>
          <p className="text-[11px] text-white/85 mt-2 leading-relaxed font-medium">
            {adaptogen.description}
          </p>
          <div className="mt-4 pt-3.5 border-t border-white/10 text-[10px] text-accent font-bold flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Intake: {adaptogen.intake}</span>
          </div>
        </div>

        {/* Daily Tips */}
        <div className="space-y-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
            Dinacharya Nutrition Guidelines
          </span>
          <div className="space-y-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="p-2 bg-gray-50 border border-gray-150 rounded-xl shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h5 className="text-xs font-black text-gray-700">{tip.title}</h5>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-0.5">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSuggestion;
