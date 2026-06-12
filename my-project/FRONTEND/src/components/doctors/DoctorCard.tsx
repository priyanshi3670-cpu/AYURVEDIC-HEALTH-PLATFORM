import React from 'react';
import { Star, MapPin, Briefcase, Video, Building, ChevronRight } from 'lucide-react';
import { Doctor } from '../../services/doctorApi';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: () => void;
  onBookAppointment: () => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewProfile,
  onBookAppointment
}) => {
  return (
    <div
      onClick={onViewProfile}
      className="bg-white border border-[#2E7D32]/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer card-hover"
    >
      <div>
        {/* Photo header */}
        <div className="h-52 overflow-hidden relative">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
          {doctor.onlineConsultation && (
            <span className="absolute top-4 right-4 bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow flex items-center space-x-1">
              <Video className="w-3.5 h-3.5 text-accent shrink-0 animate-pulse" />
              <span>Online Session</span>
            </span>
          )}
          <span className="absolute top-4 left-4 bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
            {doctor.specialization.split(' ')[0]}
          </span>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-serif text-lg font-bold text-primary hover:text-accent transition-colors">
                {doctor.name}
              </h3>
              <span className="text-[10px] font-bold uppercase text-[#81C784] block mt-0.5">{doctor.qualification}</span>
            </div>
            <div className="flex items-center space-x-0.5 bg-[#F8FFF8] border border-[#2E7D32]/5 px-2 py-0.5 rounded-md">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-xs font-bold text-primary">{doctor.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {doctor.specialExpertise.slice(0, 2).map((exp, idx) => (
              <span key={idx} className="text-[9px] bg-[#2E7D32]/5 text-text-secondary px-2.5 py-1 rounded-md font-semibold">
                {exp}
              </span>
            ))}
          </div>

          {/* Clinical meta details */}
          <div className="pt-2 border-t border-gray-100 flex flex-col space-y-1.5 text-xs text-text-secondary">
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-secondary shrink-0" />
              <span className="truncate font-medium">{doctor.clinicName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-secondary shrink-0" />
              <span className="font-medium">{doctor.city}, {doctor.state}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-secondary shrink-0" />
              <span className="font-medium">{doctor.experience} Yrs Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing and Action row */}
      <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex justify-between items-center bg-[#F8FFF8]/40">
        <div>
          <span className="block text-[8px] text-text-secondary uppercase font-bold">Cons. Fee</span>
          <span className="text-base font-black text-primary">₹{doctor.consultationFee}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile();
            }}
            className="border border-primary text-primary hover:bg-white font-bold text-[10px] px-3.5 py-2.5 rounded-full transition-colors"
          >
            Profile
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookAppointment();
            }}
            className="bg-primary hover:bg-primary-light text-white font-bold text-[10px] px-4 py-2.5 rounded-full shadow transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
