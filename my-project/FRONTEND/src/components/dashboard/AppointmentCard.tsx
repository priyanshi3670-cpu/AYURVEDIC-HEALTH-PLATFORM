import React, { useState } from 'react';
import { Calendar, Clock, MapPin, AlertCircle, RefreshCw, XCircle } from 'lucide-react';
import { PatientDashboardAppointment } from '../../types';
import { motion } from 'framer-motion';

interface AppointmentCardProps {
  appointment: PatientDashboardAppointment;
  onReschedule: (id: string, newDate: string, newTime: string) => void;
  onCancel: (id: string) => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onReschedule,
  onCancel
}) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState(appointment.date);
  const [newTime, setNewTime] = useState(appointment.time);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-700 border-red-500/20';
      default:
        return 'bg-gray-50 text-text-secondary border-gray-100';
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReschedule(appointment.id, newDate, newTime);
    setShowReschedule(false);
  };

  const isActionable = appointment.status !== 'Completed' && appointment.status !== 'Cancelled';

  return (
    <motion.div
      layout
      className="bg-white border border-[#2E7D32]/10 rounded-2xl p-5 flex flex-col justify-between shadow-sm space-y-4 hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-50">
        <div className="space-y-1">
          <span className={`text-[8.5px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md border inline-block ${getStatusStyle(appointment.status)}`}>
            {appointment.status}
          </span>
          <h4 className="font-serif font-black text-sm text-text-primary">
            {appointment.doctorName}
          </h4>
          <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-wide">
            {appointment.specialization}
          </p>
        </div>

        {/* Date / Time */}
        <div className="flex flex-wrap gap-2 text-[10.5px] font-bold text-text-secondary shrink-0">
          <div className="bg-[#FAF9F6] border border-primary/5 px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="bg-[#FAF9F6] border border-primary/5 px-2.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>{appointment.time}</span>
          </div>
        </div>
      </div>

      {/* Clinic address */}
      <div className="flex items-start space-x-1.5 text-[11px] text-text-secondary font-semibold">
        <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <span className="leading-tight">{appointment.clinic}</span>
      </div>

      {/* Dynamic Actions panel */}
      {isActionable && (
        <div className="space-y-3 pt-2">
          {!showReschedule ? (
            <div className="flex gap-2.5">
              <button
                onClick={() => setShowReschedule(true)}
                className="flex-grow bg-[#FAF9F6] hover:bg-primary/5 text-primary border border-primary/10 hover:border-primary/20 font-bold text-[10px] py-2 px-3 rounded-xl uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 text-accent animate-spin-slow" />
                <span>Reschedule Visit</span>
              </button>
              <button
                onClick={() => onCancel(appointment.id)}
                className="flex-grow border border-red-100 hover:bg-red-50 text-red-600 font-bold text-[10px] py-2 px-3 rounded-xl uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <XCircle className="w-3 h-3 text-red-400" />
                <span>Cancel Visit</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleRescheduleSubmit} className="bg-[#FAF9F6] border border-primary/10 p-4 rounded-xl space-y-3.5">
              <div className="flex items-center space-x-1 text-primary font-bold text-[10px] uppercase tracking-wide">
                <AlertCircle className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Select New Schedule</span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[8px] uppercase font-bold text-text-secondary block">Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-white border border-gray-150 rounded-lg px-2.5 py-1.5 text-[10.5px] font-bold outline-none text-text-primary cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] uppercase font-bold text-text-secondary block">Time Slot</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-white border border-gray-150 rounded-lg px-2 py-1.5 text-[10.5px] font-bold outline-none text-text-primary cursor-pointer"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowReschedule(false)}
                  className="bg-white border border-gray-150 hover:bg-gray-50 text-text-secondary font-bold text-[9px] py-1.5 px-3 rounded-lg uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white font-bold text-[9px] py-1.5 px-3.5 rounded-lg uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AppointmentCard;
