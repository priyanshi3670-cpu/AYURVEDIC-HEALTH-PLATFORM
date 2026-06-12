import React from 'react';
import { useForm } from 'react-hook-form';
import { FiShield, FiSave, FiEye, FiDatabase, FiActivity } from 'react-icons/fi';
import { PrivacyPrefs } from '../../types';

interface PrivacySettingsProps {
  prefs: PrivacyPrefs;
  onSave: (data: Partial<PrivacyPrefs>) => void;
  isSaving: boolean;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ prefs, onSave, isSaving }) => {
  const { register, handleSubmit, formState: { isDirty } } = useForm<PrivacyPrefs>({
    defaultValues: prefs
  });

  const ToggleSwitch = ({ name, label, description, icon }: { name: keyof PrivacyPrefs; label: string; description: string; icon: React.ReactNode }) => (
    <div className="flex items-start justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex gap-3 pr-4">
        <div className="mt-1 text-gray-400">{icon}</div>
        <div>
          <h4 className="text-gray-900 font-medium">{label}</h4>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer mt-1">
        <input type="checkbox" {...register(name)} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiShield className="text-purple-500" /> Privacy & Data
      </h2>

      <form onSubmit={handleSubmit(onSave)}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiEye className="text-gray-400" /> Profile Visibility
          </label>
          <select
            {...register('profileVisibility')}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          >
            <option value="Public">Public (Visible to everyone)</option>
            <option value="Doctors Only">Doctors Only (Recommended)</option>
            <option value="Private">Private (Only me)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Control who can see your basic profile information on the platform.</p>
        </div>

        <div className="space-y-1 mb-6">
          <ToggleSwitch 
            name="healthDataSharing" 
            label="Health Data Sharing" 
            description="Allow your health data to be used anonymously for Ayurvedic research."
            icon={<FiDatabase />}
          />
          <ToggleSwitch 
            name="doctorAccess" 
            label="Doctor Access" 
            description="Automatically grant access to your medical records to doctors you book."
            icon={<FiShield />}
          />
          <ToggleSwitch 
            name="analyticsTracking" 
            label="Analytics Tracking" 
            description="Help us improve AyurVeda Connect by sharing usage analytics."
            icon={<FiActivity />}
          />
        </div>

        {isDirty && (
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-xl shadow-sm hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <FiSave />
              )}
              Save Privacy Prefs
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PrivacySettings;
