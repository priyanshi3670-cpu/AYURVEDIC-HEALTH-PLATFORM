import React from 'react';
import { motion } from 'framer-motion';
import { AINotificationItem } from '../../types';
import { FiBell, FiHeart, FiCalendar, FiSun } from 'react-icons/fi';

interface NotificationCenterProps {
  notifications: AINotificationItem[];
  onDismiss?: (id: string) => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  Health: <FiHeart className="w-3.5 h-3.5 text-red-500" />,
  Diet: <FiSun className="w-3.5 h-3.5 text-emerald-600" />,
  Appointment: <FiCalendar className="w-3.5 h-3.5 text-blue-600" />,
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiBell className="w-4 h-4 text-[#2E7D32]" />
          <h3 className="font-serif text-lg font-bold text-gray-800">Notification Center</h3>
        </div>
        <span className="text-[10px] font-bold text-[#2E7D32] bg-emerald-100 px-2 py-0.5 rounded-full">
          {notifications.filter(n => !n.read).length} new
        </span>
      </div>

      <div className="space-y-2">
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
              notif.read ? 'bg-white border-gray-100' : 'bg-[#F8FFF8] border-emerald-100'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
              {typeIcons[notif.type] || <FiBell className="w-3.5 h-3.5 text-gray-400" />}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`text-xs font-bold ${notif.read ? 'text-gray-500' : 'text-gray-800'}`}>{notif.title}</h4>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-[#2E7D32] shrink-0" />}
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">{notif.message}</p>
              <span className="text-[9px] text-gray-400 mt-1 block">{notif.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationCenter;
