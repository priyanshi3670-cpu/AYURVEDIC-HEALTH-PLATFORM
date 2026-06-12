import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { DoctorFullProfile } from '../../types';

interface PersonalInfoFormProps {
  profile: DoctorFullProfile;
  onSave: (data: any) => void;
  isSaving: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ profile, onSave, isSaving }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      gender: profile.gender,
      dateOfBirth: profile.dateOfBirth,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      bio: profile.bio
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Personal Information</h3>
      
      <form onSubmit={handleSubmit(onSave)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message as string}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              {...register('phone', { required: 'Phone is required' })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              {...register('gender')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="date"
              {...register('dateOfBirth')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input 
              {...register('city')}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
          <textarea 
            {...register('bio')}
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Tell patients about your background, approach, and philosophy..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button type="button" className="px-5 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            Reset
          </button>
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : <><FiSave /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
