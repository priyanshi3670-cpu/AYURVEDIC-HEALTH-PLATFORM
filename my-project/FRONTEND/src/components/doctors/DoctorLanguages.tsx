import React from 'react';
import { Languages } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorLanguagesProps {
  doctor: Doctor;
}

export const DoctorLanguages: React.FC<DoctorLanguagesProps> = ({ doctor }) => {
  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 rounded-3xl shadow-sm space-y-4">
      <h3 className="font-serif text-sm font-bold text-primary flex items-center space-x-2">
        <Languages className="w-4 h-4 text-accent shrink-0" />
        <span>Spoken Languages</span>
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {doctor.languages.map((lang, idx) => (
          <span
            key={idx}
            className="text-[10px] font-bold text-primary bg-[#F8FFF8] border border-[#2E7D32]/10 py-1.5 px-3 rounded-xl uppercase tracking-wider"
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DoctorLanguages;
