import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface AppointmentCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ selectedDate, onDateChange }) => {
  // Generate next 10 days starting from tomorrow
  const dates = React.useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 1; i <= 10; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const dayStr = String(d.getDate()).padStart(2, '0');
      const isoDate = `${year}-${month}-${dayStr}`;

      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();

      list.push({
        isoDate,
        dayName,
        monthName,
        dayNum
      });
    }
    return list;
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-[10px] uppercase font-bold text-text-secondary flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-accent" />
          <span>Select Consult Date</span>
        </label>
        <span className="text-[10px] font-bold text-[#2E7D32]">
          Selected: {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Horizontal Date Picker */}
      <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/10">
        {dates.map((item) => {
          const isSelected = item.isoDate === selectedDate;
          return (
            <button
              key={item.isoDate}
              type="button"
              onClick={() => onDateChange(item.isoDate)}
              className={`flex flex-col items-center justify-between p-3 rounded-2xl min-w-[70px] border transition-all duration-300 ${
                isSelected
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/15 scale-102'
                  : 'bg-[#FAF9F6] border-[#2E7D32]/10 hover:border-primary/30 text-text-secondary hover:bg-white'
              }`}
            >
              <span className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-white/80' : 'text-text-secondary/80'}`}>
                {item.dayName}
              </span>
              <span className="text-lg font-black leading-none my-1">{item.dayNum}</span>
              <span className={`text-[9px] font-semibold ${isSelected ? 'text-white/90' : 'text-primary'}`}>
                {item.monthName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
