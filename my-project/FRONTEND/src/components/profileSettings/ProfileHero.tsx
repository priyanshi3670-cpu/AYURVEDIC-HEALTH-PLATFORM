import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiCamera, FiMapPin, FiCalendar } from 'react-icons/fi';
import { FullUserProfile } from '../../types';

interface ProfileHeroProps {
  profile: FullUserProfile;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
      {/* Background Cover */}
      <div className="h-32 bg-gradient-to-r from-primary/80 to-secondary/80 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12 relative z-10">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
              {profile.profilePhoto ? (
                <img src={profile.profilePhoto} alt={profile.fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-primary">{profile.fullName.charAt(0)}</span>
              )}
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-primary transition-colors hover:bg-gray-50 border border-gray-100 group-hover:scale-110 duration-200">
              <FiCamera className="w-4 h-4" />
            </button>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                <p className="text-gray-600">{profile.email}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiMapPin className="text-primary/60" />
                    <span>{profile.city}, {profile.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar className="text-primary/60" />
                    <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 transition-colors font-medium"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit Profile
              </motion.button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 mt-6">
          <div className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Dosha: {profile.doshaType}
          </div>
          {profile.healthGoals.slice(0, 2).map((goal, index) => (
            <div key={index} className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               {goal}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
