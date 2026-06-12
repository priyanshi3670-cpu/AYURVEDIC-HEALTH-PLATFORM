import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Calendar, Users, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clinic, Doctor, Package, ClinicReview, GalleryImage, Service } from '../types';

// API Services
import clinicProfileApi from '../services/clinicProfileApi';
import clinicDoctorApi from '../services/clinicDoctorApi';
import clinicPackageApi from '../services/clinicPackageApi';

// Component Imports
import ClinicHero from '../components/clinicProfile/ClinicHero';
import ClinicAbout from '../components/clinicProfile/ClinicAbout';
import ClinicServices from '../components/clinicProfile/ClinicServices';
import ClinicDoctors from '../components/clinicProfile/ClinicDoctors';
import FacilityCard from '../components/clinicProfile/FacilityCard';
import GalleryGrid from '../components/clinicProfile/GalleryGrid';
import PackageCard from '../components/clinicProfile/PackageCard';
import OpeningHours from '../components/clinicProfile/OpeningHours';
import ReviewSection from '../components/clinicProfile/ReviewSection';
import MapPreview from '../components/clinicProfile/MapPreview';
import WhyChooseClinic from '../components/clinicProfile/WhyChooseClinic';
import SimilarClinics from '../components/clinicProfile/SimilarClinics';
import FAQSection from '../components/clinicProfile/FAQSection';
import LoadingSkeleton from '../components/clinicProfile/LoadingSkeleton';
import ErrorFallback from '../components/clinicProfile/ErrorFallback';
import ClinicBookingModal from '../components/clinicProfile/ClinicBookingModal';

