import React from 'react';
import { Clock, Check, Sparkles, IndianRupee } from 'lucide-react';
import { Package } from '../../types';

interface PackageCardProps {
  packages: Package[];
  onBookPackage: (pkg: Package) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packages, onBookPackage }) => {
  if (packages.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Wellness Programs</span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Panchakarma & Therapy Packages</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className="group bg-white border border-[#2E7D32]/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row h-auto md:h-64"
          >
            {/* Image Cover */}
            <div className="w-full md:w-2/5 h-44 md:h-full relative overflow-hidden shrink-0 bg-gray-50">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-primary text-white text-[8px] font-black py-1 px-3 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-sm">
                <Clock className="w-3 h-3 text-accent shrink-0" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            {/* Info and Booking */}
            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div className="space-y-2">
                <h4 className="font-serif font-black text-primary text-base leading-tight group-hover:text-primary-light transition-colors">
                  {pkg.name}
                </h4>
                <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">
                  {pkg.description}
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[10px] font-semibold text-text-secondary">
                  {pkg.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Action */}
              <div className="flex justify-between items-center pt-2.5 border-t border-gray-50">
                <div className="space-y-0.5">
                  <span className="block text-[8px] text-text-secondary uppercase font-bold tracking-wider">Price</span>
                  <div className="flex items-center text-primary font-black text-base">
                    <IndianRupee className="w-4 h-4 text-accent shrink-0" />
                    <span>{pkg.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => onBookPackage(pkg)}
                  className="bg-primary hover:bg-primary-light text-white font-bold text-[9.5px] py-2.5 px-5 rounded-xl uppercase tracking-widest shadow-md transition-all cursor-pointer"
                >
                  Book Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PackageCard;
