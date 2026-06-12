import React from 'react';
import { Bell, Clock, Lightbulb, ShieldAlert, X } from 'lucide-react';
import { Notification } from '../../types';
import { motion } from 'framer-motion';

interface NotificationCardProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDismiss
}) => {
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'Appointment':
        return {
          container: 'bg-emerald-500/5 border-emerald-500/10 text-emerald-900',
          badge: 'bg-emerald-600/10 text-emerald-800 border-emerald-500/20',
          icon: Bell
        };
      case 'Reminder':
        return {
          container: 'bg-amber-500/5 border-amber-500/10 text-amber-900',
          badge: 'bg-amber-600/10 text-amber-800 border-amber-500/20',
          icon: Clock
        };
      case 'Tip':
        return {
          container: 'bg-indigo-500/5 border-indigo-500/10 text-indigo-900',
          badge: 'bg-indigo-600/10 text-indigo-800 border-indigo-500/20',
          icon: Lightbulb
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-150 text-text-primary',
          badge: 'bg-gray-100 text-text-secondary border-gray-200',
          icon: ShieldAlert
        };
    }
  };

  const style = getTypeStyle(notification.type);
  const IconComponent = style.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`border p-4.5 rounded-2xl flex items-start justify-between gap-4 shadow-sm transition-all ${style.container}`}
    >
      <div className="flex items-start space-x-3.5">
        {/* Icon Circle */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0`}>
          <IconComponent className="w-4.5 h-4.5" />
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className={`text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded border ${style.badge}`}>
              {notification.type}
            </span>
            <span className="text-[9.5px] text-text-secondary font-bold">{notification.date}</span>
          </div>
          <h4 className="font-serif font-black text-text-primary leading-snug">
            {notification.title}
          </h4>
          <p className="text-text-secondary font-semibold leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDismiss(notification.id)}
        className="p-1 rounded-lg hover:bg-black/5 text-text-secondary transition-colors cursor-pointer shrink-0 mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default NotificationCard;
