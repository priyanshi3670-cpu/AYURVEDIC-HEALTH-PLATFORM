import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Disease } from '../../services/diseaseApi';
import DiseaseCard from './DiseaseCard';

interface DiseaseGridProps {
  diseases: Disease[];
  onLearnMore: (disease: Disease) => void;
  onReset: () => void;
}

export const DiseaseGrid: React.FC<DiseaseGridProps> = ({ diseases, onLearnMore, onReset }) => {
  if (diseases.length === 0) {
    return (
      <div className="bg-white border border-[#2E7D32]/5 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm animate-fade-in-up">
        <ShieldAlert className="w-12 h-12 text-accent mx-auto animate-bounce-slow" />
        <h4 className="font-serif text-lg font-bold text-primary">No Conditions Found</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          We couldn't locate any records matching your filter parameters. Try expanding your search tags.
        </p>
        <button
          onClick={onReset}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {diseases.map((d) => (
        <DiseaseCard
          key={d.id}
          disease={d}
          onLearnMore={() => onLearnMore(d)}
        />
      ))}
    </div>
  );
};

export default DiseaseGrid;
