import React from 'react';
import { Home, Video, Pill, Car, Hotel, Search, Coffee, ShieldCheck } from 'lucide-react';

interface FacilityCardProps {
  clinicFacilities: string[];
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ clinicFacilities }) => {
  const allFacilities = [
    { name: 'Private Therapy Rooms', desc: 'Conducive, clean chambers tailored for traditional Abhyanga and Shirodhara dripping.', icon: Home },
    { name: 'Online Consultation', desc: 'Pre-check and post-detox telehealth support sessions with senior Vaidyas.', icon: Video },
    { name: 'Pharmacy', desc: 'Dispensary supplying verified, organic custom-compounded oils and tablets.', icon: Pill },
    { name: 'Parking', desc: 'Secure parking space available in the retreat campus gates.', icon: Car },
    { name: 'Accommodation', desc: 'Luxury seaside or garden inpatient cottage stays.', icon: Hotel },
    { name: 'Diagnostic Support', desc: 'In-house dosha profiling and clinical baseline testing.', icon: Search },
    { name: 'Cafeteria', desc: 'Organic dietary kitchen serving custom wellness food plates.', icon: Coffee },
    { name: 'Wellness Programs', desc: 'Daily morning pranayama, yoga, and meditation routines.', icon: ShieldCheck }
  ];

  // Filter facilities based on clinic capabilities or default to all if empty
  const activeFacilities = allFacilities.filter(f => 
    clinicFacilities.some(cf => cf.toLowerCase() === f.name.toLowerCase() || f.name.toLowerCase().includes(cf.toLowerCase()))
  );

  const displayList = activeFacilities.length > 0 ? activeFacilities : allFacilities;

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1 text-center md:text-left">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">premium amenities</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Certified Center Facilities</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Our center is NABH accredited and conforms to absolute patient care safeguards.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
        {displayList.map((item, index) => {
          const IconComp = item.icon;
          return (
            <div 
              key={index} 
              className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 p-5 rounded-2xl flex flex-col justify-between h-40 transition-all shadow-sm group text-center items-center"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/5 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                <IconComp className="w-5 h-5 shrink-0" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-primary text-[11px] leading-tight block">
                  {item.name}
                </h4>
                <p className="text-[9.5px] text-text-secondary leading-relaxed font-medium line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FacilityCard;
