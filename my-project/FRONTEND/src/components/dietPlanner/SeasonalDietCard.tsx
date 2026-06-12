import React, { useState } from 'react';
import { Sun, CloudRain, Snowflake, AlertCircle } from 'lucide-react';

interface SeasonalTip {
  title: string;
  sanskritName: string;
  focus: string;
  eat: string[];
  avoid: string[];
}

const SEASONAL_DATA: Record<string, SeasonalTip> = {
  Summer: {
    title: 'Summer Diet',
    sanskritName: 'Grishma Ritucharya',
    focus: 'Pacify Pitta, maintain hydration, and support digestive Agni (which is naturally low in summer heat).',
    eat: ['Sweet juices, coconut water, fresh melons', 'Cold soups, cucumber salad, sweet basmati rice', 'Milk, ghee, cardamom, fennel'],
    avoid: ['Spicy hot peppers, vinegar, garlic', 'Fermented yogurt, alcohol, red meat', 'Dry crackers and heavy fried items']
  },
  Monsoon: {
    title: 'Monsoon Diet',
    sanskritName: 'Varsha Ritucharya',
    focus: 'Pacify Vata & Pitta, prevent dampness, and stimulate digestive power (Agni).',
    eat: ['Warm soups, steamed cooked vegetables', 'Rice, barley, wheat, roasted grains', 'Ginger tea, thin buttermilk with cumin', 'Honey (binds excessive water)'],
    avoid: ['Raw vegetables and leafy greens (high risk of microbes)', 'Stale foods, heavy sweets, excessive dairy', 'Undiluted yogurt, river fish, cold drinks']
  },
  Winter: {
    title: 'Winter Diet',
    sanskritName: 'Hemanta Ritucharya',
    focus: 'Nourish deep tissues (Dhatus), pacify Vata, and support the strong winter digestive fire.',
    eat: ['Warm, heavy, oily foods (ghee, sesame oil)', 'Root vegetables, warm stews, soups', 'Dates, almonds, walnuts, warm spiced milk', 'Wheat, millet, hot ginger & herbal teas'],
    avoid: ['Cold, dry, raw foods', 'Ice creams, cold water, chilled juices', 'Light, dry snacks (popcorn, chips)']
  }
};

export const SeasonalDietCard: React.FC = () => {
  const [activeSeason, setActiveSeason] = useState<'Summer' | 'Monsoon' | 'Winter'>('Summer');
  const data = SEASONAL_DATA[activeSeason];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              Ritucharya Guidelines
            </span>
            <h4 className="text-sm font-serif font-bold text-gray-800">
              Seasonal Nutrition Adaptations
            </h4>
          </div>

          <div className="flex bg-emerald-50/50 border border-emerald-100/50 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setActiveSeason('Summer')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                activeSeason === 'Summer' ? 'bg-amber-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Summer (Grishma)"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSeason('Monsoon')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                activeSeason === 'Monsoon' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Monsoon (Varsha)"
            >
              <CloudRain className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSeason('Winter')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                activeSeason === 'Winter' ? 'bg-indigo-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Winter (Hemanta)"
            >
              <Snowflake className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-1.5">
            <h5 className="text-xs font-black text-gray-800">{data.title}</h5>
            <span className="text-[10px] font-bold text-emerald-700 italic bg-emerald-50 px-2 py-0.5 rounded-md">
              {data.sanskritName}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
            {data.focus}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest block mb-1.5">
              Include
            </span>
            <ul className="space-y-1.5">
              {data.eat.map((item, idx) => (
                <li key={idx} className="text-[11px] text-gray-650 font-bold flex items-center gap-1.5 leading-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest block mb-1.5">
              Avoid
            </span>
            <ul className="space-y-1.5">
              {data.avoid.map((item, idx) => (
                <li key={idx} className="text-[11px] text-gray-650 font-bold flex items-center gap-1.5 leading-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-50 pt-3 mt-4 flex items-center space-x-1.5 text-[10px] text-gray-400 font-medium">
        <AlertCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Ayurveda recommends transitioning diets slowly over 14 days (Ritusandhi).</span>
      </div>
    </div>
  );
};

export default SeasonalDietCard;
