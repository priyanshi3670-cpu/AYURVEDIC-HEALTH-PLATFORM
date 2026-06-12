import React, { useState } from 'react';
import { Bell, BellOff, X, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RecoveryNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'herb' | 'therapy' | 'hydration' | 'lifestyle';
}

export const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<RecoveryNotification[]>([
    {
      id: 'n-1',
      title: 'Herb Dosage Alert',
      message: 'It is time for Yogaraj Guggulu tablets (2 tablets) with warm water.',
      time: '15 mins ago',
      type: 'herb'
    },
    {
      id: 'n-2',
      title: 'Janu Basti Therapy',
      message: 'Appointment scheduled with Dr. Vikram Chauhan at the clinic.',
      time: 'In 2 hours',
      type: 'therapy'
    },
    {
      id: 'n-3',
      title: 'Hydration Schedule',
      message: 'Time to drink 300ml ginger-infused warm water to boost Agni fire.',
      time: 'In 30 mins',
      type: 'hydration'
    },
    {
      id: 'n-4',
      title: 'Nidra Sleep Optimization',
      message: 'Avoid blue screens now. Sleep cycle scheduled for 10:30 PM.',
      time: 'Tonight',
      type: 'lifestyle'
    }
  ]);

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'herb':
        return 'bg-amber-50 border-amber-500/20 text-amber-800 icon-bg:bg-amber-500/10 icon-color:text-amber-700';
      case 'therapy':
        return 'bg-blue-50 border-blue-500/20 text-blue-800 icon-bg:bg-blue-500/10 icon-color:text-blue-700';
      case 'hydration':
        return 'bg-cyan-50 border-cyan-500/20 text-cyan-800 icon-bg:bg-cyan-500/10 icon-color:text-cyan-700';
      case 'lifestyle':
        return 'bg-purple-50 border-purple-500/20 text-purple-800 icon-bg:bg-purple-500/10 icon-color:text-purple-700';
      default:
        return 'bg-emerald-50 border-emerald-500/20 text-emerald-800 icon-bg:bg-emerald-500/10 icon-color:text-emerald-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4"
    >
      <div className="flex items-center justify-between border-b border-emerald-50 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 text-rose-700 flex items-center justify-center border border-rose-500/20 shadow-sm">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-black text-text-primary">Healing Alarm Centre</h3>
            <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Active reminders for daily compliance</p>
          </div>
        </div>
        {notifications.length > 0 && (
          <span className="text-[10px] font-black text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-500/10 animate-pulse">
            {notifications.length} Active Alarms
          </span>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center flex flex-col items-center justify-center space-y-2"
            >
              <BellOff className="w-10 h-10 text-emerald-100" />
              <p className="text-xs font-bold text-text-secondary">All clear! No remaining schedules for today.</p>
            </motion.div>
          ) : (
            notifications.map((n) => {
              const colorClasses = getColors(n.type);
              const isHerb = n.type === 'herb';
              const isTherapy = n.type === 'therapy';
              const isHydration = n.type === 'hydration';
              const iconColor = isHerb ? 'text-amber-700 bg-amber-500/10' : isTherapy ? 'text-blue-700 bg-blue-500/10' : isHydration ? 'text-cyan-700 bg-cyan-500/10' : 'text-purple-700 bg-purple-500/10';

              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-start justify-between p-3.5 border rounded-xl transition-all duration-200 ${colorClasses}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-current/10 ${iconColor}`}>
                      {isHerb ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <strong className="text-xs font-bold text-text-primary block leading-snug">
                        {n.title}
                      </strong>
                      <p className="text-[11px] text-text-secondary leading-normal font-medium mt-0.5">
                        {n.message}
                      </p>
                      <span className="text-[9px] font-extrabold uppercase tracking-wide block mt-1 opacity-70">
                        {n.time}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismiss(n.id)}
                    className="p-1 text-text-secondary hover:text-rose-600 rounded-lg hover:bg-emerald-950/5 transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {notifications.length > 0 && (
        <div className="flex items-center space-x-2 text-[10px] text-text-secondary font-bold bg-rose-50/25 p-3 rounded-xl border border-rose-500/5">
          <Sparkles className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Acknowledge schedules promptly. A 100% checklist consistency is recommended for fast recovery.</span>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationPanel;
