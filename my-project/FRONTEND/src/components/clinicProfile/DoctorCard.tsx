import React from 'react';
import { Star, IndianRupee } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onViewProfile: (doc: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onViewProfile }) => {
  return (
    <div className="group bg-white border border-[#2E7D32]/5 hover:border-primary/25 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[360px]">
      <div className="space-y-4">
        {/* Photo and Experience */}
        <div className="h-44 relative overflow-hidden bg-gray-50 shrink-0">
          <img 
            src={doctor.photo} 
            alt={doctor.name} 
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          {/* Experience badge */}
          <span className="absolute bottom-3 left-4 bg-primary/95 backdrop-blur-sm text-white text-[8px] font-black py-1 px-3 rounded-full uppercase tracking-wider shadow-sm">
            {doctor.experience}+ Years Experience
          </span>
        </div>

        {/* Info */}
        <div className="px-5 space-y-1.5">
          <div className="flex justify-between items-start">
            <h4 className="font-serif text-sm font-bold text-primary leading-tight max-w-[80%] truncate">
              {doctor.name}
            </h4>
            <div className="flex items-center space-x-0.5 text-[10px] font-bold text-primary pl-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span>{doctor.rating}</span>
            </div>
          </div>

          <p className="text-[10px] uppercase font-bold text-text-secondary tracking-wide truncate">
            {doctor.specialization}
          </p>

          <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-2 font-medium">
            {doctor.about}
          </p>
        </div>
      </div>

      {/* Footer fee & profile trigger */}
      <div className="p-5 border-t border-gray-50 flex items-center justify-between shrink-0 bg-[#F8FFF8]/25">
        <div className="space-y-0.5">
          <span className="block text-[8px] text-text-secondary uppercase font-bold tracking-wider">Fee</span>
          <div className="flex items-center text-primary font-black text-xs">
            <IndianRupee className="w-3.5 h-3.5 text-accent shrink-0" />
            <span>{doctor.consultationFee}</span>
          </div>
        </div>

        <button
          onClick={() => onViewProfile(doctor)}
          className="border border-[#2E7D32]/25 hover:bg-primary text-primary hover:text-white font-bold text-[9px] py-2 px-4 rounded-xl uppercase tracking-wider transition-all cursor-pointer"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
