import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ZoomIn, ZoomOut, Heart } from 'lucide-react';
import { Clinic } from '../../types';

interface MapPreviewProps {
  clinic: Clinic;
}

export const MapPreview: React.FC<MapPreviewProps> = ({ clinic }) => {
  const [zoom, setZoom] = useState(14);
  const [showDirections, setShowDirections] = useState(false);

  const nearbyServices = [
    { name: 'Organic Herb Garden', distance: '150m away', type: 'Botanical' },
    { name: 'Sattva Wellness Cafe', distance: '300m away', type: 'Dietary' },
    { name: 'Vedic Yoga Shala', distance: '450m away', type: 'Therapy' }
  ];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Location GPS</span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Interactive Center Map</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Locate {clinic.name} and explore nearby complementary health retreats.
          </p>
        </div>

        <button 
          onClick={() => setShowDirections(!showDirections)}
          className="bg-primary hover:bg-primary-light text-white font-bold text-[9.5px] py-2.5 px-5 rounded-xl uppercase tracking-widest shadow-md flex items-center space-x-1.5 transition-all self-start cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-accent shrink-0 animate-bounce" />
          <span>{showDirections ? 'Hide Directions' : 'Get Directions'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Mock Map Layout (2/3 width) */}
        <div className="lg:col-span-2 bg-[#FAF9F6] border border-primary/5 rounded-3xl relative h-80 overflow-hidden flex items-center justify-center select-none shadow-inner">
          {/* Simulated Map Grid Gridlines */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-[0.03] pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-primary" />
            ))}
          </div>

          {/* Map Greenery Blur */}
          <div className="absolute top-1/4 left-1/3 w-36 h-36 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-44 h-44 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Coordinates Grid details */}
          <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-primary/5 text-[9px] font-bold text-text-secondary shadow-sm">
            GPS: {clinic.latitude.toFixed(4)}° N, {clinic.longitude.toFixed(4)}° E (Zoom: {zoom})
          </div>

          {/* Map Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button 
              onClick={() => setZoom(z => Math.min(z + 1, 18))}
              className="bg-white/90 backdrop-blur-md hover:bg-white p-2 rounded-xl border border-primary/10 text-primary shadow-sm transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 shrink-0" />
            </button>
            <button 
              onClick={() => setZoom(z => Math.max(z - 1, 10))}
              className="bg-white/90 backdrop-blur-md hover:bg-white p-2 rounded-xl border border-primary/10 text-primary shadow-sm transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Center Coordinates Pin */}
          <div className="relative flex flex-col items-center animate-bounce">
            <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center shadow-lg border border-primary/20">
              <MapPin className="w-6 h-6 text-accent shrink-0" />
            </div>
            <div className="bg-primary/95 text-white text-[9px] font-black py-1 px-3.5 rounded-full mt-2 shadow-md uppercase tracking-wider border border-primary-light/10">
              {clinic.name}
            </div>
          </div>

          {/* Simulated Compass */}
          <div className="absolute top-4 right-4 bg-white/70 backdrop-blur-md p-2 rounded-xl border border-primary/5 shadow-sm text-primary">
            <Compass className="w-4 h-4 shrink-0 animate-spin-slow" />
          </div>

          {/* Directions Panel overlay */}
          {showDirections && (
            <div className="absolute inset-x-4 bottom-4 md:inset-x-auto md:left-4 md:w-72 bg-white/95 backdrop-blur-md border border-primary/15 rounded-2xl p-4 shadow-xl text-[10px] font-semibold text-text-secondary animate-fade-in-up space-y-2">
              <span className="text-primary text-[10px] font-black uppercase tracking-wider block font-sans">Transit Route Plan</span>
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                  <span>Head East towards Tapovan Circle (200m)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                  <span>Turn right onto Badrinath National Highway (1.2km)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0 animate-ping" />
                  <span className="text-primary font-bold">Destination is on the left.</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Nearby Amenities List */}
        <div className="bg-[#FAF9F6] border border-primary/5 rounded-3xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="text-primary text-[9.5px] font-black uppercase tracking-wider block font-sans">Nearby Health Services</span>
            <div className="space-y-3">
              {nearbyServices.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-primary/5 p-3 rounded-xl flex items-center justify-between shadow-sm"
                >
                  <div className="space-y-0.5">
                    <span className="font-serif font-bold text-[10.5px] text-primary block leading-tight">{item.name}</span>
                    <span className="text-[8px] text-text-secondary block font-semibold">{item.type} Facility</span>
                  </div>
                  <span className="bg-primary/5 text-primary text-[8px] font-bold py-0.5 px-2 rounded-md border border-primary/5 shrink-0">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F8FFF8] border border-primary/15 rounded-xl p-3.5 flex items-start space-x-2 text-[9.5px] text-text-secondary leading-normal font-semibold">
            <Heart className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Complementary Ecosystem</span>
              <span>All nearby organic farms and yoga pavilions share mutual verified referral mappings.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPreview;
