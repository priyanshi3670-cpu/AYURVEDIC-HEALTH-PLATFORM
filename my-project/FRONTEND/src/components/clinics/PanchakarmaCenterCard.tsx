import React from 'react';
import { Star, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { Clinic } from '../../types';

interface PanchakarmaCenterCardProps {
  centers: Clinic[];
  onViewProfile: (clinic: Clinic) => void;
}

export const PanchakarmaCenterCard: React.FC<PanchakarmaCenterCardProps> = ({
  centers,
  onViewProfile
}) => {
  if (centers.length === 0) return null;

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Specialized Detox</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Classical Panchakarma Detox Centers</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Explore clinics specifically certified and equipped for inpatient classical 5-action detox therapies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {centers.slice(0, 4).map((c) => (
          <div 
            key={c.id} 
            className="group bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-48"
          >
            {/* Center Image */}
            <div className="w-full sm:w-2/5 h-40 sm:h-full relative overflow-hidden shrink-0">
              <img 
                src={c.bannerImage} 
                alt={c.name} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform" 
              />
              <div className="absolute top-3 left-3 bg-primary text-white text-[8px] font-bold py-1 px-3 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-accent animate-pulse shrink-0" />
                <span>Detox Hub</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between items-start gap-1">
                  <h4 className="font-serif font-bold text-primary text-sm leading-tight line-clamp-1 group-hover:text-primary-light transition-colors">
                    {c.name}
                  </h4>
                  <div className="flex items-center space-x-0.5 text-[10px] font-bold text-primary shrink-0 pl-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span>{c.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-[9.5px] text-text-secondary font-bold">
                  <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="truncate">{c.city}, {c.state}</span>
                </div>

                {/* Special therapies subset */}
                <div className="pt-1.5 space-y-1">
                  <span className="text-[7.5px] uppercase font-bold text-text-secondary block tracking-wider">Special Therapies</span>
                  <div className="flex flex-wrap gap-1">
                    {c.services.slice(0, 3).map((s, i) => (
                      <span key={i} className="bg-white text-[8px] font-bold text-primary py-0.5 px-2 rounded border border-primary/5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <button
                onClick={() => onViewProfile(c)}
                className="text-primary font-bold text-[9.5px] uppercase tracking-wider flex items-center space-x-1 hover:text-primary-light transition-colors self-start shrink-0 pt-1"
              >
                <span>View Center Profile</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent animate-pulse shrink-0" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PanchakarmaCenterCard;
