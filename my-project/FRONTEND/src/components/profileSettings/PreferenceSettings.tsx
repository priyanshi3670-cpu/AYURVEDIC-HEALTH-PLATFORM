import React from 'react';
import { useForm } from 'react-hook-form';
import { FiSettings, FiSave, FiGlobe, FiClock, FiMessageCircle } from 'react-icons/fi';
import { AppSettings } from '../../types';

interface PreferenceSettingsProps {
  settings: AppSettings;
  onSave: (data: Partial<AppSettings>) => void;
  isSaving: boolean;
}

const PreferenceSettings: React.FC<PreferenceSettingsProps> = ({ settings, onSave, isSaving }) => {
  const { register, handleSubmit, formState: { isDirty }, reset } = useForm<AppSettings>({
    defaultValues: settings
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiSettings className="text-primary" /> App Preferences
      </h2>

      <form onSubmit={handleSubmit(onSave)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FiGlobe className="text-gray-400" /> Language
            </label>
            <select
              {...register('language')}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Sanskrit">Sanskrit</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FiClock className="text-gray-400" /> Timezone
            </label>
            <select
              {...register('timezone')}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
            </select>
          </div>

          {/* Communication */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FiMessageCircle className="text-gray-400" /> Primary Communication
            </label>
            <select
              {...register('communicationMethod')}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="In-App">In-App</option>
            </select>
          </div>

          {/* Consultation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <FiSettings className="text-gray-400" /> Preferred Consultation
            </label>
            <select
              {...register('consultationType')}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="Online">Online Video Call</option>
              <option value="Offline">In-Clinic</option>
              <option value="Both">Both Available</option>
            </select>
          </div>
        </div>

        {isDirty && (
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <FiSave />
              )}
              Save Preferences
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PreferenceSettings;
