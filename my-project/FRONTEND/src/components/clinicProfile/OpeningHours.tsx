import React from 'react';
import { Clock } from 'lucide-react';
import { OpeningHour } from '../../types';

interface OpeningHoursProps {
  schedule: OpeningHour[];
}

export const OpeningHours: React.FC<OpeningHoursProps> = ({ schedule }) => {
  const defaultSchedule: OpeningHour[] = [
    { day: 'Monday', hours: '08:00 AM - 07:00 PM', closed: false },
    { day: 'Tuesday', hours: '08:00 AM - 07:00 PM', closed: false },
    { day: 'Wednesday', hours: '08:00 AM - 07:00 PM', closed: false },
    { day: 'Thursday', hours: '08:00 AM - 07:00 PM', closed: false },
    { day: 'Friday', hours: '08:00 AM - 07:00 PM', closed: false },
    { day: 'Saturday', hours: '09:00 AM - 05:00 PM', closed: false },
    { day: 'Sunday', hours: 'Closed', closed: true }
  ];

  const list = schedule && schedule.length > 0 ? schedule : defaultSchedule;

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider">
        <Clock className="w-4 h-4 text-accent" />
        <span>Opening Hours</span>
      </div>

      <div className="space-y-2 text-xs font-semibold text-text-secondary">
        {list.map((item, index) => (
          <div 
            key={index}
            className={`flex justify-between py-1.5 border-b border-gray-50 last:border-0 ${
              item.closed ? 'text-red-500/80 font-bold' : ''
            }`}
          >
            <span>{item.day}</span>
            <span>{item.hours}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpeningHours;
