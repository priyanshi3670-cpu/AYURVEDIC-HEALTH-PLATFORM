import React from 'react';
import { FiMapPin, FiClock, FiMoreVertical } from 'react-icons/fi';
import { DoctorClinicAffiliation } from '../../types';

interface ClinicAffiliationCardProps {
  clinic: DoctorClinicAffiliation;
}

const ClinicAffiliationCard: React.FC<ClinicAffiliationCardProps> = ({ clinic }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary/30 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{clinic.clinicName}</h4>
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreVertical />
        </button>
      </div>
      
      <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
        <FiMapPin className="mt-1 shrink-0 text-gray-400" />
        <span>{clinic.address}, {clinic.city}</span>
      </div>
      
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <FiClock className="mt-1 shrink-0 text-gray-400" />
        <div className="flex flex-wrap gap-1">
          {clinic.consultationDays.map((day, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">
              {day.substring(0, 3)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicAffiliationCard;
