import React from 'react';
import { Award, ShieldAlert, CheckCircle } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorAwardsProps {
  doctor: Doctor;
}

export const DoctorAwards: React.FC<DoctorAwardsProps> = ({ doctor }) => {
  return (
    <div className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <h3 className="font-serif text-lg font-bold text-primary flex items-center space-x-2.5">
        <Award className="w-5 h-5 text-accent shrink-0" />
        <span>Awards & Recognition</span>
      </h3>

      <div className="space-y-4">
        {doctor.awards && doctor.awards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doctor.awards.map((award, idx) => (
              <div key={idx} className="p-4 bg-[#FAF9F6] border border-[#2E7D32]/5 rounded-2xl flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#2E7D32]/5 flex items-center justify-center text-[#2E7D32] shrink-0">
                  <Award className="w-4.5 h-4.5 text-accent" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-primary leading-tight">{award}</h4>
                  <p className="text-[10px] text-text-secondary">Verified Credential</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-secondary italic">Credentials verified by Ministry of AYUSH. Individual award logging pending.</p>
        )}

        {/* Association Memberships */}
        <div className="bg-[#F8FFF8] border border-primary/10 p-4 rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-[#4CAF50] shrink-0" />
          <span className="text-[11px] font-bold text-primary">All-India Ayurvedic Congress Active Member</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorAwards;
