import React from 'react';
import { useForm } from 'react-hook-form';
import { FiBell, FiSave } from 'react-icons/fi';
import { NotificationPrefs } from '../../types';

interface NotificationSettingsProps {
  prefs: NotificationPrefs;
  onSave: (data: Partial<NotificationPrefs>) => void;
  isSaving: boolean;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ prefs, onSave, isSaving }) => {
  const { register, handleSubmit, formState: { isDirty } } = useForm<NotificationPrefs>({
    defaultValues: prefs
  });

  const ToggleSwitch = ({ name, label, description }: { name: keyof NotificationPrefs; label: string; description: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="pr-4">
        <h4 className="text-gray-900 font-medium">{label}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" {...register(name)} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiBell className="text-blue-500" /> Notifications
      </h2>

      <form onSubmit={handleSubmit(onSave)}>
        <div className="space-y-1 mb-6">
          <ToggleSwitch 
            name="appointmentAlerts" 
            label="Appointment Alerts" 
            description="Get notified about upcoming appointments and changes" 
          />
          <ToggleSwitch 
            name="medicineReminders" 
            label="Medicine Reminders" 
            description="Daily reminders for your Ayurvedic medicines" 
          />
          <ToggleSwitch 
            name="recoveryUpdates" 
            label="Recovery Updates" 
            description="Weekly progress reports and recovery tracking" 
          />
          <ToggleSwitch 
            name="aiRecommendations" 
            label="AI Recommendations" 
            description="Personalized health tips from AyurVeda Assistant" 
          />
        </div>

        <h3 className="font-semibold text-gray-900 mb-4 mt-6">Delivery Methods</h3>
        <div className="space-y-1 mb-6">
          <ToggleSwitch 
            name="emailNotifications" 
            label="Email Notifications" 
            description="Receive updates in your inbox" 
          />
          <ToggleSwitch 
            name="smsNotifications" 
            label="SMS Notifications" 
            description="Get urgent alerts via text message" 
          />
          <ToggleSwitch 
            name="pushNotifications" 
            label="Push Notifications" 
            description="Receive notifications on your device" 
          />
        </div>

        {isDirty && (
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <FiSave />
              )}
              Save Notification Prefs
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NotificationSettings;
