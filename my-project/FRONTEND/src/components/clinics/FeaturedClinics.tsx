import React from 'react';
import { Star, MapPin, Award, ArrowRight } from 'lucide-react';
import { Clinic } from '../../types';

interface FeaturedClinicsProps {
  clinics: Clinic[];
  onViewProfile: (clinic: Clinic) => void;
  onBookConsultation: (clinic: Clinic) => void;
}

export const FeaturedClinics: React.FC<FeaturedClinicsProps> = ({
  clinics,
  onViewProfile,
  onBookConsultation
}) => {
  // Take top 3 rated clinics
  const list = clinics.slice(0, 3);

  if (list.length === 0) return null;

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">luxury retreat wellness</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Featured Clinics & Centers</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Premium, verified retreats and clinical hospitals featuring award-winning practitioners and certified facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {list.map((c) => (
          <div 
            key={c.id} 
            className="group relative rounded-3xl overflow-hidden shadow-md flex flex-col justify-between h-[360px] text-white"
          >
            {/* Cover image */}
            <div 
              className="absolute inset-0 bg-cover bg-center -z-10 group-hover:scale-103 transition-transform duration-500" 
              style={{ backgroundImage: `url(${c.bannerImage})` }} 
            />
            {/* Gradient cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-black/35 -z-10" />

            {/* Top Info */}
            <div className="p-5 flex justify-between items-start shrink-0">
              <span className="bg-accent text-primary text-[8px] font-black py-0.5 px-2.5 rounded-full uppercase tracking-wider">
                {c.type}
              </span>
              <div className="bg-white/15 backdrop-blur-md text-white text-[10px] font-bold py-0.5 px-2 rounded-full flex items-center space-x-1 shadow-sm">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span>{c.rating}</span>
              </div>
            </div>

            {/* Bottom Info Details */}
            <div className="p-6 space-y-3.5 shrink-0">
              <div className="space-y-1">
                <h4 className="font-serif font-black text-base leading-tight truncate">{c.name}</h4>
                <div className="flex items-center space-x-1 text-[10px] text-white/80 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{c.city}, {c.state}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold text-white/80 border-t border-white/10 pt-2.5">
                <div className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  <span>NABH Accredited</span>
                </div>
                
                <button
                  onClick={() => onViewProfile(c)}
                  className="text-white hover:text-accent transition-colors flex items-center space-x-1 uppercase tracking-wider"
                >
                  <span>Profile</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClinics;
