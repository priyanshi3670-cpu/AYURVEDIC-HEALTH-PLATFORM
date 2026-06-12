import React from 'react';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Treatment } from '../../types';

interface WellnessProgramCardProps {
  program: Treatment;
  onLearnMore: (program: Treatment) => void;
}

export const WellnessProgramCard: React.FC<WellnessProgramCardProps> = ({ program, onLearnMore }) => {
  return (
    <div className="group bg-white border border-[#2E7D32]/5 hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row h-auto md:h-56">
      {/* Visual Image */}
      <div className="w-full md:w-2/5 h-48 md:h-full relative overflow-hidden shrink-0">
        <img
          src={program.image}
          alt={program.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-[8px] font-bold py-1 px-3 rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-sm">
            <Sparkles className="w-2.5 h-2.5 text-accent animate-pulse shrink-0" />
            <span>Wellness Program</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-primary group-hover:text-primary-light transition-colors leading-tight">
              {program.name}
            </h3>
            <span className="text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/5 px-2.5 py-1 rounded-full border border-primary/15 uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Certified</span>
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-3">
            {program.description}
          </p>
        </div>

        {/* Action Bottom */}
        <div className="pt-2 border-t border-gray-100 flex justify-between items-center flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-2 text-text-secondary font-bold">
            <Clock className="w-4 h-4 text-secondary shrink-0" />
            <span>Duration: {program.duration}</span>
          </div>

          <button
            onClick={() => onLearnMore(program)}
            className="bg-primary hover:bg-primary-light text-white font-bold text-[10px] py-2 px-4 rounded-xl shadow-md transition-colors uppercase tracking-wider"
          >
            Explore Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default WellnessProgramCard;
