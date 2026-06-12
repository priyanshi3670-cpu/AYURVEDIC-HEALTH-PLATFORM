import React from 'react';
import { UserProfile } from '../../types';
import { User, Activity, Flame, ShieldAlert, Award, FileText, Edit2 } from 'lucide-react';

interface HealthProfileCardProps {
  profile: UserProfile;
  onEditClick: () => void;
}

export const HealthProfileCard: React.FC<HealthProfileCardProps> = ({ profile, onEditClick }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 relative overflow-hidden group">
      {/* Decorative top-right corner background */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-50 to-transparent rounded-bl-3xl -z-10 transition-all group-hover:scale-105" />
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Current Profile
          </span>
          <h3 className="text-lg font-serif font-bold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            {profile.name}
          </h3>
        </div>
        <button
          onClick={onEditClick}
          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-emerald-100"
          title="Edit Profile Parameters"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50">
          <span className="text-[10px] font-semibold text-gray-400 block">Age & Gender</span>
          <p className="text-xs font-bold text-gray-700 mt-0.5">
            {profile.age} yrs • {profile.gender}
          </p>
        </div>
        <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50">
          <span className="text-[10px] font-semibold text-gray-400 block">Weight & Height</span>
          <p className="text-xs font-bold text-gray-700 mt-0.5">
            {profile.weight} kg • {profile.height} cm
          </p>
        </div>
        <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50">
          <span className="text-[10px] font-semibold text-gray-400 block flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" /> Dominant Dosha
          </span>
          <p className="text-xs font-bold text-emerald-700 mt-0.5 uppercase tracking-wide">
            {profile.doshaType}
          </p>
        </div>
        <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/50">
          <span className="text-[10px] font-semibold text-gray-400 block flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-500" /> Activity Level
          </span>
          <p className="text-xs font-bold text-gray-700 mt-0.5">
            {profile.activityLevel}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Diet Preference */}
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block mb-1">
            Dietary Preference
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100">
            {profile.dietPreference}
          </span>
        </div>

        {/* Health Goals */}
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block mb-1.5 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-600" /> Health Goals
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.healthGoals.length > 0 ? (
              profile.healthGoals.map((goal, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-md border border-emerald-100"
                >
                  {goal}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">None specified</span>
            )}
          </div>
        </div>

        {/* Medical Conditions */}
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block mb-1.5 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Medical Conditions
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.medicalConditions.length > 0 ? (
              profile.medicalConditions.map((cond, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-red-50 text-red-700 text-[11px] font-semibold rounded-md border border-red-100"
                >
                  {cond}
                </span>
              ))
            ) : (
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                No active conditions
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthProfileCard;
