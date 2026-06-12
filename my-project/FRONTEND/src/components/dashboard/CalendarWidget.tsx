import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Bell, Heart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  category: 'Medicine' | 'Appointment' | 'Activity';
  detail: string;
}

export const CalendarWidget: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(12); // defaults to June 12th (today)

  const schedule: Record<number, CalendarEvent[]> = {
    11: [
      { id: '1', title: 'Dashamula Decocation', time: '07:00 AM', category: 'Medicine', detail: 'Empty stomach' },
      { id: '2', title: 'Triphala Churna tablet', time: '08:30 PM', category: 'Medicine', detail: 'Warm milk after dinner' }
    ],
    12: [
      { id: '3', title: 'Dashamula Decocation', time: '07:00 AM', category: 'Medicine', detail: 'Empty stomach' },
      { id: '4', title: 'Morning Pranayama Yoga', time: '08:30 AM', category: 'Activity', detail: 'Nadi Shodhana (15 mins)' },
      { id: '5', title: 'Dr. Vikram Chauhan Consultation', time: '10:30 AM', category: 'Appointment', detail: 'AyuCare Clinic, New Delhi' },
      { id: '6', title: 'Triphala Churna tablet', time: '08:30 PM', category: 'Medicine', detail: 'Warm milk after dinner' }
    ],
    13: [
      { id: '7', title: 'Dashamula Decocation', time: '07:00 AM', category: 'Medicine', detail: 'Empty stomach' },
      { id: '8', title: 'Self-Abhyanga body massage', time: '08:00 AM', category: 'Activity', detail: 'Warm coconut oil before shower' },
      { id: '9', title: 'Triphala Churna tablet', time: '08:30 PM', category: 'Medicine', detail: 'Warm milk after dinner' }
    ],
    14: [
      { id: '10', title: 'Dashamula Decocation', time: '07:00 AM', category: 'Medicine', detail: 'Empty stomach' },
      { id: '11', title: 'Triphala Churna tablet', time: '08:30 PM', category: 'Medicine', detail: 'Warm milk after dinner' }
    ],
    15: [
      { id: '12', title: 'Dashamula Decocation', time: '07:00 AM', category: 'Medicine', detail: 'Empty stomach' },
      { id: '13', title: 'Follow-up consultation booking', time: '12:00 PM', category: 'Appointment', detail: 'Standard diagnostic review' },
      { id: '14', title: 'Triphala Churna tablet', time: '08:30 PM', category: 'Medicine', detail: 'Warm milk after dinner' }
    ]
  };

  const currentEvents = schedule[selectedDay] || [];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Medicine':
        return 'from-amber-500/10 to-amber-600/10 text-amber-700 border-amber-500/20';
      case 'Appointment':
        return 'from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-500/20';
      default:
        return 'from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-500/20';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Medicine':
        return Bell;
      case 'Appointment':
        return CalendarIcon;
      default:
        return Activity;
    }
  };

  // Calendar Days representation (June 2026 slice)
  const calendarDays = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <CalendarIcon className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">interactive tracker</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Dina-Charya (Wellness Calendar)</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left Column: Calendar Days Slide (1/3 width) */}
        <div className="lg:col-span-1 bg-[#FAF9F6] border border-primary/5 rounded-2xl p-4 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-primary text-[9.5px] font-black uppercase tracking-wider block font-sans">June 2026</span>
            <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
              {calendarDays.map((day) => {
                const isSelected = selectedDay === day;
                const hasEvents = !!schedule[day];
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`py-2 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative ${
                      isSelected
                        ? 'bg-primary border-primary text-white scale-103 shadow-md'
                        : 'bg-white border-primary/5 hover:border-primary/20 text-text-primary'
                    }`}
                  >
                    <span className="block text-[8px] uppercase opacity-60">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'][(day - 8) % 7]}
                    </span>
                    <strong className="block text-xs font-black mt-0.5">{day}</strong>
                    {hasEvents && !isSelected && (
                      <span className="absolute bottom-1 w-1 h-1 bg-accent rounded-full animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-primary/10 rounded-xl p-3.5 flex items-start space-x-2 text-[9.5px] text-text-secondary leading-normal font-semibold">
            <Heart className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-primary block">Daily Rituals (Dina-Charya)</span>
              <span>Following daily herb and sleep routines helps pacify Pitta hormone fire.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Events Timelines (2/3 width) */}
        <div className="lg:col-span-2 space-y-3.5 max-h-56 overflow-y-auto pr-1">
          {currentEvents.length === 0 ? (
            <div className="text-center py-12 text-xs text-text-secondary font-medium">
              No daily wellness tasks logged for this day.
            </div>
          ) : (
            currentEvents.map((event) => {
              const IconComp = getCategoryIcon(event.category);
              return (
                <div
                  key={event.id}
                  className="bg-[#FAF9F6] border border-primary/5 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getCategoryColor(event.category)} flex items-center justify-center border shadow-inner shrink-0`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-xs text-text-primary truncate">
                        {event.title}
                      </h4>
                      <p className="text-[9.5px] text-text-secondary font-semibold">
                        {event.detail}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 px-2.5 py-1 rounded-lg flex items-center space-x-1 text-[9.5px] font-bold text-text-secondary shrink-0">
                    <Clock className="w-3 h-3 text-accent shrink-0" />
                    <span>{event.time}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default CalendarWidget;
