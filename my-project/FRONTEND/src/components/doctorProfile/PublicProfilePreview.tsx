import React from 'react';
import { FiEye, FiShare2 } from 'react-icons/fi';
import { DoctorFullProfile } from '../../types';

interface PublicProfilePreviewProps {
  profile: DoctorFullProfile;
}

const PublicProfilePreview: React.FC<PublicProfilePreviewProps> = ({ profile }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-primary text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white opacity-5"></div>
      
      <div className="relative z-10">
        <h3 className="font-bold mb-2">Public Profile</h3>
        <p className="text-sm text-gray-300 mb-6">This is how patients see your profile on the platform.</p>

        <div className="bg-white text-gray-900 rounded-xl p-4 shadow-lg mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-primary text-white flex items-center justify-center font-bold">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : (
                profile.fullName.charAt(0)
              )}
            </div>
            <div>
              <h4 className="font-bold">{profile.fullName}</h4>
              <p className="text-xs text-gray-500">{profile.qualification}</p>
              <div className="flex items-center gap-1 mt-1 text-xs">
                <span className="text-yellow-400">★</span> 
                <span className="font-bold">{profile.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
            <FiEye /> Preview
          </button>
          <button className="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
            <FiShare2 /> Share Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePreview;
