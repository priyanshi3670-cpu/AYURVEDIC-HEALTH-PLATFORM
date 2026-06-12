import React from 'react';
import { UserX } from 'lucide-react';
import { Doctor } from '../../services/doctorApi';
import DoctorCard from './DoctorCard';

interface DoctorGridProps {
  doctors: Doctor[];
  onViewProfile: (doctor: Doctor) => void;
  onBookAppointment: (doctor: Doctor) => void;
  onReset: () => void;
}

export const DoctorGrid: React.FC<DoctorGridProps> = ({
  doctors,
  onViewProfile,
  onBookAppointment,
  onReset
}) => {
  if (doctors.length === 0) {
    return (
      <div className="bg-white border border-[#2E7D32]/5 rounded-3xl p-16 text-center max-w-md mx-auto space-y-4 shadow-sm animate-fade-in-up">
        <UserX className="w-12 h-12 text-accent mx-auto animate-bounce-slow" />
        <h4 className="font-serif text-lg font-bold text-primary">No Doctors Available</h4>
        <p className="text-xs text-text-secondary leading-relaxed">
          We couldn't locate any Ayurvedic physicians matching your selected location, fee, or specializations.
        </p>
        <button
          onClick={onReset}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
      {doctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doctor={doc}
          onViewProfile={() => onViewProfile(doc)}
          onBookAppointment={() => onBookAppointment(doc)}
        />
      ))}
    </div>
  );
};

export default DoctorGrid;
