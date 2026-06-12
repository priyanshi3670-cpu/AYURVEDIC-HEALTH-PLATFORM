import React, { useState, useMemo } from 'react';
import { Map, MapPin, ZoomIn, ZoomOut, Coffee, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Clinic } from '../../types';

interface ClinicMapPreviewProps {
  clinics: Clinic[];
}

export const ClinicMapPreview: React.FC<ClinicMapPreviewProps> = ({ clinics }) => {
  const [activeClinicId, setActiveClinicId] = useState<string>(clinics[0]?.id || '');
  const [zoomLevel, setZoomLevel] = useState<number>(12);

  const activeClinic = useMemo(() => {
    return clinics.find(c => c.id === activeClinicId) || clinics[0];
  }, [clinics, activeClinicId]);

  // Compute nearby mock services based on clinic location
  const mockNearbyServices = [
    { name: 'Organic Herbal Pharmacy', distance: '120m', type: 'Pharmacy' },
    { name: 'Vedic Organic Cafe', distance: '450m', type: 'Food' },
    { name: 'Ayush Government Diagnostic Lab', distance: '1.2km', type: 'Medical' },
    { name: 'Yoga & Meditation Center', distance: '800m', type: 'Wellness' }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Geospatial Registry</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Interactive Map Discovery Canvas</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          Locate certified centers nearby. Click any clinic in the sidebar list to center the coordinate pins and discover surrounding amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Clinic selection list */}
        <div className="flex flex-col space-y-2 max-h-[420px] overflow-y-auto pr-2 border-r border-gray-100 text-xs font-semibold text-text-primary">
          {clinics.slice(0, 8).map((c) => {
            const isActive = c.id === activeClinicId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveClinicId(c.id)}
                className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  isActive
                    ? 'bg-primary/5 border-primary shadow-sm'
                    : 'bg-[#FAF9F6] border-gray-150 hover:border-primary/20 hover:bg-white'
                }`}
              >
                <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? 'text-accent' : 'text-primary/60'}`} />
                <div className="space-y-1">
                  <h4 className="font-bold text-primary truncate leading-snug">{c.name}</h4>
                  <p className="text-[10px] text-text-secondary font-medium leading-relaxed truncate">{c.city}, {c.state}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 2 Columns - Map Preview & Details Panel */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Map canvas (3/5 width on desktop) */}
          <div className="md:col-span-3 h-72 md:h-full min-h-[300px] bg-[#E8F5E9]/50 border border-[#2E7D32]/15 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-inner">
            
            {/* Mock Roads Grid Drawing */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="border-r border-b border-primary/40" />
              ))}
            </div>

            {/* Visual River/Backwater shape if Kochi */}
            {activeClinic?.city === 'Kochi' && (
              <div className="absolute top-20 left-0 right-10 h-16 bg-blue-300/35 rounded-full blur-sm -z-10 rotate-12 pointer-events-none" />
            )}

            {/* Map Pin center */}
            <div className="absolute text-center flex flex-col items-center space-y-1.5 animate-float">
              <div className="bg-white/95 border border-primary/10 py-1.5 px-3 rounded-2xl shadow-xl flex items-center space-x-1.5 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-[9px] font-black text-primary uppercase whitespace-nowrap">{activeClinic?.name}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-ping absolute top-4 -z-10" />
              <MapPin className="w-8 h-8 text-primary fill-accent drop-shadow-md shrink-0" />
            </div>

            {/* Map utility controls */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-[#2E7D32]/10 shadow-sm flex flex-col space-y-1 shrink-0 text-primary">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(18, prev + 1))}
                className="p-1 hover:bg-[#2E7D32]/5 rounded transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(8, prev - 1))}
                className="p-1 hover:bg-[#2E7D32]/5 rounded transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Coordinates Badge */}
            <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-md text-white text-[8px] font-bold py-1 px-3 rounded-full flex items-center space-x-1">
              <Map className="w-3.5 h-3.5 text-accent" />
              <span>Zoom {zoomLevel}x &bull; {activeClinic?.latitude}, {activeClinic?.longitude}</span>
            </div>
          </div>

          {/* Details & Nearby Info panel (2/5 width on desktop) */}
          {activeClinic && (
            <div className="md:col-span-2 flex flex-col justify-between space-y-5 text-xs">
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-accent uppercase tracking-widest block">Centered Location Details</span>
                  <h4 className="font-serif font-black text-primary text-sm leading-tight">{activeClinic.name}</h4>
                  <p className="text-[10px] text-text-secondary leading-relaxed font-semibold">{activeClinic.address}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] uppercase font-bold text-primary tracking-widest block flex items-center space-x-1">
                    <Coffee className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>Nearby Services</span>
                  </span>
                  
                  <div className="space-y-1.5">
                    {mockNearbyServices.map((serv, i) => (
                      <div key={i} className="bg-[#FAF9F6] p-2.5 rounded-xl border border-primary/5 flex items-center justify-between text-[10px] text-text-secondary font-bold">
                        <span className="truncate pr-1">{serv.name}</span>
                        <span className="text-primary whitespace-nowrap bg-primary/5 px-2 py-0.5 rounded border border-primary/10">{serv.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Action button */}
              <a 
                href={`https://maps.google.com/?q=${activeClinic.latitude},${activeClinic.longitude}`}
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#FAF9F6] hover:bg-white hover:border-primary border border-primary/10 text-primary font-bold py-3.5 rounded-xl transition-all uppercase tracking-widest flex items-center justify-center space-x-2 text-[10px] shadow-sm cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-accent shrink-0" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClinicMapPreview;
