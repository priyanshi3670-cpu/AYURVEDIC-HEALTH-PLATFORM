import React, { useState } from 'react';
import { ProgressMetric } from '../../types';
import { Plus, Calendar, TrendingDown, Scale, Target } from 'lucide-react';

interface ProgressTrackerProps {
  progressData: ProgressMetric[];
  onAddLog: (log: ProgressMetric) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progressData, onAddLog }) => {
  const [weight, setWeight] = useState(62.0);
  const [adherenceRate, setAdherenceRate] = useState(90);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate current BMI based on a standard height of 1.65m if not dynamically available
  const calculateBMI = (wt: number) => {
    // Height is fixed at 1.65m for this user demo profile
    return parseFloat((wt / (1.65 * 1.65)).toFixed(2));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight <= 0 || adherenceRate < 0 || adherenceRate > 100) return;
    onAddLog({
      date,
      weight,
      bmi: calculateBMI(weight),
      adherenceRate
    });
  };

  const currentLog = progressData[progressData.length - 1];
  const initialLog = progressData[0];
  const weightLoss = initialLog && currentLog ? (initialLog.weight - currentLog.weight).toFixed(1) : '0';

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              Progress Tracking
            </span>
            <h3 className="text-lg font-serif font-bold text-gray-800">
              Biometric Logs & Metrics
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Keep tabs on weight adjustments and diet plan compliance
            </p>
          </div>
        </div>

        {/* Highlight Cards */}
        {currentLog && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50/30 p-3 rounded-2xl border border-emerald-100/50 text-center">
              <Scale className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-[9px] text-gray-400 block font-semibold uppercase">Weight</span>
              <p className="text-sm font-black text-gray-800 mt-0.5">{currentLog.weight} kg</p>
            </div>
            <div className="bg-amber-50/30 p-3 rounded-2xl border border-amber-100/50 text-center">
              <Target className="w-4 h-4 text-amber-600 mx-auto mb-1" />
              <span className="text-[9px] text-gray-400 block font-semibold uppercase">BMI Index</span>
              <p className="text-sm font-black text-gray-800 mt-0.5">{currentLog.bmi}</p>
            </div>
            <div className="bg-blue-50/30 p-3 rounded-2xl border border-blue-100/50 text-center">
              <TrendingDown className="w-4 h-4 text-blue-500 mx-auto mb-1" />
              <span className="text-[9px] text-gray-400 block font-semibold uppercase">Loss Net</span>
              <p className="text-sm font-black text-emerald-700 mt-0.5">-{weightLoss} kg</p>
            </div>
          </div>
        )}

        {/* Input Log Form */}
        <form onSubmit={handleAdd} className="space-y-4 pt-3 border-t border-gray-50">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
            Record Today's Biometrics
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Log Date</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 rounded-xl px-3 py-2 text-[11px] outline-none font-semibold text-gray-750"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                min="30"
                required
                value={weight}
                onChange={e => setWeight(parseFloat(e.target.value))}
                className="w-full bg-emerald-50/30 border border-emerald-100 focus:border-emerald-500 rounded-xl px-3 py-2 text-[11px] outline-none font-semibold text-gray-750"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase mb-1">
              <span>Diet Adherence Rate</span>
              <span className="text-emerald-700 font-bold">{adherenceRate}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={adherenceRate}
              onChange={e => setAdherenceRate(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Log Entry</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProgressTracker;
