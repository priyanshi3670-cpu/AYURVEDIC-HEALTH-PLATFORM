import React from 'react';
import { ShieldCheck, Video, Building, X, Sparkles } from 'lucide-react';
import { Appointment } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  doctorName: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, appointment, doctorName }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F8FFF8] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/60 flex flex-col relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-primary/5 hover:bg-primary/10 p-2 rounded-full text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8 text-center space-y-6">
          {/* Animated Badge Icon */}
          <div className="w-16 h-16 bg-[#2E7D32]/10 border-2 border-primary/20 rounded-full flex items-center justify-center mx-auto text-[#2E7D32] relative">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <Sparkles className="absolute -top-1.5 -right-1.5 w-5 h-5 text-accent animate-pulse" />
          </div>

          {/* Success Title */}
          <div className="space-y-1">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Appointment Confirmed!</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-[#2E7D32]/5 border border-primary/15 px-3 py-1 rounded-full inline-block mt-1">
              REF ID: {appointment.id}
            </span>
          </div>

          {/* Booking Info Card */}
          <div className="bg-white border border-[#2E7D32]/5 p-5 rounded-2xl text-left space-y-3.5 shadow-sm text-xs text-text-primary">
            <div>
              <span className="block text-[9px] uppercase font-bold text-text-secondary">Consulting Physician</span>
              <strong className="text-primary">{doctorName}</strong>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[9px] uppercase font-bold text-text-secondary">Scheduled Date</span>
                <strong>{new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold text-text-secondary">Time Slot</span>
                <strong>{appointment.appointmentTime}</strong>
              </div>
            </div>

            <div>
              <span className="block text-[9px] uppercase font-bold text-text-secondary">Consultation Format</span>
              <strong className="flex items-center space-x-1.5 mt-0.5">
                {appointment.consultationType === 'Online Video' ? (
                  <>
                    <Video className="w-4 h-4 text-primary shrink-0" />
                    <span>Online Video Session (Google Meet)</span>
                  </>
                ) : appointment.consultationType === 'Clinic Visit' ? (
                  <>
                    <Building className="w-4 h-4 text-primary shrink-0" />
                    <span>In-Clinic Doctor Consultation</span>
                  </>
                ) : (
                  <>
                    <span className="text-accent text-[14px]">💬</span>
                    <span>Direct Chat Connect</span>
                  </>
                )}
              </strong>
            </div>
          </div>

          {/* Patient Details Confirmation */}
          <p className="text-[10px] text-text-secondary leading-relaxed max-w-[280px] mx-auto">
            A confirmation receipt and calendar invite has been dispatched to <strong>{appointment.email}</strong>.
          </p>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-colors uppercase tracking-wider"
          >
            Go back to profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
