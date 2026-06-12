import React from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface ProfileCompletionCardProps {
  percentage: number;
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ percentage }) => {
  const isComplete = percentage === 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Profile Completion</h3>
        <span className={`text-xl font-bold ${isComplete ? 'text-green-600' : 'text-primary'}`}>
          {percentage}%
        </span>
      </div>

      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${isComplete ? 'bg-green-500' : 'bg-primary'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {!isComplete ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Pending Actions to reach 100%:</p>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <FiAlertCircle className="text-yellow-500 shrink-0" />
              Upload Medical Registration Certificate (+10%)
            </li>
            <li className="flex items-center gap-2">
              <FiAlertCircle className="text-yellow-500 shrink-0" />
              Add Bank Account Details (+5%)
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl">
          <FiCheckCircle className="shrink-0" />
          <span className="text-sm font-medium">Your profile is 100% complete and visible to patients!</span>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionCard;
