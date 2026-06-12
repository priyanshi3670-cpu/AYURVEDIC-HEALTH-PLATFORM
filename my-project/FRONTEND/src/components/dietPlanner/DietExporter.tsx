import React from 'react';
import { DietPlan } from '../../types';
import { Download, Printer, Share2, Clipboard } from 'lucide-react';

interface DietExporterProps {
  plan: DietPlan;
}

export const DietExporter: React.FC<DietExporterProps> = ({ plan }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    let text = `========================================================================\n`;
    text += `       AYURVEDA CONNECT - PERSONALIZED DIET & NUTRITION CHART\n`;
    text += `========================================================================\n`;
    text += `Plan Name: ${plan.planName}\n`;
    text += `Dosha Type: ${plan.doshaType}\n`;
    text += `Target Goal: ${plan.goal}\n`;
    text += `Daily Target Calories: ${plan.dailyCalories} kcal\n`;
    text += `Duration: ${plan.duration}\n\n`;
    text += `[ NUTRITION BREAKDOWN ]\n`;
    text += `- Protein: ${plan.nutritionSummary.protein}g\n`;
    text += `- Carbs: ${plan.nutritionSummary.carbs}g\n`;
    text += `- Fats: ${plan.nutritionSummary.fats}g\n`;
    text += `- Water Target: ${plan.nutritionSummary.waterTarget} ml\n\n`;
    text += `[ DAILY DIET SCHEDULE & RECIPES ]\n`;
    
    plan.meals.forEach((meal) => {
      text += `------------------------------------------------------------\n`;
      text += `${meal.mealType.toUpperCase()} - ${meal.time} (${meal.calories} kcal)\n`;
      text += `Dish: ${meal.mealName}\n`;
      text += `Ingredients: ${meal.ingredients.join(', ')}\n`;
      text += `Digestive Benefits: ${meal.benefits.join(' | ')}\n`;
    });
    
    text += `------------------------------------------------------------\n\n`;
    text += `[ DINACHARYA (DAILY ROUTINE) GENERAL RULES ]\n`;
    text += `1. Avoid ice-cold beverages with or after meals.\n`;
    text += `2. Eat only when you feel true physical hunger (Agni stimulus).\n`;
    text += `3. Sip warm or lukewarm water throughout the day to flush toxins.\n`;
    text += `4. Chew food meticulously and sit down to eat in a calm environment.\n\n`;
    text += `Disclaimer: Compiled by AyurVeda Connect AI engine. Please consult a Vaidya for long term plans.\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plan.planName.replace(/\s+/g, '_')}_Chart.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const textStr = `AyurVeda Connect: Active Diet Chart - ${plan.planName}. Calorie target: ${plan.dailyCalories} kcal. Designed for dominant Dosha: ${plan.doshaType}.`;
    navigator.clipboard.writeText(textStr).then(() => {
      alert('Diet plan text copy saved to clipboard!');
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
          Export Document
        </span>
        <h4 className="text-sm font-serif font-bold text-gray-800">
          Download & Share Diet Plan
        </h4>
        <p className="text-xs text-gray-400 mt-0.5 mb-5">
          Print or share your customized nutrition guide for grocery shopping or offline reference.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadTxt}
            className="flex items-center justify-center space-x-2 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-100 transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download TXT</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center justify-center space-x-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Chart</span>
          </button>
        </div>

        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 font-bold text-xs rounded-xl border border-gray-100 mt-3 transition-all cursor-pointer"
        >
          <Clipboard className="w-4 h-4" />
          <span>Copy Summary Text</span>
        </button>
      </div>
    </div>
  );
};

export default DietExporter;
