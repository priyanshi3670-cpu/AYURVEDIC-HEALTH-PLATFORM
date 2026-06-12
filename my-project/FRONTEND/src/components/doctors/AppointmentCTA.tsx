import React from 'react';
import { Calendar, ArrowRight, Sprout } from 'lucide-react';

interface AppointmentCTAProps {
  onBookClick: () => void;
  onViewClick: () => void;
}

export const AppointmentCTA: React.FC<AppointmentCTAProps> = ({ onBookClick, onViewClick }) => {
  return (
    <section className="bg-primary text-white py-16 px-6 md:px-12 text-center relative overflow-hidden border-t border-b border-[#FAF9F6]/10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-2xl -z-10 animate-float" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto border border-white/20">
          <Sprout className="w-6 h-6 text-accent animate-float" />
        </div>
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
          Book Your Ayurveda Consultation Today
        </h2>
        
        <p className="text-sm text-secondary max-w-lg mx-auto leading-relaxed">
          Begin your journey back to complete balance. Speak to a verified doctor online via video consultation or in-person at an affiliated wellness clinic.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>Book Appointment</span>
          </button>
          
          <button
            onClick={onViewClick}
            className="w-full sm:w-auto border border-white/25 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCTA;
