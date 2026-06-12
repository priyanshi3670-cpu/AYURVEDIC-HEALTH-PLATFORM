import React from 'react';
import { FiEdit2, FiCamera, FiExternalLink } from 'react-icons/fi';
import { DoctorFullProfile } from '../../types';

interface DoctorProfileHeroProps {
  profile: DoctorFullProfile;
}

const DoctorProfileHero: React.FC<DoctorProfileHeroProps> = ({ profile }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-emerald-900 rounded-2xl p-8 shadow-sm text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white opacity-10"></div>
      <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-accent opacity-20"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl bg-primary">
            {profile.profilePhoto ? (
              <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white text-primary rounded-full shadow-lg hover:bg-gray-50 transition-colors">
            <FiCamera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-1">{profile.fullName}</h1>
          <p className="text-primary-100 text-lg mb-3">{profile.qualification} • {profile.experience} Years Exp.</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
            <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <span className="text-yellow-400">★</span> 
              <span className="font-bold">{profile.rating}</span>
              <span className="text-primary-100">({profile.reviewCount} Reviews)</span>
            </div>
            <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <span className="text-primary-100">Consultation:</span>
              <span className="font-bold">₹{profile.consultationFee}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button className="px-4 py-2 bg-white text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
              <FiEdit2 /> Edit Profile
            </button>
            <button className="px-4 py-2 bg-black/20 text-white font-medium rounded-xl hover:bg-black/30 transition-colors flex items-center gap-2 text-sm backdrop-blur-sm">
              <FiExternalLink /> Preview Public Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileHero;
