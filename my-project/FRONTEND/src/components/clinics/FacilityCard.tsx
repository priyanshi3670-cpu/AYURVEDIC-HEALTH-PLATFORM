import React from 'react';
import { Home, Clipboard, Video, Pill, Search, ShieldCheck } from 'lucide-react';

export const FacilityCard: React.FC = () => {
  const facilities = [
    {
      id: 'f-1',
      name: 'Private Rooms',
      description: 'Air-conditioned luxury suites with backwater or nature views for inpatient cleansing stays.',
      icon: Home
    },
    {
      id: 'f-2',
      name: 'Therapy Rooms',
      description: 'Fully equipped rooms for Abhyanga, Shirodhara, and custom oil pooling procedures.',
      icon: Clipboard
    },
    {
      id: 'f-3',
      name: 'Online Consultation',
      description: 'Tele-health connectivity with MD Vaidyas for pre-detox and post-detox follow-up checks.',
      icon: Video
    },
    {
      id: 'f-4',
      name: 'Verified Pharmacy',
      description: 'In-house dispensary supplying certified organic herbs, Kashayams, and custom oils.',
      icon: Pill
    },
    {
      id: 'f-5',
      name: 'Diagnostic Support',
      description: 'Pulse diagnostics paired with baseline medical blood reports and dosha evaluation.',
      icon: Search
    },
    {
      id: 'f-6',
      name: 'Wellness Programs',
      description: 'Bespoke yoga routines and metabolic management schedules integrated into clinical stays.',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1 text-center md:text-left">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">verified amenities</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Certified Center Facilities</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Certified centers feature state-of-the-art amenities to ensure your purification path is secure and comfortable.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-xs font-semibold">
        {facilities.map((item) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.id} 
              className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 p-5 rounded-2xl flex flex-col justify-between h-44 transition-all shadow-sm text-center items-center group"
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/5 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                <IconComponent className="w-5 h-5 shrink-0" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-primary text-[11px] leading-tight block">
                  {item.name}
                </h4>
                <p className="text-[9.5px] text-text-secondary leading-relaxed font-medium line-clamp-3">
                  {item.description}
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
