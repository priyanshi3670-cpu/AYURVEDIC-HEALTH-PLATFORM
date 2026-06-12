import React from 'react';
import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { DoctorFullProfile } from '../../types';

interface VerificationStatusProps {
  profile: DoctorFullProfile;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ profile }) => {
  const getStatusDisplay = (status: string, label: string) => {
    let Icon = FiClock;
    let colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-100';
    
    if (status === 'Verified' || status === 'Approved') {
      Icon = FiCheckCircle;
      colorClass = 'text-green-600 bg-green-50 border-green-100';
    } else if (status === 'Rejected') {
      Icon = FiXCircle;
      colorClass = 'text-red-600 bg-red-50 border-red-100';
    }

    return (
      <div className={`flex items-center justify-between p-3 border rounded-xl ${colorClass}`}>
        <span className="font-medium text-sm">{label}</span>
        <div className="flex items-center gap-1.5 text-sm font-bold">
          <Icon /> {status}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Verification Status</h3>
      
      <div className="space-y-3">
        {getStatusDisplay(profile.kycStatus, 'Identity (KYC)')}
        {getStatusDisplay(profile.medicalRegStatus, 'Medical Registration')}
        {getStatusDisplay(profile.profileApprovalStatus, 'Platform Approval')}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Verified profiles receive 3x more patient requests.
      </p>
    </div>
  );
};

export default VerificationStatus;
