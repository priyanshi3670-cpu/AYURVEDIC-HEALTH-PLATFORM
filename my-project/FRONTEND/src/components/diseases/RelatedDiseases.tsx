import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Disease } from '../../services/diseaseApi';

interface RelatedDiseasesProps {
  currentDisease: Disease;
  allDiseases: Disease[];
  onSelect: (disease: Disease) => void;
}

export const RelatedDiseases: React.FC<RelatedDiseasesProps> = ({ currentDisease, allDiseases, onSelect }) => {
  // Filter similar diseases from the same category (excluding current)
  const related = allDiseases
    .filter((d) => d.category === currentDisease.category && d.id !== currentDisease.id)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="space-y-4 pt-6 border-t border-[#2E7D32]/5">
      <h4 className="font-serif text-base font-bold text-primary">Related Conditions</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelect(d)}
            className="p-4 bg-white border border-[#2E7D32]/5 rounded-2xl hover:border-primary/20 hover:shadow-sm cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[8px] uppercase tracking-wider font-bold text-accent">{d.category}</span>
              <h5 className="font-bold text-primary text-xs mt-1">{d.name}</h5>
              <p className="text-[10px] text-text-secondary line-clamp-2 mt-1 leading-relaxed">{d.shortDescription}</p>
            </div>
            <div className="text-[9px] font-bold text-primary flex items-center space-x-0.5 mt-3">
              <span>Remedies</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDiseases;
