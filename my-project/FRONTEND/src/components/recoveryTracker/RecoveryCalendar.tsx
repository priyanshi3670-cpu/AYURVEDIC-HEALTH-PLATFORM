import React, { useState } from 'react';
import { Calendar, Clock, Bell, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  category: 'Appointment' | 'Medication' | 'Therapy' | 'Milestone';
  details: string;
}

export const RecoveryCalendar: React.FC = () => {
  const [activeDay, setActiveDay] = useState(12); // defaults to June 12th

  const events: Record<number, ScheduleEvent[]> = {
    12: [
      { id: 'ev-1', title: 'Rasnasaptak Kwath Intake', time: '07:00 AM', category: 'Medication', details: '30 ml on empty stomach' },
      { id: 'ev-2', title: 'Knee Joint Lubrication (Janu Basti)', time: '10:00 AM', category: 'Therapy', details: 'AyuCare Clinic therapy room 4' },
      { id: 'ev-3', title: 'Dr. Vikram Chauhan Review', time: '11:00 AM', category: 'Appointment', details: 'Standard diagnostic pulse evaluation' },
      { id: 'ev-4', title: 'Yogaraj Guggulu Tablet', time: '08:30 PM', category: 'Medication', details: '2 tablets after light dinner' }
    ],
    13: [
      { id: 'ev-5', title: 'Rasnasaptak Kwath Intake', time: '07:00 AM', category: 'Medication', details: '30 ml on empty stomach' },
      { id: 'ev-6', title: 'Gentle Joint rotations (Prasarana)', time: '08:30 AM', category: 'Therapy', details: 'Self-guided yoga room' },
      { id: 'ev-7', title: 'Yogaraj Guggulu Tablet', time: '08:30 PM', category: 'Medication', details: '2 tablets after light dinner' }
    ],
    14: [
      { id: 'ev-8', title: 'Rasnasaptak Kwath Intake', time: '07:00 AM', category: 'Medication', details: '30 ml on empty stomach' },
      { id: 'ev-9', title: 'Yogaraj Guggulu Tablet', time: '08:30 PM', category: 'Medication', details: '2 tablets after light dinner' }
    ],
    15: [
      { id: 'ev-10', title: 'Rasnasaptak Kwath Intake', time: '07:00 AM', category: 'Medication', details: '30 ml on empty stomach' },
      { id: 'ev-11', title: 'Post-Detox Rejuvenation Phase', time: '09:00 AM', category: 'Milestone', details: 'Transitioning to Rasayana stage' },
      { id: 'ev-12', title: 'Yogaraj Guggulu Tablet', time: '08:30 PM', category: 'Medication', details: '2 tablets after light dinner' }
    ]
  };

  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'Medication': return 'from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-500/20';
      case 'Therapy': return 'from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-500/20';
      case 'Appointment': return 'from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-500/20';
      default: return 'from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-500/20';
    }
  };

  const dayEvents = events[activeDay] || [];
  const days = [11, 12, 13, 14, 15, 16];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Calendar className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Dina-Charya calendar</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Recovery Schedule</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Days Slider */}
        <div className="lg:col-span-1 bg-[#FAF9F6] border border-primary/5 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-primary text-[9px] font-black uppercase tracking-wider block font-sans">June 2026</span>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
              {days.map((day) => {
                const isSelected = activeDay === day;
                const hasEvents = !!events[day];
                return (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`py-2.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-primary border-primary text-white scale-103 shadow-md'
                        : 'bg-white border-primary/5 hover:border-primary/20 text-text-primary'
                    }`}
                  >
                    <span className="block text-[8px] uppercase opacity-65">
                      {['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'][(day - 11) % 6]}
                    </span>
                    <strong className="block text-xs font-black mt-0.5">{day}</strong>
                    {hasEvents && !isSelected && (
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-primary/10 rounded-xl p-3.5 flex items-start space-x-2 text-[9.5px] text-text-secondary leading-normal font-semibold">
            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Daily Rhythm</span>
              <span>Syncing meals and herb intake with solar cycles optimizes assimilation.</span>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <div className="lg:col-span-2 space-y-3 max-h-56 overflow-y-auto pr-1">
          {dayEvents.length === 0 ? (
            <div className="text-center py-12 text-xs text-text-secondary font-medium">
              No tasks scheduled for this day.
            </div>
          ) : (
            dayEvents.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#FAF9F6] border border-primary/5 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getCategoryStyle(ev.category)} flex items-center justify-center border shadow-inner shrink-0`}>
                    {ev.category === 'Medication' ? <Bell className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[7.5px] uppercase font-black text-accent tracking-wider block">
                      {ev.category}
                    </span>
                    <h4 className="font-serif font-black text-text-primary text-xs truncate">
                      {ev.title}
                    </h4>
                    <p className="text-[9.5px] text-text-secondary font-semibold">
                      {ev.details}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-105 px-2.5 py-1.5 rounded-lg flex items-center space-x-1 text-[9.5px] font-bold text-text-secondary shrink-0">
                  <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{ev.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RecoveryCalendar;
