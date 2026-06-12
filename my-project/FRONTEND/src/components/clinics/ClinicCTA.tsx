import React from 'react';
import { Search, Calendar, Heart } from 'lucide-react';

interface ClinicCTAProps {
  onBrowseClinics: () => void;
  onBookConsultation: () => void;
}

export const ClinicCTA: React.FC<ClinicCTAProps> = ({
  onBrowseClinics,
  onBookConsultation
}) => {
  return (
    <section className="bg-gradient-to-r from-primary via-primary-light to-[#1B5E20] text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-20 -translate-y-20 blur-2xl pointer-events-none" />

      <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
        <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/15 inline-block">
          Personalized Care Paths
        </span>
        <h2 className="font-serif text-2xl md:text-3xl font-black">
          Find the Right Ayurveda Clinic for Your Health Journey
        </h2>
        <p className="text-xs text-white/90 leading-relaxed font-semibold">
          Explore certified partner wellness centers nearby and request inpatient detox plans matching your physical constitution.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto shrink-0 relative z-10 text-xs font-bold uppercase">
        <button
          onClick={onBrowseClinics}
          className="bg-accent hover:bg-accent-light text-primary font-bold py-4 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Search className="w-4.5 h-4.5 text-primary shrink-0" />
          <span>Browse Clinics</span>
        </button>
        
        <button
          onClick={onBookConsultation}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-6 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Calendar className="w-4.5 h-4.5 text-accent shrink-0" />
          <span>Book Consultation</span>
        </button>
      </div>
    </section>
  );
};

export default ClinicCTA;
