import React, { useState } from 'react';
import { X, Calendar, Clock, ShieldCheck, Sparkles, Check, Video, Building, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from '../../types';

interface ClinicBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinicName: string;
  selectedPackage?: Package | null;
}

export const ClinicBookingModal: React.FC<ClinicBookingModalProps> = ({
  isOpen,
  onClose,
  clinicName,
  selectedPackage = null
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: (() => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    })(),
    timeSlot: '10:00 AM',
    format: 'Clinic Visit',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<any | null>(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API request timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedAppt({
        id: `APT-${Math.floor(Math.random() * 90000 + 10000)}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        timeSlot: formData.timeSlot,
        format: formData.format,
        notes: formData.notes,
        package: selectedPackage
      });
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: (() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
      })(),
      timeSlot: '10:00 AM',
      format: 'Clinic Visit',
      notes: ''
    });
    setConfirmedAppt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/45 backdrop-blur-md flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!confirmedAppt ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/10 flex flex-col relative"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 bg-primary/5 hover:bg-primary/10 p-2.5 rounded-full text-primary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="p-6 md:p-8 bg-gradient-to-b from-[#F8FFF8] to-white border-b border-emerald-800/5">
              <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span>Reserve Appointment</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-black text-text-primary">
                {selectedPackage ? 'Book Panchakarma Program' : 'Schedule Consultation'}
              </h3>
              <p className="text-[11px] text-text-secondary font-medium mt-1 leading-normal">
                {selectedPackage 
                  ? `Package: ${selectedPackage.name} @ ${clinicName}`
                  : `Consultation Visit @ ${clinicName}`
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
              {selectedPackage && (
                <div className="bg-[#F8FFF8] border border-primary/10 p-4 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[8.5px] uppercase font-bold text-text-secondary block">Selected Program</span>
                    <strong className="text-primary text-[13px]">{selectedPackage.name}</strong>
                    <span className="text-text-secondary block font-semibold text-[10px] mt-0.5">{selectedPackage.duration} Program</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[8.5px] uppercase font-bold text-text-secondary block">Total Program Fee</span>
                    <strong className="text-primary text-base flex items-center justify-end">
                      <IndianRupee className="w-3.5 h-3.5 text-accent" />
                      {selectedPackage.price}
                    </strong>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors"
                  />
                </div>

                {/* Format */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Consultation Format</label>
                  <select
                    value={formData.format}
                    onChange={e => setFormData({ ...formData, format: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Clinic Visit">🏢 In-Clinic Visit</option>
                    <option value="Online Video">📹 Telehealth Video Consultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Preferred Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                {/* Time slot */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Timings Slot *</label>
                  <select
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-text-secondary block">Symptoms & Health Concerns (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your health goals or list any existing medical conditions..."
                  rows={2}
                  className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-light disabled:bg-primary/50 text-white font-bold text-xs py-3.5 rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Verifying Schedule...</span>
                  </>
                ) : (
                  <span>Request Booking Confirmation</span>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#F8FFF8] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/60 flex flex-col relative"
          >
            {/* Close */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 bg-primary/5 hover:bg-primary/10 p-2.5 rounded-full text-primary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 md:p-8 text-center space-y-6">
              {/* Success badge */}
              <div className="w-16 h-16 bg-[#2E7D32]/10 border border-primary/25 rounded-full flex items-center justify-center mx-auto text-[#2E7D32] relative">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <Sparkles className="absolute -top-1.5 -right-1.5 w-5 h-5 text-accent animate-pulse" />
              </div>

              {/* Titles */}
              <div className="space-y-1">
                <h3 className="font-serif text-xl md:text-2xl font-black text-primary">Booking Confirmed!</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent bg-[#2E7D32]/5 border border-primary/15 px-3 py-1 rounded-full inline-block mt-1">
                  REF ID: {confirmedAppt.id}
                </span>
              </div>

              {/* Receipt */}
              <div className="bg-white border border-[#2E7D32]/5 p-5 rounded-2xl text-left space-y-3.5 shadow-sm text-xs text-text-primary">
                <div>
                  <span className="block text-[8.5px] uppercase font-bold text-text-secondary">Selected Center</span>
                  <strong className="text-primary">{clinicName}</strong>
                </div>

                {confirmedAppt.package && (
                  <div>
                    <span className="block text-[8.5px] uppercase font-bold text-text-secondary">Panchakarma Program</span>
                    <strong className="text-primary">{confirmedAppt.package.name}</strong>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[8.5px] uppercase font-bold text-text-secondary">Scheduled Date</span>
                    <strong>{new Date(confirmedAppt.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                  </div>
                  <div>
                    <span className="block text-[8.5px] uppercase font-bold text-text-secondary">Reserved Slot</span>
                    <strong>{confirmedAppt.timeSlot}</strong>
                  </div>
                </div>

                <div>
                  <span className="block text-[8.5px] uppercase font-bold text-text-secondary">Consultation Format</span>
                  <strong className="flex items-center space-x-1.5 mt-0.5">
                    {confirmedAppt.format === 'Online Video' ? (
                      <>
                        <Video className="w-4 h-4 text-primary shrink-0" />
                        <span>Online Video Consultation</span>
                      </>
                    ) : (
                      <>
                        <Building className="w-4 h-4 text-primary shrink-0" />
                        <span>In-Person Campus Session</span>
                      </>
                    )}
                  </strong>
                </div>
              </div>

              <p className="text-[10px] text-text-secondary leading-relaxed max-w-[280px] mx-auto font-medium">
                A confirmation has been sent to <strong>{confirmedAppt.email}</strong>. Our care coordinator will call you shortly on <strong>{confirmedAppt.phone}</strong>.
              </p>

              <button
                onClick={handleReset}
                className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-colors uppercase tracking-wider cursor-pointer"
              >
                Return to Profile
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClinicBookingModal;
