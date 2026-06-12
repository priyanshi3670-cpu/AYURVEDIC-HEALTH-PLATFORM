import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Disease } from '../../services/diseaseApi';

interface DiseaseCardProps {
  disease: Disease;
  onLearnMore: () => void;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease, onLearnMore }) => {
  return (
    <div
      onClick={onLearnMore}
      className="bg-white border border-[#2E7D32]/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer card-hover"
    >
      <div>
        {/* Header Image */}
        <div className="h-48 overflow-hidden relative">
          <img
            src={disease.image}
            alt={disease.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          <span className={`absolute top-4 left-4 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            disease.severity === 'High' 
              ? 'bg-red-500 text-white' 
              : disease.severity === 'Moderate' 
                ? 'bg-amber-500 text-white' 
                : 'bg-primary text-white'
          }`}>
            {disease.severity} Risk
          </span>
        </div>

        {/* Info panel */}
        <div className="p-6 space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#81C784] block">{disease.category}</span>
          <h3 className="font-serif text-xl font-bold text-primary">{disease.name}</h3>
          <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">{disease.shortDescription}</p>
        </div>
      </div>

      {/* Button footer */}
      <div className="px-6 pb-6 pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLearnMore();
          }}
          className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center space-x-1.5"
        >
          <span>Explore remedial details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default DiseaseCard;
