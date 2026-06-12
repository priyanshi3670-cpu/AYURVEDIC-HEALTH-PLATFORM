import React from 'react';
import { DietPlan } from '../../types';
import { Flame, Droplet, Dumbbell, Apple, CircleDot } from 'lucide-react';

interface DietDashboardProps {
  plan: DietPlan;
}

export const DietDashboard: React.FC<DietDashboardProps> = ({ plan }) => {
  const { calories, protein, carbs, fats, waterTarget } = plan.nutritionSummary;

  // Let's compute macro calorie distributions to show percentages
  const proteinCals = protein * 4;
  const carbsCals = carbs * 4;
  const fatsCals = fats * 9;
  const totalCalCalc = proteinCals + carbsCals + fatsCals;

  const getPercentage = (cals: number) => {
    if (!totalCalCalc) return 0;
    return Math.round((cals / totalCalCalc) * 100);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Active Diet Schedule
          </span>
          <h3 className="text-xl font-serif font-bold text-gray-800">
            {plan.planName}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Designed for <strong className="text-emerald-700 font-bold">{plan.doshaType}</strong> constitution • Goal: <strong className="text-emerald-700 font-bold">{plan.goal}</strong>
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100">
          <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
          <div>
            <span className="text-[9px] uppercase font-bold text-emerald-700 block">Daily Target</span>
            <span className="text-sm font-black text-gray-800">{calories} kcal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Protein */}
        <div className="bg-emerald-50/20 hover:bg-emerald-50/45 border border-emerald-100/50 p-4 rounded-2xl transition-all">
          <div className="flex items-center space-x-2 text-emerald-700 mb-2">
            <Dumbbell className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-wider">Protein</span>
          </div>
          <p className="text-xl font-black text-gray-800">{protein}g</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${getPercentage(proteinCals)}%` }} 
            />
          </div>
          <span className="text-[9px] text-gray-400 font-semibold mt-1 block">
            {getPercentage(proteinCals)}% of daily energy
          </span>
        </div>

        {/* Carbs */}
        <div className="bg-amber-50/20 hover:bg-amber-50/45 border border-amber-100/50 p-4 rounded-2xl transition-all">
          <div className="flex items-center space-x-2 text-amber-700 mb-2">
            <Apple className="w-4 h-4 text-amber-600" />
            <span className="text-[10px] font-black uppercase tracking-wider">Carbs</span>
          </div>
          <p className="text-xl font-black text-gray-800">{carbs}g</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${getPercentage(carbsCals)}%` }} 
            />
          </div>
          <span className="text-[9px] text-gray-400 font-semibold mt-1 block">
            {getPercentage(carbsCals)}% of daily energy
          </span>
        </div>

        {/* Fats */}
        <div className="bg-amber-50/10 hover:bg-amber-50/25 border border-amber-100/30 p-4 rounded-2xl transition-all">
          <div className="flex items-center space-x-2 text-amber-600 mb-2">
            <CircleDot className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-wider">Healthy Fats</span>
          </div>
          <p className="text-xl font-black text-gray-800">{fats}g</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-amber-650 bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${getPercentage(fatsCals)}%` }} 
            />
          </div>
          <span className="text-[9px] text-gray-400 font-semibold mt-1 block">
            {getPercentage(fatsCals)}% of daily energy
          </span>
        </div>

        {/* Water */}
        <div className="bg-blue-50/20 hover:bg-blue-50/45 border border-blue-100/50 p-4 rounded-2xl transition-all">
          <div className="flex items-center space-x-2 text-blue-700 mb-2">
            <Droplet className="w-4 h-4 text-blue-500 animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-wider">Water Goal</span>
          </div>
          <p className="text-xl font-black text-gray-800">{(waterTarget / 1000).toFixed(1)} L</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500" 
              style={{ width: '100%' }} 
            />
          </div>
          <span className="text-[9px] text-gray-400 font-semibold mt-1 block">
            {waterTarget} ml daily target
          </span>
        </div>
      </div>
    </div>
  );
};

export default DietDashboard;
