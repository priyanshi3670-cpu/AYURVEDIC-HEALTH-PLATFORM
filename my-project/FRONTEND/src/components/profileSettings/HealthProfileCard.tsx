import React from 'react';
import { FiActivity, FiTarget, FiHeart, FiSmile, FiCoffee } from 'react-icons/fi';
import { FullUserProfile } from '../../types';

interface HealthProfileCardProps {
  profile: FullUserProfile;
}

const HealthProfileCard: React.FC<HealthProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiActivity className="text-secondary" /> Health Profile
      </h2>

      <div className="space-y-6">
        {/* Dosha Type */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-4">
          <div className="p-3 bg-orange-100 rounded-full text-orange-600 mt-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Current Dosha Type</h3>
            <p className="text-orange-700 font-bold text-lg">{profile.doshaType}</p>
            <p className="text-sm text-gray-600 mt-1">Determined on {new Date(profile.joinedDate).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Goals & Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FiTarget className="text-primary" /> Health Goals
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.healthGoals.map((goal, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200">
                  {goal}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FiHeart className="text-red-400" /> Medical Conditions
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.medicalConditions.length > 0 ? (
                profile.medicalConditions.map((condition, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                    {condition}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">None reported</span>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-2">
              <FiSmile className="text-blue-500" />
              <h4 className="font-medium text-gray-900">Lifestyle</h4>
            </div>
            <p className="text-gray-600 text-sm">{profile.lifestylePreference}</p>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-2">
              <FiCoffee className="text-green-500" />
              <h4 className="font-medium text-gray-900">Diet</h4>
            </div>
            <p className="text-gray-600 text-sm">{profile.dietPreference}</p>
          </div>
          
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-2 mb-2">
              <FiActivity className="text-purple-500" />
              <h4 className="font-medium text-gray-900">Exercise</h4>
            </div>
            <p className="text-gray-600 text-sm">{profile.exercisePreference}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HealthProfileCard;
