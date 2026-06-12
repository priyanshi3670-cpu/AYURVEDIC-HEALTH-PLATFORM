import React, { useState } from 'react';
import { ShieldAlert, Activity, Sparkles, CheckCircle } from 'lucide-react';

interface DiseaseTemplate {
  name: string;
  focus: string;
  recommendations: string[];
  herbs: string[];
  avoid: string[];
}

const TEMPLATES: Record<string, DiseaseTemplate> = {
  PCOS: {
    name: 'PCOS / Hormonal Care',
    focus: 'Focus on low-GI, high-fiber, and anti-inflammatory foods to support insulin sensitivity and hormone balance.',
    recommendations: ['Sprouted grains & seeds (flax seeds, pumpkin seeds)', 'High fiber leafy greens, broccoli, asparagus', 'Cinnamon spice infusions (improves insulin response)', 'Healthy fats like olive oil, avocado, soaked walnuts'],
    herbs: ['Spearmint tea (lowers androgens)', 'Shatavari powder (balances estrogen)', 'Turmeric & ginger'],
    avoid: ['Refined dairy, processed white flours', 'Sugary carbonated drinks & pastries', 'Excessive red meat']
  },
  Diabetes: {
    name: 'Diabetes (Madhumeha)',
    focus: 'Reduce glycemic load, activate pancreatic Agni, and clear channels of excess Kapha.',
    recommendations: ['Barley (Yava) porridge or flatbreads', 'Bitter melon (Karela), fenugreek (Methi) seeds', 'Whole mung dal, black chickpeas, lentils', 'Amla (Indian gooseberry) juice in the morning'],
    herbs: ['Gudmar (Gymnema Sylvestre)', 'Turmeric (Haridra)', 'Vijaysar water'],
    avoid: ['White refined rice, white bread', 'Sweet potatoes, bananas, grapes, mangoes', 'Heavy dairy, butter, deep-fried food']
  },
  IBS: {
    name: 'Digestive Health (IBS / Agnimandya)',
    focus: 'Soothe bowel linings, pacify hyperactive Vata/Pitta, and build clean absorption paths.',
    recommendations: ['Warm Kitchari (rice and mung beans) cooked with ghee', 'Diluted buttermilk (Takra) with roasted cumin powder', 'Steamed zucchini, carrots, and sweet potato', 'Warm ginger-cumin-fennel (CCF) tea'],
    herbs: ['Triphala (cleanses colon)', 'Fennel seeds (calms spasms)', 'Licorice root'],
    avoid: ['Raw salads, raw sprouts, cold smoothies', 'Carbonated water, caffeine, gluten', 'Beans, cabbage, cauliflower (causes wind)']
  },
  Weight: {
    name: 'Weight / Metabolic Care',
    focus: 'Scrape excess Kapha (fat cells) and stimulate sluggish thyroid or liver metabolism.',
    recommendations: ['Millet, buckwheat, quinoa instead of wheat/rice', 'Warm water with a squeeze of lime and raw honey (warm, never hot)', 'Pungent spices: ginger, black pepper, long pepper (Trikatu)', 'Dry steamed broccoli, cabbage, leaf sprouts'],
    herbs: ['Guggulu (metabolic support)', 'Trikatu powder', 'Garcinia Cambogia'],
    avoid: ['Sugary sweets, ice creams, heavy milk desserts', 'Cold iced water, soda, beers', 'Sleeping during the day (increases Kapha)']
  }
};

export const DiseaseDietCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof TEMPLATES>('PCOS');
  const data = TEMPLATES[activeTab];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              Pathya Adaptations
            </span>
            <h4 className="text-sm font-serif font-bold text-gray-800">
              Condition-Specific Dietary Guides
            </h4>
          </div>

          <div className="flex bg-emerald-50/50 border border-emerald-100/50 p-1 rounded-xl shrink-0 overflow-x-auto">
            {Object.keys(TEMPLATES).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as keyof typeof TEMPLATES)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === key ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <h5 className="text-xs font-black text-gray-800">{data.name}</h5>
          </div>
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed mt-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100/50">
            {data.focus}
          </p>
        </div>

        <div className="space-y-3">
          <div>
            <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest block mb-1">
              Recommended Foods
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {data.recommendations.map((item, idx) => (
                <div key={idx} className="flex items-start text-[11px] text-gray-650 font-bold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-3">
            <div>
              <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                Suggested Spice & Herbs
              </span>
              <ul className="space-y-1">
                {data.herbs.map((herb, idx) => (
                  <li key={idx} className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{herb}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest block mb-1">
                Critical Avoid List
              </span>
              <ul className="space-y-1">
                {data.avoid.map((item, idx) => (
                  <li key={idx} className="text-[11px] text-gray-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-50 pt-3 mt-4 text-[10px] text-gray-400 font-medium">
        Always consult with your Ayurvedic doctor (Vaidya) before changing dietary parameters for chronic diseases.
      </div>
    </div>
  );
};

export default DiseaseDietCard;
