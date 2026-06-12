import React from 'react';
import { Star, MapPin, Briefcase, Video, Building, Heart } from 'lucide-react';
import { Doctor } from '../../services/doctorApi';

interface DoctorHeroProps {
  doctor: Doctor;
  onBookClick: () => void;
  onVideoClick: () => void;
}

export const DoctorHero: React.FC<DoctorHeroProps> = ({ doctor, onBookClick, onVideoClick }) => {
  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row gap-8 items-center">
      {/* Profile Photo */}
      <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shrink-0 shadow-md">
        <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
      </div>

      {/* Info details */}
      <div className="flex-grow space-y-4 text-center md:text-left">
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">{doctor.name}</h1>
            <div className="inline-flex items-center space-x-1.5 bg-[#2E7D32]/5 border border-[#2E7D32]/10 text-primary text-[10px] font-bold px-3.5 py-1 rounded-full mx-auto md:mx-0">
              <ShieldCheckIcon className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
              <span>Verified Vaidya</span>
            </div>
          </div>
          <span className="text-xs font-bold uppercase text-accent tracking-wider block">{doctor.specialization}</span>
          <p className="text-xs text-text-secondary font-medium">{doctor.qualification}</p>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start text-xs text-text-secondary pt-1">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-bold text-primary">{doctor.rating}</span>
            <span>({doctor.reviewCount} reviews)</span>
          </div>
          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
          <div className="flex items-center space-x-1">
            <Briefcase className="w-4 h-4 text-secondary" />
            <span>{doctor.experience} Yrs Active</span>
          </div>
          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-secondary" />
            <span>{doctor.city}, {doctor.state}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start items-center">
          <div className="text-xs font-semibold text-text-secondary">
            Cons. Fee: <span className="text-lg font-black text-primary">₹{doctor.consultationFee}</span>
          </div>
          <button
            onClick={onBookClick}
            className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md shadow-primary/10 transition-colors uppercase tracking-wider"
          >
            Book Appointment
          </button>
          {doctor.onlineConsultation && (
            <button
              onClick={onVideoClick}
              className="bg-white hover:bg-gray-50 border border-primary text-primary font-bold text-xs px-6 py-2.5 rounded-full shadow-sm transition-colors uppercase tracking-wider flex items-center space-x-2"
            >
              <Video className="w-4 h-4 text-accent shrink-0 animate-pulse" />
              <span>Video Consultation</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal icon helper
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

export default DoctorHero;
