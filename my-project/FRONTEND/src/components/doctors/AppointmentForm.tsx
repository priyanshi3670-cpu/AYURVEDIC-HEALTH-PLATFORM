import React, { useState } from 'react';
import { User, Mail, Phone, Heart, FileText, ArrowRight, RotateCcw } from 'lucide-react';
import { ConsultationType } from '../../types';

interface AppointmentFormProps {
  doctorOnline: boolean;
  doctorOffline: boolean;
  selectedDate: string;
  selectedTime: string | null;
  onSubmit: (formData: {
    patientName: string;
    email: string;
    phone: string;
    consultationType: ConsultationType;
    healthConcern: string;
    notes: string;
  }) => void;
  isSubmitting: boolean;
  serverError: string | null;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctorOnline,
  doctorOffline,
  selectedDate,
  selectedTime,
  onSubmit,
  isSubmitting,
  serverError
}) => {
  // Field states
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [consultType, setConsultType] = useState<ConsultationType>(
    doctorOnline ? 'Online Video' : 'Clinic Visit'
  );
  const [healthConcern, setHealthConcern] = useState('');
  const [notes, setNotes] = useState('');

  // Local validation states
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!patientName.trim()) {
      tempErrors.name = 'Patient name is required';
    } else if (patientName.trim().length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(phone.replace(/[\s-()]/g, ''))) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!consultType) {
      tempErrors.consultType = 'Please select a consultation mode';
    }

    if (!healthConcern.trim()) {
      tempErrors.healthConcern = 'Please describe your main health concern';
    }

    // Check parent inputs
    if (!selectedDate) {
      tempErrors.date = 'Please select an appointment date from the calendar';
    }
    if (!selectedTime) {
      tempErrors.time = 'Please select a time slot';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        patientName,
        email,
        phone,
        consultationType: consultType,
        healthConcern,
        notes
      });
    }
  };

  const handleReset = () => {
    setPatientName('');
    setEmail('');
    setPhone('');
    setHealthConcern('');
    setNotes('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Consultation Mode Tab Buttons */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Consultation Mode</label>
        <div className="grid grid-cols-3 gap-2">
          {doctorOnline && (
            <button
              type="button"
              onClick={() => setConsultType('Online Video')}
              className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                consultType === 'Online Video'
                  ? 'bg-primary border-primary text-white shadow-sm shadow-primary/10'
                  : 'bg-[#FAF9F6] border-[#2E7D32]/10 text-text-secondary hover:bg-white'
              }`}
            >
              <span>Online Video</span>
            </button>
          )}

          {doctorOffline && (
            <button
              type="button"
              onClick={() => setConsultType('Clinic Visit')}
              className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                consultType === 'Clinic Visit'
                  ? 'bg-primary border-primary text-white shadow-sm shadow-primary/10'
                  : 'bg-[#FAF9F6] border-[#2E7D32]/10 text-text-secondary hover:bg-white'
              }`}
            >
              <span>Clinic Visit</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setConsultType('Chat Connect')}
            className={`py-2.5 px-3 rounded-xl border text-[10px] font-bold flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
              consultType === 'Chat Connect'
                ? 'bg-primary border-primary text-white shadow-sm shadow-primary/10'
                : 'bg-[#FAF9F6] border-[#2E7D32]/10 text-text-secondary hover:bg-white'
            }`}
          >
            <span>Chat Connect</span>
          </button>
        </div>
        {errors.consultType && <p className="text-[9px] text-red-500 font-bold">{errors.consultType}</p>}
      </div>

      {/* Patient Name */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Patient Name</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E7D32]/60" />
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="John Doe"
            className={`w-full bg-[#FAF9F6] border rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:bg-white focus:border-primary transition-all ${
              errors.name ? 'border-red-400 focus:border-red-500' : 'border-[#2E7D32]/10'
            }`}
          />
        </div>
        {errors.name && <p className="text-[9px] text-red-500 font-bold">{errors.name}</p>}
      </div>

      {/* Contact Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-text-secondary block">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E7D32]/60" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={`w-full bg-[#FAF9F6] border rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:bg-white focus:border-primary transition-all ${
                errors.email ? 'border-red-400 focus:border-red-500' : 'border-[#2E7D32]/10'
              }`}
            />
          </div>
          {errors.email && <p className="text-[9px] text-red-500 font-bold">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-text-secondary block">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E7D32]/60" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className={`w-full bg-[#FAF9F6] border rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:bg-white focus:border-primary transition-all ${
                errors.phone ? 'border-red-400 focus:border-red-500' : 'border-[#2E7D32]/10'
              }`}
            />
          </div>
          {errors.phone && <p className="text-[9px] text-red-500 font-bold">{errors.phone}</p>}
        </div>
      </div>

      {/* Health Concern */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Primary Health Concern</label>
        <div className="relative">
          <Heart className="absolute left-3.5 top-3.5 w-4 h-4 text-[#2E7D32]/60" />
          <textarea
            value={healthConcern}
            onChange={(e) => setHealthConcern(e.target.value)}
            placeholder="Describe your symptoms (e.g. chronic acidity, joint stiffness, bloating)"
            rows={2.5}
            className={`w-full bg-[#FAF9F6] border rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:bg-white focus:border-primary resize-none transition-all ${
              errors.healthConcern ? 'border-red-400 focus:border-red-500' : 'border-[#2E7D32]/10'
            }`}
          />
        </div>
        {errors.healthConcern && <p className="text-[9px] text-red-500 font-bold">{errors.healthConcern}</p>}
      </div>

      {/* Additional Notes */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase font-bold text-text-secondary block">Additional Notes (Optional)</label>
        <div className="relative">
          <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#2E7D32]/60" />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any past histories, family treatments or medication details..."
            rows={2}
            className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:bg-white focus:border-primary resize-none transition-all"
          />
        </div>
      </div>

      {/* Parent Date/Time Checks */}
      {(errors.date || errors.time) && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-[10px] font-bold space-y-1">
          {errors.date && <p>• {errors.date}</p>}
          {errors.time && <p>• {errors.time}</p>}
        </div>
      )}

      {serverError && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-[10px] font-bold">
          {serverError}
        </div>
      )}

      {/* Button controls */}
      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center space-x-1.5 border border-gray-200 hover:bg-gray-50 text-text-secondary font-bold text-xs py-3.5 px-4 rounded-xl transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-grow bg-primary hover:bg-primary-light disabled:bg-primary/50 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
