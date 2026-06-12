import React from 'react';
import TreatmentCard from './TreatmentCard';
import { Treatment } from '../../types';

interface TreatmentGridProps {
  treatments: Treatment[];
  onLearnMore: (treatment: Treatment) => void;
  onResetFilters: () => void;
}

export const TreatmentGrid: React.FC<TreatmentGridProps> = ({ treatments, onLearnMore, onResetFilters }) => {
  if (treatments.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-[#2E7D32]/5 rounded-3xl p-8 space-y-4">
        <span className="text-4xl block">🍃</span>
        <h3 className="font-serif text-lg font-bold text-primary">No Treatments Match Your Criteria</h3>
        <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
          We couldn't find any treatments matching your current search queries or filter selections. Try clearing your filters to restart discovery.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-primary hover:bg-primary-light text-white font-bold text-xs py-2.5 px-6 rounded-full shadow-md transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {treatments.map((t) => (
        <TreatmentCard
          key={t.id}
          treatment={t}
          onLearnMore={onLearnMore}
        />
      ))}
    </div>
  );
};

export default TreatmentGrid;
