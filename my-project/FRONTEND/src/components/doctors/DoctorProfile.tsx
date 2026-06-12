import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Briefcase, Award, Clock, Languages, ShieldCheck, Calendar, ArrowRight, User, Mail, Phone, Video, Building } from 'lucide-react';
import { Doctor, Review } from '../../services/doctorApi';
import { appointmentApi } from '../../services/appointmentApi';
import DoctorReviews from './DoctorReviews';

interface DoctorProfileProps {
  doctor: Doctor;
  onClose: () => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctor, onClose }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  // Form Booking States
  const [consultType, setConsultType] = useState<'Online Video' | 'Clinic Visit'>('Online Video');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Form inputs
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  
  const [isBooking, setIsBooking] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Load reviews
    const fetchReviews = async () => {
      setLoadingReviews(true);
      try {
        const revs = await appointmentApi.getDoctorReviews(doctor.id);
        setReviews(revs);
      } catch (err) {
        console.error("Error loading reviews", err);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();

    // Default consultation mode matching doctor settings
    if (!doctor.onlineConsultation && doctor.offlineConsultation) {
      setConsultType('Clinic Visit');
    }
  }, [doctor]);

  useEffect(() => {
    if (!bookingDate) return;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSelectedSlot(null);
      try {
        const slots = await appointmentApi.getAvailableSlots(doctor.id, bookingDate);
        setAvailableSlots(slots);
      } catch (err) {
        console.error("Error fetching slots", err);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [doctor.id, bookingDate, consultType]);

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedSlot) {
      setErrorMsg('Please select a time slot for your appointment.');
      return;
    }

    setIsBooking(true);
    try {
      const payload = {
        doctorId: doctor.id,
        patientName,
        email: patientEmail,
        phone: patientPhone,
        appointmentDate: bookingDate,
        appointmentTime: selectedSlot,
        consultationType: consultType,
        notes: ''
      };
      const res = await appointmentApi.bookAppointment(payload);
      if (res.success) {
        setConfirmedBooking(res.data);
      } else {
        setErrorMsg('Booking failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Check your connection.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-primary/45 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F8FFF8] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/60 flex flex-col max-h-[90vh] animate-fade-in-up">
        
        {/* Banner Header */}
        <div
          className="relative h-56 bg-primary text-white p-6 md:p-8 flex flex-col justify-end shrink-0"
          style={{
            backgroundImage: `linear-gradient(rgba(46,125,50,0.75), rgba(46,125,50,0.98)), url(${doctor.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <span className="bg-accent text-primary text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
              {doctor.specialization}
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold">{doctor.name}</h2>
              <div className="inline-flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Verified Ayurvedic Vaidya</span>
              </div>
            </div>
            <p className="text-xs text-secondary">{doctor.qualification}</p>
          </div>
        </div>

        {/* Details and Form Columns */}
        <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Info Details (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-primary">About Doctor</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{doctor.about}</p>
            </div>

            {/* Exp and specs */}
            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-primary/5">
              <div>
                <span className="block text-[9px] font-bold uppercase text-text-secondary">Experience</span>
                <span className="text-xs text-primary font-bold">{doctor.experience} Years Active</span>
              </div>
              <div>
                <span className="block text-[9px] font-bold uppercase text-text-secondary">Cons. Fee</span>
                <span className="text-xs text-primary font-bold">₹{doctor.consultationFee}</span>
              </div>
            </div>

            {/* Education and awards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-150">
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase text-text-secondary">Qualifications</h4>
                <ul className="space-y-1 text-xs text-text-primary">
                  {doctor.education.map((edu, i) => (
                    <li key={i} className="list-disc list-inside font-medium">{edu}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase text-text-secondary">Awards</h4>
                <ul className="space-y-1 text-xs text-text-primary">
                  {doctor.awards && doctor.awards.length > 0 ? (
                    doctor.awards.map((aw, i) => (
                      <li key={i} className="list-disc list-inside font-medium">{aw}</li>
                    ))
                  ) : (
                    <li className="italic text-text-secondary">Credentials verified</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Languages / Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-150 text-xs text-text-secondary">
              <div className="space-y-2 font-medium">
                <div><strong>Languages:</strong> {doctor.languages.join(', ')}</div>
                <div><strong>Availability:</strong> {doctor.availability}</div>
              </div>
              <div className="space-y-2 font-medium">
                <div><strong>Clinic:</strong> {doctor.clinicName}</div>
                <div><strong>Location:</strong> {doctor.city}, {doctor.state}</div>
              </div>
            </div>

            {/* Reviews Section */}
            <DoctorReviews reviews={reviews} />
          </div>

          {/* Booking Column (Right) */}
          <div className="bg-white border border-primary/5 p-5 rounded-2xl shadow-sm">
            {!confirmedBooking ? (
              <form onSubmit={handleBookSubmit} className="space-y-5">
                <div>
                  <h4 className="font-serif text-base font-bold text-primary">Schedule Consultation</h4>
                  <p className="text-[9px] text-text-secondary mt-0.5">Secure slots for online video/clinic visit.</p>
                </div>

                {/* Consultation format */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Consultation Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {doctor.onlineConsultation && (
                      <button
                        type="button"
                        onClick={() => setConsultType('Online Video')}
                        className={`py-2 px-2.5 rounded-xl border text-[10px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                          consultType === 'Online Video'
                            ? 'bg-primary border-primary text-white shadow'
                            : 'bg-[#F8FFF8] border-[#2E7D32]/10 text-text-secondary'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Online</span>
                      </button>
                    )}
                    {doctor.offlineConsultation && (
                      <button
                        type="button"
                        onClick={() => setConsultType('Clinic Visit')}
                        className={`py-2 px-2.5 rounded-xl border text-[10px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                          consultType === 'Clinic Visit'
                            ? 'bg-primary border-primary text-white shadow'
                            : 'bg-[#F8FFF8] border-[#2E7D32]/10 text-text-secondary'
                        }`}
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>Clinic</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Date select */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Select Date</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary font-semibold"
                  />
                </div>

                {/* Time slot select */}
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase font-bold text-text-secondary block">Available Slots</label>
                  {loadingSlots ? (
                    <div className="flex justify-center py-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <span className="text-[10px] text-red-500 font-semibold block">No slots found on this date.</span>
                  ) : (
                    <div className="grid grid-cols-2 gap-1.5">
                      {availableSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-1.5 rounded-lg text-center text-[9px] font-bold border transition-all ${
                            selectedSlot === slot
                              ? 'bg-accent border-accent text-primary shadow'
                              : 'bg-white border-gray-150 text-text-secondary hover:bg-gray-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Inputs */}
                <div className="space-y-2.5 pt-2 border-t border-gray-50">
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient Name"
                    className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary"
                  />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-[#F8FFF8] border border-[#2E7D32]/10 rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                {errorMsg && <p className="text-[10px] text-red-500 font-bold leading-tight">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full bg-primary hover:bg-primary-light disabled:bg-primary/50 text-white font-bold text-xs py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 shadow-md"
                >
                  {isBooking ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Secure Booking</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              // Booking success confirmation Card
              <div className="text-center space-y-4 py-4 animate-fade-in-up">
                <div className="w-12 h-12 bg-emerald-100 border border-emerald-300 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <ShieldCheck className="w-6 h-6 text-[#2E7D32]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-primary">Session Scheduled</h4>
                  <span className="text-[9px] font-bold text-accent tracking-wider block mt-0.5">REF ID: {confirmedBooking.id}</span>
                </div>

                <div className="bg-[#F8FFF8] border border-primary/5 p-4 rounded-xl text-left space-y-2 text-xs">
                  <div>
                    <span className="block text-[8px] text-text-secondary uppercase font-bold">Vaidya</span>
                    <strong>{doctor.name}</strong>
                  </div>
                  <div>
                    <span className="block text-[8px] text-text-secondary uppercase font-bold">Slot Time</span>
                    <strong>{confirmedBooking.appointmentDate} at {confirmedBooking.appointmentTime}</strong>
                  </div>
                  <div>
                    <span className="block text-[8px] text-text-secondary uppercase font-bold">Format</span>
                    <strong className="text-primary">{confirmedBooking.consultationType}</strong>
                  </div>
                </div>

                <p className="text-[9px] text-text-secondary leading-relaxed">
                  Confirmation receipt has been dispatched to <strong>{confirmedBooking.email}</strong>.
                </p>

                <button
                  onClick={() => setConfirmedBooking(null)}
                  className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                >
                  Book another session
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
