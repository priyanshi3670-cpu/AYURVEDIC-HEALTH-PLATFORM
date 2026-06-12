import React from 'react';

const CalendarWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">June 2026</h3>
        <div className="flex gap-2">
          <button className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">←</button>
          <button className="p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">→</button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500 mb-2">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {/* Empty slots for start of month */}
        <div className="p-2 text-gray-300">31</div>
        
        {/* Days */}
        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          const isToday = day === 12;
          const hasAppt = [5, 10, 12, 15, 20, 22].includes(day);
          
          return (
            <div 
              key={i} 
              className={`p-2 rounded-lg relative cursor-pointer hover:bg-gray-50 transition-colors ${
                isToday ? 'bg-primary text-white font-bold hover:bg-primary' : 'text-gray-700'
              }`}
            >
              {day}
              {hasAppt && !isToday && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
