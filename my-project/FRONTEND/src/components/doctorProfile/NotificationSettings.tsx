import React from 'react';

const NotificationSettings: React.FC = () => {
  const notifications = [
    { id: 'appts', label: 'Appointment Alerts', desc: 'New bookings, cancellations, or rescheduling.' },
    { id: 'messages', label: 'Patient Messages', desc: 'Direct messages from your active patients.' },
    { id: 'reviews', label: 'Review Alerts', desc: 'When a patient leaves a new review.' },
    { id: 'system', label: 'System Notifications', desc: 'Updates about your profile verification and account.' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6">Notification Preferences</h3>
      
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 text-sm">{notif.label}</p>
              <p className="text-xs text-gray-500">{notif.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
