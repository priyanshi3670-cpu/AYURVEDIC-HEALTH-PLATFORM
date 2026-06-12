import React from 'react';
import { FiBell, FiCalendar, FiStar } from 'react-icons/fi';
import { DoctorNotificationModel } from '../../types';

interface NotificationPanelProps {
  notifications: DoctorNotificationModel[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Alert': return <FiBell className="text-red-500" />;
      case 'Update': return <FiCalendar className="text-blue-500" />;
      case 'Review': return <FiStar className="text-yellow-500" />;
      default: return <FiBell className="text-gray-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'Alert': return 'bg-red-50';
      case 'Update': return 'bg-blue-50';
      case 'Review': return 'bg-yellow-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Recent Notifications</h3>
        <button className="text-primary text-sm font-medium hover:underline">Mark all read</button>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className={`flex gap-4 p-3 rounded-xl transition-colors ${notif.read ? 'bg-transparent' : 'bg-gray-50'}`}>
            <div className={`p-2.5 rounded-lg h-fit ${getBgColor(notif.type)}`}>
              {getIcon(notif.type)}
            </div>
            <div>
              <h4 className={`text-sm ${notif.read ? 'text-gray-700 font-medium' : 'text-gray-900 font-semibold'}`}>
                {notif.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
              <span className="text-[10px] text-gray-400 mt-2 block">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
