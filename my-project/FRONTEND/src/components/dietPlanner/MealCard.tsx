import React from 'react';
import { Meal } from '../../types';
import { Clock, Flame, CheckCircle, Leaf, Coffee, Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  // Select icon based on meal type
  const getMealIcon = () => {
    switch (meal.mealType) {
      case 'Breakfast':
        return <Sunrise className="w-5 h-5 text-amber-500" />;
      case 'Mid-Morning Snack':
        return <Coffee className="w-5 h-5 text-emerald-500" />;
      case 'Lunch':
        return <Sun className="w-5 h-5 text-amber-600" />;
      case 'Evening Snack':
        return <Sunset className="w-5 h-5 text-orange-500" />;
      case 'Dinner':
        return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'Bedtime Drink':
        return <Leaf className="w-5 h-5 text-emerald-600 animate-pulse" />;
      default:
        return <Coffee className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getBadgeColor = () => {
    switch (meal.mealType) {
      case 'Breakfast':
        return 'bg-amber-50 text-amber-800 border-amber-100';
      case 'Mid-Morning Snack':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'Lunch':
        return 'bg-orange-50 text-orange-850 text-orange-800 border-orange-100';
      case 'Evening Snack':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Dinner':
        return 'bg-indigo-50 text-indigo-800 border-indigo-100';
      case 'Bedtime Drink':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-50 hover:shadow-md hover:border-emerald-100 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-3.5">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-xl border ${getBadgeColor().split(' ')[0]}`}>
              {getMealIcon()}
            </div>
            <div>
              <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${getBadgeColor()}`}>
                {meal.mealType}
              </span>
              <div className="flex items-center text-[10px] text-gray-400 font-semibold mt-0.5">
                <Clock className="w-3 h-3 mr-1" />
                <span>{meal.time}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 bg-gray-50 px-2.5 py-1 rounded-xl text-[10px] font-bold border border-gray-100">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>{meal.calories} kcal</span>
          </div>
        </div>

        {/* Meal Name */}
        <h4 className="font-serif text-sm font-black text-gray-800 leading-snug mb-3">
          {meal.mealName}
        </h4>

        {/* Ingredients */}
        <div className="mb-4">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
            Key Ingredients
          </span>
          <div className="flex flex-wrap gap-1">
            {meal.ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-gray-650 bg-gray-50 text-gray-700 px-2 py-0.5 rounded-lg border border-gray-100/50"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ayurvedic Benefits */}
      <div className="border-t border-gray-50 pt-3.5 mt-auto">
        <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest block mb-1.5">
          Agni & Dhatu Benefits
        </span>
        <ul className="space-y-1">
          {meal.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start text-[11px] text-gray-500 font-medium leading-normal">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MealCard;
