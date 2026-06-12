import React from 'react';
import { FiClock, FiVideo, FiMapPin, FiMoreVertical } from 'react-icons/fi';
import { DoctorAppointmentModel } from '../../types';

interface AppointmentCardProps {
  appointment: DoctorAppointmentModel;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:border-primary/30 hover:shadow-sm transition-all group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            {appointment.patientName.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 leading-tight">{appointment.patientName}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{appointment.condition || 'General Checkup'}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreVertical />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded-lg">
          <FiClock className="text-gray-400" />
          {appointment.time}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-2 py-1.5 rounded-lg">
          {appointment.consultationType === 'Online' ? (
             <><FiVideo className="text-blue-400" /> Online</>
          ) : (
             <><FiMapPin className="text-green-400" /> In-Clinic</>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-colors">
          Start
        </button>
        <button className="flex-1 py-1.5 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors">
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
