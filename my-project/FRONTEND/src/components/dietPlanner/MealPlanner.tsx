import React from 'react';
import { Meal } from '../../types';
import MealCard from './MealCard';
import { Utensils } from 'lucide-react';

interface MealPlannerProps {
  meals: Meal[];
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ meals }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
          <Utensils className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-serif font-bold text-gray-800">
            Daily Diet Schedule
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            A 6-interval daily regimen optimized for optimal metabolic absorption
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
