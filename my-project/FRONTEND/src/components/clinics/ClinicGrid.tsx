import React from 'react';
import ClinicCard from './ClinicCard';
import { Clinic } from '../../types';

interface ClinicGridProps {
  clinics: Clinic[];
  onViewProfile: (clinic: Clinic) => void;
  onBookConsultation: (clinic: Clinic) => void;
  onToggleCompare?: (id: string) => void;
  compareIds?: string[];
  onResetFilters: () => void;
}

export const ClinicGrid: React.FC<ClinicGridProps> = ({
  clinics,
  onViewProfile,
  onBookConsultation,
  onToggleCompare,
  compareIds = [],
  onResetFilters
}) => {
  if (clinics.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-[#2E7D32]/5 rounded-3xl p-8 space-y-4 shadow-sm w-full">
        <span className="text-4xl block">🏥</span>
        <h3 className="font-serif text-lg font-bold text-primary">No Clinics Match Your Criteria</h3>
        <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed font-semibold">
          We couldn't find any Ayurveda clinics or Panchakarma centers matching your filters. Try resetting the options to start over.
        </p>
        <button
          onClick={onResetFilters}
          className="bg-primary hover:bg-primary-light text-white font-bold text-xs py-2.5 px-6 rounded-full shadow-md transition-colors"
        >
          Reset Directory Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {clinics.map((c) => (
        <ClinicCard
          key={c.id}
          clinic={c}
          onViewProfile={onViewProfile}
          onBookConsultation={onBookConsultation}
          onToggleCompare={onToggleCompare}
          isComparing={compareIds.includes(c.id)}
        />
      ))}
    </div>
  );
};

export default ClinicGrid;
