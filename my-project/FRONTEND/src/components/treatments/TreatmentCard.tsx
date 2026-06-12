import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart, DollarSign } from 'lucide-react';
import { Treatment } from '../../types';

interface TreatmentCardProps {
  treatment: Treatment;
  onLearnMore?: (treatment: Treatment) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, onLearnMore }) => {
  return (
    <div className="group bg-white border border-[#2E7D32]/5 hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[450px]">
      <div className="space-y-4">
        {/* Visual Cover Image */}
        <div className="h-44 relative overflow-hidden shrink-0 shadow-sm bg-gray-50">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white/95 backdrop-blur-md border border-primary/5 text-primary text-[9px] font-bold py-1 px-3 rounded-full uppercase tracking-wider shadow-sm">
              {treatment.category}
            </span>
          </div>
        </div>

        {/* Content details */}
        <div className="px-5 space-y-2.5">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-base font-bold text-primary group-hover:text-primary-light transition-colors leading-tight">
              {treatment.name}
            </h3>
            <div className="flex items-center space-x-1 text-xs shrink-0 pl-2">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="font-bold text-primary">{treatment.rating}</span>
            </div>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed font-medium line-clamp-3">
            {treatment.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-text-secondary font-semibold pt-1">
            <div className="flex items-center space-x-1.5 bg-[#FAF9F6] p-2 rounded-xl border border-primary/5">
              <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
              <div>
                <span className="block text-[8px] text-text-secondary/80">Duration</span>
                <span>{treatment.duration}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#FAF9F6] p-2 rounded-xl border border-primary/5">
              <Heart className="w-3.5 h-3.5 text-secondary shrink-0" />
              <div>
                <span className="block text-[8px] text-text-secondary/80">Recovery</span>
                <span>{treatment.recoveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing and Action bottom bar */}
      <div className="p-5 border-t border-gray-50 flex justify-between items-center bg-[#F8FFF8]/25 shrink-0">
        <div>
          <span className="block text-[8px] text-text-secondary font-bold uppercase tracking-wider">Est. Cost</span>
          <span className="text-sm font-black text-primary">₹{treatment.costEstimate.toLocaleString('en-IN')}</span>
        </div>

        <Link
          to={`/treatments/${treatment.slug}`}
          onClick={() => onLearnMore && onLearnMore(treatment)}
          className="bg-primary hover:bg-primary-light text-white font-bold text-[10px] py-2.5 px-4 rounded-xl shadow-md transition-all uppercase tracking-wider block text-center"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default TreatmentCard;
