import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface TreatmentFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDuration: string;
  onDurationChange: (duration: string) => void;
  selectedCost: string;
  onCostChange: (cost: string) => void;
  onlyPopular: boolean;
  onPopularChange: (pop: boolean) => void;
  onReset: () => void;
}

export const TreatmentFilter: React.FC<TreatmentFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedDuration,
  onDurationChange,
  selectedCost,
  onCostChange,
  onlyPopular,
  onPopularChange,
  onReset
}) => {
  return (
    <div className="bg-white border border-[#2E7D32]/10 p-5 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-50">
        <div className="flex items-center space-x-2 text-primary font-bold text-xs">
          <Filter className="w-4 h-4 text-accent" />
          <span>Refine Discovery</span>
        </div>
        <button
          onClick={onReset}
          className="flex items-center space-x-1 text-[10px] text-text-secondary hover:text-primary transition-colors font-bold uppercase"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {/* Category Select */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Duration Select */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Duration</label>
          <select
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
          >
            <option value="">Any Duration</option>
            <option value="short">Short (1 - 5 Days)</option>
            <option value="medium">Medium (6 - 14 Days)</option>
            <option value="long">Long (15+ Days)</option>
          </select>
        </div>

        {/* Cost Select */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase font-bold text-text-secondary">Estimated Cost</label>
          <select
            value={selectedCost}
            onChange={(e) => onCostChange(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
          >
            <option value="">Any Budget</option>
            <option value="low">Under ₹3,000</option>
            <option value="mid">₹3,000 - ₹8,000</option>
            <option value="high">Over ₹8,000</option>
          </select>
        </div>

        {/* Popular Checkbox */}
        <div className="flex items-center space-x-2 pt-4">
          <input
            type="checkbox"
            id="popular-only"
            checked={onlyPopular}
            onChange={(e) => onPopularChange(e.target.checked)}
            className="w-4 h-4 rounded text-primary focus:ring-primary border-[#2E7D32]/20 accent-primary"
          />
          <label htmlFor="popular-only" className="text-xs font-bold text-text-primary cursor-pointer select-none">
            ⭐ Top Rated Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default TreatmentFilter;
