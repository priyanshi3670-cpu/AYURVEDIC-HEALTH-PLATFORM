import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSave } from 'react-icons/fi';
import { DoctorFullProfile } from '../../types';

interface ProfessionalInfoFormProps {
  profile: DoctorFullProfile;
  onSave: (data: any) => void;
  isSaving: boolean;
}

const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({ profile, onSave, isSaving }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      qualification: profile.qualification,
      experience: profile.experience,
      consultationFee: profile.consultationFee,
      onlineConsultationFee: profile.onlineConsultationFee,
    }
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Professional Details & Fees</h3>
      
      <form onSubmit={handleSubmit(onSave)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Qualification</label>
            <input 
              {...register('qualification', { required: 'Qualification is required' })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.qualification && <p className="text-red-500 text-xs mt-1">{errors.qualification.message as string}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input 
              type="number"
              {...register('experience', { required: 'Experience is required', min: 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">In-Clinic Consultation Fee (₹)</label>
            <input 
              type="number"
              {...register('consultationFee', { required: 'Fee is required', min: 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.consultationFee && <p className="text-red-500 text-xs mt-1">{errors.consultationFee.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Online Consultation Fee (₹)</label>
            <input 
              type="number"
              {...register('onlineConsultationFee', { required: 'Fee is required', min: 0 })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            {errors.onlineConsultationFee && <p className="text-red-500 text-xs mt-1">{errors.onlineConsultationFee.message as string}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button 
            type="submit" 
            disabled={isSaving}
            className="px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSaving ? 'Saving...' : <><FiSave /> Save Details</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfoForm;