export const ClinicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Page States
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviews, setReviews] = useState<ClinicReview[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // UX Control States
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPkgForBooking, setSelectedPkgForBooking] = useState<Package | null>(null);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadProfileData = async () => {
      setLoading(true);
      try {
        const [
          clinicRes,
          doctorsRes,
          packagesRes,
          reviewsRes,
          galleryRes,
          servicesRes
        ] = await Promise.all([
          clinicProfileApi.getClinicById(id),
          clinicDoctorApi.getDoctorsByClinicId(id),
          clinicPackageApi.getPackagesByClinicId(id),
          clinicProfileApi.getClinicReviews(id),
          clinicProfileApi.getClinicGallery(id),
          clinicProfileApi.getClinicServices(id)
        ]);

        if (clinicRes.data) {
          setClinic(clinicRes.data);
          setDoctors(doctorsRes.data);
          setPackages(packagesRes.data);
          setReviews(reviewsRes.data);
          setGallery(galleryRes.data);
          setServices(servicesRes.data);

          // If ANY API call hits fallback mock data, notify visually
          if (
            clinicRes.isFallback ||
            doctorsRes.isFallback ||
            packagesRes.isFallback ||
            reviewsRes.isFallback ||
            galleryRes.isFallback ||
            servicesRes.isFallback
          ) {
            setIsFallback(true);
          } else {
            setIsFallback(false);
          }
        } else {
          // If no clinic matching ID exists, redirect back to search directory
          navigate('/clinics');
        }
      } catch (err) {
        console.error('Fatal failure resolving profile datasets, using fallbacks.', err);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [id, navigate]);

  // Scroll Actions
  const handleScrollToDoctors = () => {
    const el = document.getElementById('clinic-doctors-section');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookConsultation = () => {
    setSelectedPkgForBooking(null);
    setBookingOpen(true);
  };

  const handleBookPackage = (pkg: Package) => {
    setSelectedPkgForBooking(pkg);
    setBookingOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!clinic) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-black text-primary">Center Directory Listing Missing</h2>
        <p className="text-sm text-text-secondary">We could not retrieve this center's details. Return to search.</p>
        <button 
          onClick={() => navigate('/clinics')}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold py-3 px-6 rounded-2xl uppercase"
        >
          View Clinic Directory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-10 md:space-y-14">
      {/* 0. Fallback Alert Header */}
      {isFallback && <ErrorFallback message="Using Demo Data" />}

      {/* 1. Hero Cover Profile */}
      <ClinicHero 
        clinic={clinic} 
        onBookClick={handleBookConsultation}
        onContactClick={handleBookConsultation}
      />

      {/* 2. Side-By-Side Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2/3 Content Column */}
        <div className="lg:col-span-2 space-y-10 md:space-y-14">
          {/* About Clinic */}
          <div id="clinic-about-section">
            <ClinicAbout clinic={clinic} />
          </div>

          {/* Interactive Services */}
          <div id="clinic-services-section">
            <ClinicServices services={services} />
          </div>

          {/* certified facilities grid */}
          <FacilityCard clinicFacilities={clinic.facilities} />

          {/* Doctors Section */}
          <div id="clinic-doctors-section">
            <ClinicDoctors 
              doctors={doctors} 
              onViewProfile={(doc) => navigate(`/doctor/${doc.id}`)} 
            />
          </div>

          {/* Packages Section */}
          <PackageCard 
            packages={packages} 
            onBookPackage={handleBookPackage} 
          />

          {/* Gallery visual tour */}
          <GalleryGrid gallery={gallery} />
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8 md:space-y-10">
          {/* Timings */}
          <OpeningHours schedule={clinic.openingHoursList} />

          {/* Maps and directions */}
          <MapPreview clinic={clinic} />
        </div>
      </div>

      {/* 3. Outcome Reviews */}
      <ReviewSection reviews={reviews} rating={clinic.rating} />

      {/* 4. Why Choose This Center */}
      <WhyChooseClinic />

      {/* 5. Frequently Asked Questions */}
      <FAQSection />

      {/* 6. CTA Action Banner */}
      <section className="bg-gradient-to-br from-primary to-emerald-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl border border-primary-light/10">
        {/* Abstract Blur Orbs */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-6 relative">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-accent/25 text-accent px-4 py-1.5 rounded-full inline-block border border-accent/20">
            Wellness awaits you
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight">
            Begin Your Ayurveda Healing Journey
          </h2>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium max-w-lg mx-auto">
            Experience classical Panchakarma detox plans and therapeutic dosha balances curated by award-winning Vaidyas.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleBookConsultation}
              className="w-full sm:w-auto bg-white hover:bg-[#FAF9F6] text-primary font-bold text-xs py-3.5 px-8 rounded-2xl shadow-md uppercase tracking-wider transition-all cursor-pointer"
            >
              Book Consultation
            </button>
            <button
              onClick={handleScrollToDoctors}
              className="w-full sm:w-auto border border-white/30 hover:bg-white/10 text-white font-bold text-xs py-3.5 px-8 rounded-2xl uppercase tracking-wider transition-colors cursor-pointer"
            >
              View In-House Doctors
            </button>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Registration Section */}
      <section className="bg-[#F8FFF8] border border-primary/10 rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 text-primary">
            <Mail className="w-5 h-5 text-accent" />
            <h4 className="font-serif font-bold text-lg leading-none">Subscribe to Vedic Wellness</h4>
          </div>
          <p className="text-xs text-text-secondary font-semibold leading-relaxed">
            Get seasonal Ayurvedic diets, remedies, and wellness center listings delivered to your inbox monthly.
          </p>
        </div>

        <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px] lg:min-w-[450px]">
          <div className="relative flex-grow">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full bg-white border border-gray-150 focus:border-primary rounded-2xl px-5 py-3 text-xs text-text-primary font-semibold outline-none transition-colors shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 px-6 rounded-2xl uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>Subscribe</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <AnimatePresence>
          {newsletterSubscribed && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 right-6 bg-primary text-white border border-primary-light/20 p-4 rounded-2xl shadow-2xl flex items-center space-x-2 z-50 text-xs font-bold"
            >
              <CheckCircle2 className="w-4 h-4 text-accent animate-bounce" />
              <span>Vedic Wellness Newsletter subscription confirmed!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 8. Similar Recommendations Section */}
      <SimilarClinics currentClinic={clinic} />

      {/* General Booking Dialog Modal overlay */}
      <ClinicBookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)}
        clinicName={clinic.name}
        selectedPackage={selectedPkgForBooking}
      />
    </div>
  );
};

export default ClinicProfile;
