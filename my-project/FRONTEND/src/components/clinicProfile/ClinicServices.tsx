import React, { useState } from 'react';
import { Sparkles, Activity, Compass, Wind, ShieldAlert, Droplets, Home } from 'lucide-react';
import { Service } from '../../types';

interface ClinicServicesProps {
  services: Service[];
}

export const ClinicServices: React.FC<ClinicServicesProps> = ({ services }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    services.length > 0 ? services[0].id : null
  );

  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'Sparkles': return Sparkles;
      case 'Compass': return Compass;
      case 'Wind': return Wind;
      case 'ShieldAlert': return ShieldAlert;
      case 'Droplets': return Droplets;
      case 'Home': return Home;
      default: return Sparkles;
    }
  };

  if (services.length === 0) return null;

  return (
    <section id="clinic-services-section" className="space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">interactive catalog</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Ayurvedic Services Offered</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Select a service card below to view physiological definitions and healing indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Interactive Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {services.map((s) => {
            const IconComp = getIcon(s.icon);
            const isSelected = s.id === selectedServiceId;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedServiceId(s.id)}
                className={`p-5 rounded-2xl border flex flex-col justify-between text-left h-36 transition-all duration-300 shadow-sm cursor-pointer relative overflow-hidden group ${
                  isSelected 
                    ? 'bg-primary border-primary text-white scale-103 shadow-md' 
                    : 'bg-white border-primary/5 hover:border-primary/20 text-text-primary'
                }`}
              >
                {isSelected && (
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-white/15 text-white' : 'bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white'
                }`}>
                  <IconComp className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs uppercase leading-tight block truncate">
                    {s.name}
                  </h4>
                  <span className={`text-[8.5px] uppercase font-bold tracking-wider ${
                    isSelected ? 'text-accent' : 'text-text-secondary group-hover:text-primary'
                  }`}>
                    Learn More &rarr;
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Glassmorphic Info Board */}
        {activeService && (
          <div className="bg-white border border-[#2E7D32]/10 p-6 rounded-3xl shadow-sm space-y-4 animate-fade-in-up">
            <div className="flex items-center space-x-3 border-b border-primary/5 pb-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shadow-inner shrink-0">
                {React.createElement(getIcon(activeService.icon), { className: 'w-6 h-6 text-accent shrink-0' })}
              </div>
              <div>
                <span className="text-[#D4AF37] text-[8px] font-black uppercase tracking-widest block font-sans">active selection</span>
                <h4 className="font-serif font-black text-primary text-base leading-tight">
                  {activeService.name}
                </h4>
              </div>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed font-semibold">
              {activeService.description}
            </p>

            <div className="pt-2.5 bg-primary/5 rounded-2xl p-4 border border-primary/5 space-y-2">
              <span className="text-primary text-[9.5px] font-black uppercase tracking-widest block font-sans">therapeutic highlights</span>
              <ul className="text-[10.5px] font-semibold text-text-secondary space-y-1.5 list-disc pl-4">
                <li>Strict alignment with classical scripts guidelines.</li>
                <li>Pure organic custom-blended herbal oils.</li>
                <li>Conducted by qualified board-registered therapists.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClinicServices;
