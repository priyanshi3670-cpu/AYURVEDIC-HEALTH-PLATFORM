import React from 'react';
import { FiTarget, FiTrendingUp, FiActivity, FiCoffee } from 'react-icons/fi';
import { WellnessGoalItem } from '../../types';

interface WellnessGoalCardProps {
  goal: WellnessGoalItem;
}

const WellnessGoalCard: React.FC<WellnessGoalCardProps> = ({ goal }) => {
  const getCategoryConfig = () => {
    switch (goal.category) {
      case 'Weight': return { icon: <FiTrendingUp />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', progressColor: 'bg-blue-500' };
      case 'Recovery': return { icon: <FiActivity />, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100', progressColor: 'bg-purple-500' };
      case 'Diet': return { icon: <FiCoffee />, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', progressColor: 'bg-green-500' };
      case 'Exercise': return { icon: <FiTarget />, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100', progressColor: 'bg-orange-500' };
      default: return { icon: <FiTarget />, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100', progressColor: 'bg-gray-500' };
    }
  };

  const config = getCategoryConfig();

  return (
    <div className={`p-5 rounded-2xl border ${config.bg} ${config.border} hover:shadow-sm transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-white shadow-sm ${config.color}`}>
          {config.icon}
        </div>
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white shadow-sm ${config.color}`}>
          {goal.category}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">{goal.progress}%</span>
        </div>
        <div className="w-full bg-white rounded-full h-2 shadow-inner overflow-hidden">
          <div className={`${config.progressColor} h-2 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${goal.progress}%` }}></div>
        </div>
        <div className="flex justify-between text-xs mt-2 font-medium text-gray-500">
          <span>Current: {goal.current} {goal.unit}</span>
          <span>Target: {goal.target} {goal.unit}</span>
        </div>
      </div>
    </div>
  );
};

export default WellnessGoalCard;
