import React from 'react';
import AppointmentCalendar from './AppointmentCalendar';
import TimeSlotPicker from './TimeSlotPicker';
import AppointmentForm from './AppointmentForm';
import { Doctor, ConsultationType } from '../../types';

interface DoctorAvailabilityProps {
  doctor: Doctor;
  selectedDate: string;
  onDateChange: (date: string) => void;
  slots: string[];
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
  loadingSlots: boolean;
  onBookSubmit: (formData: {
    patientName: string;
    email: string;
    phone: string;
    consultationType: ConsultationType;
    healthConcern: string;
    notes: string;
  }) => void;
  isSubmitting: boolean;
  errorMsg: string | null;
}

export const DoctorAvailability: React.FC<DoctorAvailabilityProps> = ({
  doctor,
  selectedDate,
  onDateChange,
  slots,
  selectedSlot,
  onSlotSelect,
  loadingSlots,
  onBookSubmit,
  isSubmitting,
  errorMsg
}) => {
  return (
    <div id="booking-widget" className="bg-white border border-[#2E7D32]/10 p-6 rounded-3xl shadow-xl space-y-6">
      <div>
        <h3 className="font-serif text-lg font-bold text-primary">Schedule Consultation</h3>
        <p className="text-[10px] text-text-secondary mt-0.5">Secure slots for online video or clinic sessions.</p>
      </div>

      {/* Date Picker */}
      <div className="pt-2 border-t border-gray-50">
        <AppointmentCalendar
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />
      </div>

      {/* Time Slot Picker */}
      <div className="pt-4 border-t border-gray-100">
        <TimeSlotPicker
          slots={slots}
          selectedSlot={selectedSlot}
          onSlotSelect={onSlotSelect}
          loading={loadingSlots}
        />
      </div>

      {/* Patient Form */}
      <div className="pt-4 border-t border-gray-100">
        <AppointmentForm
          doctorOnline={doctor.onlineConsultation}
          doctorOffline={doctor.offlineConsultation}
          selectedDate={selectedDate}
          selectedTime={selectedSlot}
          onSubmit={onBookSubmit}
          isSubmitting={isSubmitting}
          serverError={errorMsg}
        />
      </div>
    </div>
  );
};

export default DoctorAvailability;
