import React, { useState } from 'react';
import { DietPlan, ProgressMetric } from '../../types';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';
import { BarChart2, PieChart as PieIcon, TrendingUp, Calendar } from 'lucide-react';

interface NutritionChartProps {
  plan: DietPlan;
  progressData: ProgressMetric[];
}

const COLORS = ['#2E7D32', '#D4AF37', '#E5A93C', '#81C784', '#FF8A65', '#4FC3F7'];

export const NutritionChart: React.FC<NutritionChartProps> = ({ plan, progressData }) => {
  const [activeTab, setActiveTab] = useState<'macros' | 'meals' | 'progress'>('macros');

  const { protein, carbs, fats } = plan.nutritionSummary;

  // 1. Macros Data (in grams and energy contribution)
  const macroData = [
    { name: 'Protein', value: protein * 4, grams: protein, color: '#2E7D32' },
    { name: 'Carbs', value: carbs * 4, grams: carbs, color: '#D4AF37' },
    { name: 'Fats', value: fats * 9, grams: fats, color: '#E53935' }
  ];

  // 2. Meals Calorie Distribution Data
  const mealsData = plan.meals.map(meal => ({
    name: meal.mealType,
    calories: meal.calories,
    displayName: meal.mealName.substring(0, 15) + '...'
  }));

  // Tooltip formatter for macros
  const formatMacroTooltip = (value: any, name: any, props: any) => {
    const item = props.payload;
    return [`${value} kcal (${item.grams}g)`, name];
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col h-[400px]">
      {/* Chart Header Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 shrink-0">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Nutrition Analytics
          </span>
          <h4 className="text-sm font-serif font-bold text-gray-800">
            Energetics & Progress Logs
          </h4>
        </div>

        <div className="flex bg-emerald-50/50 border border-emerald-100/50 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('macros')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'macros'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Macros</span>
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'meals'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Meals Cal</span>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer ${
              activeTab === 'progress'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Progress Logs</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 min-h-0 w-full">
        {activeTab === 'macros' && (
          <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-full sm:w-1/2 h-full min-h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={formatMacroTooltip} contentStyle={{ fontSize: 11, borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend info panel */}
            <div className="w-full sm:w-1/2 space-y-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                Macronutrient Calorie Split
              </span>
              <div className="space-y-2.5">
                {macroData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-700">{item.name} ({item.grams}g)</span>
                    </div>
                    <span className="text-gray-500 font-bold">{item.value} kcal</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meals' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mealsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 'bold' }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 10, fontWeight: 'bold' }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
              <Bar dataKey="calories" name="Calories (kcal)" fill="#2E7D32" radius={[6, 6, 0, 0]}>
                {mealsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === 'progress' && (
          <div className="w-full h-full flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 h-full min-h-[140px]">
              <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest mb-1 block">
                Weekly Diet Adherence (%)
              </span>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={progressData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adherenceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} stroke="#9CA3AF" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
                  <Area type="monotone" dataKey="adherenceRate" name="Adherence" stroke="#2E7D32" strokeWidth={2} fillOpacity={1} fill="url(#adherenceGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full md:w-1/2 h-full min-h-[140px]">
              <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-1 block">
                Weight Tracking (kg)
              </span>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={progressData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 9 }} stroke="#9CA3AF" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 9 }} stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
                  <Line type="monotone" dataKey="weight" name="Weight" stroke="#D4AF37" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionChart;
