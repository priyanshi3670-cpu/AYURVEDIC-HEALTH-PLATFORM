import React from 'react';
import { Droplet, RefreshCw, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface WaterTrackerProps {
  target: number; // in ml
  current: number; // in ml
  onUpdate: (amount: number) => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ target, current, onUpdate }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);

  // SVG parameters for circle progress bar
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleQuickAdd = (ml: number) => {
    onUpdate(Math.max(0, current + ml));
  };

  const handleReset = () => {
    onUpdate(0);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col items-center justify-between text-center h-[340px]">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
          Ushnodaka Tracker
        </span>
        <button
          onClick={handleReset}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer border border-transparent hover:border-red-100"
          title="Reset Daily Log"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SVG Circular Gauge */}
      <div className="relative flex items-center justify-center my-2">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-blue-50"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            className="stroke-blue-500"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Text Center */}
        <div className="absolute flex flex-col items-center">
          <Droplet className="w-6 h-6 text-blue-500 animate-bounce" />
          <span className="text-lg font-black text-gray-850 mt-1">{percentage}%</span>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Hydrated</span>
        </div>
      </div>

      <div className="w-full">
        <p className="text-xs font-black text-gray-700">
          {current} ml <span className="text-gray-400 font-bold">/ {target} ml</span>
        </p>
        <p className="text-[10px] text-gray-400 font-medium mt-1 leading-relaxed">
          AyurVeda Tip: Sip lukewarm water (Ushnodaka) throughout the day to boost Agni.
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        <button
          onClick={() => handleQuickAdd(250)}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl text-xs font-bold border border-blue-150 transition-all flex flex-col items-center justify-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mb-0.5" />
          <span>250ml</span>
        </button>
        <button
          onClick={() => handleQuickAdd(500)}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl text-xs font-bold border border-blue-150 transition-all flex flex-col items-center justify-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mb-0.5" />
          <span>500ml</span>
        </button>
        <button
          onClick={() => handleQuickAdd(750)}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-xl text-xs font-bold border border-blue-150 transition-all flex flex-col items-center justify-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mb-0.5" />
          <span>750ml</span>
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
