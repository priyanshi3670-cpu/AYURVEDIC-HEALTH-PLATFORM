import React from 'react';
import { FoodRecommendation as FoodRecType } from '../../types';
import { Check, AlertTriangle, ListFilter } from 'lucide-react';

interface FoodRecommendationProps {
  recommendation: FoodRecType;
}

export const FoodRecommendation: React.FC<FoodRecommendationProps> = ({ recommendation }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
          <ListFilter className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold text-gray-800">
            Ahar Rules: Eat vs Avoid Guidelines
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Ayurvedic dietary compatibility recommendations for <strong className="text-emerald-700 font-bold uppercase">{recommendation.dosha}</strong> Dosha
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Foods to Eat (Satmya) */}
        <div className="bg-emerald-50/20 rounded-2xl p-5 border border-emerald-100/50">
          <div className="flex items-center space-x-2 text-emerald-800 mb-4">
            <div className="p-1 bg-emerald-100 rounded-md">
              <Check className="w-4 h-4 text-emerald-700" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider">Favor (Highly Recommended)</span>
          </div>
          <ul className="space-y-3">
            {recommendation.eat.map((item, idx) => (
              <li key={idx} className="flex items-start text-xs text-gray-650 font-bold leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 mr-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Foods to Avoid (Asatmya) */}
        <div className="bg-red-50/20 rounded-2xl p-5 border border-red-100/50">
          <div className="flex items-center space-x-2 text-red-800 mb-4">
            <div className="p-1 bg-red-100 rounded-md">
              <AlertTriangle className="w-4 h-4 text-red-700" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-red-800">Limit / Avoid (Aggravating)</span>
          </div>
          <ul className="space-y-3">
            {recommendation.avoid.map((item, idx) => (
              <li key={idx} className="flex items-start text-xs text-gray-650 font-bold leading-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoodRecommendation;
