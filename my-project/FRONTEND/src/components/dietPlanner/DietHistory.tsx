import React from 'react';
import { DietHistory } from '../../types';
import { Calendar, History, ArrowRight, Check } from 'lucide-react';

interface DietHistoryProps {
  history: DietHistory[];
  onSelectPlan: (planId: string) => void;
  activePlanId: string;
}

export const DietHistoryCardList: React.FC<DietHistoryProps> = ({
  history,
  onSelectPlan,
  activePlanId
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-gray-800">
              Diet Compilation History
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Access previous health plans compiled for your profile
            </p>
          </div>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {history.length === 0 ? (
            <p className="text-xs text-gray-400 italic text-center py-6">No compilation history found.</p>
          ) : (
            history.map((hist) => {
              const isActive = hist.id === activePlanId || activePlanId.includes(hist.id);
              return (
                <div
                  key={hist.id}
                  className={`p-4 rounded-2xl border transition-all flex justify-between items-center ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-gray-800">
                        {hist.planName}
                      </span>
                      {isActive && (
                        <span className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[8px] font-black uppercase tracking-wider flex items-center space-x-0.5">
                          <Check className="w-2.5 h-2.5" />
                          <span>Active</span>
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold flex items-center space-x-1.5">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>Compiled on {hist.dateGenerated}</span>
                      <span>•</span>
                      <span>{hist.duration}</span>
                    </p>
                    <div className="flex items-center space-x-2 pt-1">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        {hist.goal}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                        {hist.calories} kcal
                      </span>
                    </div>
                  </div>

                  {!isActive && (
                    <button
                      onClick={() => onSelectPlan(hist.id)}
                      className="p-2 text-emerald-700 hover:text-white hover:bg-emerald-600 rounded-xl transition-all cursor-pointer border border-emerald-100 hover:border-emerald-600 flex items-center justify-center shrink-0"
                      title="Load this plan"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DietHistoryCardList;
