import React from 'react';
import { Users } from 'lucide-react';
import { Doctor } from '../../types';
import DoctorCard from './DoctorCard';

interface ClinicDoctorsProps {
  doctors: Doctor[];
  onViewProfile: (doc: Doctor) => void;
}

export const ClinicDoctors: React.FC<ClinicDoctorsProps> = ({ doctors, onViewProfile }) => {
  if (doctors.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Users className="w-5 h-5 text-accent" />
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Our Specialist Doctors</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard 
            key={doc.id} 
            doctor={doc} 
            onViewProfile={onViewProfile} 
          />
        ))}
      </div>
    </section>
  );
};

export default ClinicDoctors;
