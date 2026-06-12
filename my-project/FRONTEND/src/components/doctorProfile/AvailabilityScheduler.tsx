import React, { useState } from 'react';
import { FiClock, FiSave } from 'react-icons/fi';
import { DoctorAvailability } from '../../types';

interface AvailabilitySchedulerProps {
  availability: DoctorAvailability[];
  onSave: (data: DoctorAvailability[]) => void;
  isSaving: boolean;
}

const AvailabilityScheduler: React.FC<AvailabilitySchedulerProps> = ({ availability, onSave, isSaving }) => {
  const [localAvail, setLocalAvail] = useState<DoctorAvailability[]>(availability);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleUpdate = (day: string, field: string, value: any) => {
    setLocalAvail(prev => prev.map(a => 
      a.day === day ? { ...a, [field]: value } : a
    ));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-gray-900">Weekly Availability Scheduler</h3>
          <p className="text-sm text-gray-500">Set your standard working hours for consultations.</p>
        </div>
        <button 
          onClick={() => onSave(localAvail)}
          disabled={isSaving}
          className="px-4 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70 text-sm"
        >
          {isSaving ? 'Saving...' : <><FiSave /> Save Schedule</>}
        </button>
      </div>

      <div className="space-y-4">
        {daysOfWeek.map(day => {
          const schedule = localAvail.find(a => a.day === day);
          if (!schedule) return null;

          const isAvailable = schedule.status === 'Available';

          return (
            <div key={day} className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border ${isAvailable ? 'border-primary/20 bg-primary/5' : 'border-gray-100 bg-gray-50'}`}>
              
              <div className="w-full md:w-40 flex items-center justify-between md:justify-start gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isAvailable}
                    onChange={(e) => handleUpdate(day, 'status', e.target.checked ? 'Available' : 'Unavailable')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <span className={`font-medium ${isAvailable ? 'text-primary' : 'text-gray-500'}`}>{day}</span>
              </div>

              {isAvailable ? (
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <FiClock className="text-gray-400" />
                    <input 
                      type="time" 
                      value={schedule.startTime}
                      onChange={(e) => handleUpdate(day, 'startTime', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full"
                    />
                    <span>-</span>
                    <input 
                      type="time" 
                      value={schedule.endTime}
                      onChange={(e) => handleUpdate(day, 'endTime', e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-full"
                    />
                  </div>
                  
                  <select 
                    value={schedule.consultationMode}
                    onChange={(e) => handleUpdate(day, 'consultationMode', e.target.value)}
                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option value="Both">In-Clinic & Online</option>
                    <option value="In-Clinic">In-Clinic Only</option>
                    <option value="Online">Online Only</option>
                  </select>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 whitespace-nowrap">Slot:</span>
                    <select 
                      value={schedule.slotDuration}
                      onChange={(e) => handleUpdate(day, 'slotDuration', parseInt(e.target.value))}
                      className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-full"
                    >
                      <option value={15}>15 mins</option>
                      <option value={20}>20 mins</option>
                      <option value={30}>30 mins</option>
                      <option value={45}>45 mins</option>
                      <option value={60}>60 mins</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex-1 w-full text-sm text-gray-400 italic">
                  Not available for consultations on this day.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityScheduler;
