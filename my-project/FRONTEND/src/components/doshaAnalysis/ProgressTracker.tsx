import React from 'react';

interface ProgressTrackerProps {
  current: number;
  total: number;
  percentage: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ current, total, percentage }) => {
  return (
    <div className="space-y-1.5 min-w-[200px]">
      <div className="flex justify-between items-center text-[10px] font-bold text-text-secondary">
        <span>Question {current} of {total}</span>
        <span className="text-primary">{percentage}% Complete</span>
      </div>
      <div className="h-2 w-full bg-gray-200/50 rounded-full overflow-hidden">
        <div 
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
