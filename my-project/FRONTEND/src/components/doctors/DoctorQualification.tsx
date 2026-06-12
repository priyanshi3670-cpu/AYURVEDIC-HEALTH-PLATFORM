import React from 'react';
import { GraduationCap, Award, CheckCircle } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorQualificationProps {
  doctor: Doctor;
}

export const DoctorQualification: React.FC<DoctorQualificationProps> = ({ doctor }) => {
  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2.5">
        <GraduationCap className="w-5 h-5 text-accent shrink-0" />
        <span>Qualifications & Training</span>
      </h3>

      <div className="space-y-4">
        {/* Education Timeline/List */}
        <div className="relative border-l border-primary/10 pl-6 ml-3 space-y-6">
          {doctor.education.map((edu, idx) => {
            const parts = edu.split(' - ');
            const title = parts[0] || edu;
            const sub = parts[1] || '';
            const details = parts[2] || '';

            return (
              <div key={idx} className="relative">
                {/* Node Dot */}
                <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </span>
                
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-primary leading-tight">{title}</h4>
                  {sub && <p className="text-[11px] font-semibold text-text-secondary">{sub}</p>}
                  {details && <p className="text-[10px] text-text-secondary italic">{details}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certifications Card */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-4.5 rounded-2xl space-y-2 mt-2">
          <span className="text-[9px] font-bold text-text-secondary uppercase tracking-wider block">Board Verification</span>
          <div className="flex items-center space-x-2 text-xs text-[#2E7D32] font-bold">
            <CheckCircle className="w-4 h-4 text-accent shrink-0" />
            <span>National Commission for Indian System of Medicine (NCISM) Registered</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorQualification;
