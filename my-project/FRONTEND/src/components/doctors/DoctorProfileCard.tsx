import React from 'react';
import { ShieldCheck, MapPin, Building, Languages, Clock, Video, MessageSquare } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorProfileCardProps {
  doctor: Doctor;
  onBookScroll: () => void;
}

export const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({ doctor, onBookScroll }) => {
  return (
    <div className="bg-white border border-[#2E7D32]/10 p-6 rounded-3xl shadow-xl shadow-primary/5 space-y-6 sticky top-28 backdrop-blur-md bg-white/90">
      <div className="space-y-4">
        {/* Verification Tag */}
        <div className="inline-flex items-center space-x-1.5 bg-[#2E7D32]/5 border border-[#2E7D32]/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full w-full justify-center">
          <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
          <span>VERIFIED AYURVEDIC PRACTITIONER</span>
        </div>

        {/* Consulting Fee */}
        <div className="bg-[#FAF9F6] border border-[#2E7D32]/5 rounded-2xl p-4 text-center">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">Consultation Fee</span>
          <span className="text-3xl font-black text-primary mt-1 block">₹{doctor.consultationFee}</span>
          <span className="text-[10px] text-text-secondary block mt-1">Per Session (approx. 30-45 mins)</span>
        </div>

        {/* Clinic & Location */}
        <div className="space-y-3.5 pt-2 text-xs text-text-secondary">
          <div className="flex items-start space-x-3">
            <Building className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Clinic Address</span>
              <span className="font-medium text-[11px] leading-relaxed">{doctor.clinicName}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Location</span>
              <span className="font-medium text-[11px]">{doctor.city}, {doctor.state}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Schedule</span>
              <span className="font-medium text-[11px]">{doctor.availability}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Languages className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Languages Spoken</span>
              <span className="font-medium text-[11px]">{doctor.languages.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Channels Available */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest block">Consultation Formats</span>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
          <div className={`p-2.5 rounded-xl border flex items-center space-x-2 ${doctor.onlineConsultation ? 'bg-[#2E7D32]/5 border-[#2E7D32]/15 text-primary' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
            <Video className="w-3.5 h-3.5 shrink-0 text-accent" />
            <span>Online Video</span>
          </div>
          <div className={`p-2.5 rounded-xl border flex items-center space-x-2 ${doctor.offlineConsultation ? 'bg-[#2E7D32]/5 border-[#2E7D32]/15 text-primary' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
            <Building className="w-3.5 h-3.5 shrink-0 text-accent" />
            <span>Clinic Visit</span>
          </div>
        </div>
      </div>

      {/* Quick Booking Button */}
      <button
        onClick={onBookScroll}
        className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 uppercase tracking-wider"
      >
        Book Consultation
      </button>
    </div>
  );
};

export default DoctorProfileCard;
