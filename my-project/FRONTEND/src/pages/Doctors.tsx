import React, { useEffect, useState, useMemo } from 'react';
import { 
  Users, Building, Sprout, Star, Video, Heart, ShieldCheck, 
  MapPin, CheckCircle, Clock, BookOpen, UserCheck, MessageSquare, 
  Calendar, ArrowRight, ShieldAlert, Sparkles, Briefcase
} from 'lucide-react';
import { doctorApi, Doctor } from '../services/doctorApi';
import DoctorSearch from '../components/doctors/DoctorSearch';
import DoctorFilters from '../components/doctors/DoctorFilters';
import DoctorGrid from '../components/doctors/DoctorGrid';
import DoctorProfile from '../components/doctors/DoctorProfile';
import FeaturedDoctors from '../components/doctors/FeaturedDoctors';
import TopRatedDoctors from '../components/doctors/TopRatedDoctors';
import AppointmentCTA from '../components/doctors/AppointmentCTA';
import LoadingSkeleton from '../components/doctors/LoadingSkeleton';
import ErrorFallback from '../components/doctors/ErrorFallback';

export const Doctors: React.FC = () => {
  // Data States
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  
  // Loading & Diagnostics States
  const [loading, setLoading] = useState(true);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  // Search & Filter State
  const [searchName, setSearchName] = useState('');
  const [searchSpec, setSearchSpec] = useState('');
  const [searchCity, setSearchCity] = useState('');
  
  // Sidebar filters (refined)
  const [filterSpec, setFilterSpec] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterState, setFilterState] = useState('');
  const [minExperience, setMinExperience] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxFee, setMaxFee] = useState(1500);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [onlyOffline, setOnlyOffline] = useState(false);

  // Modal display states
  const [activeProfile, setActiveProfile] = useState<Doctor | null>(null);

  // Newsletter state
  const [emailValue, setEmailValue] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  // Trigger search from hero input fields
  const [triggerSearch, setTriggerSearch] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [docsRes, specsRes] = await Promise.all([
          doctorApi.getDoctors(),
          doctorApi.getSpecializations()
        ]);

        setDoctors(docsRes.data);
        setSpecializations(specsRes.data);

        if (docsRes.isFallback || specsRes.isFallback) {
          setIsFallbackMode(true);
        }
      } catch (err) {
        setIsFallbackMode(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriggerSearch(prev => !prev);
  };

  // Compute filtered grid list based on BOTH search inputs and sidebar parameters
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      // 1. Hero Search Inputs
      const matchesSearchName = !searchName || doc.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesSearchSpec = !searchSpec || 
        doc.specialization.toLowerCase().includes(searchSpec.toLowerCase()) ||
        doc.specialExpertise.some(exp => exp.toLowerCase().includes(searchSpec.toLowerCase()));
      const matchesSearchCity = !searchCity || 
        doc.city.toLowerCase().includes(searchCity.toLowerCase()) || 
        doc.state.toLowerCase().includes(searchCity.toLowerCase());

      // 2. Sidebar Filter Settings
      const matchesFilterSpec = !filterSpec || doc.specialization === filterSpec;
      const matchesFilterCity = !filterCity || doc.city.toLowerCase().includes(filterCity.toLowerCase());
      const matchesFilterState = !filterState || doc.state.toLowerCase().includes(filterState.toLowerCase());
      const matchesExperience = doc.experience >= minExperience;
      const matchesRating = doc.rating >= minRating;
      const matchesFee = doc.consultationFee <= maxFee;
      
      const matchesOnline = !onlyOnline || doc.onlineConsultation;
      const matchesOffline = !onlyOffline || doc.offlineConsultation;

      return matchesSearchName && matchesSearchSpec && matchesSearchCity &&
             matchesFilterSpec && matchesFilterCity && matchesFilterState &&
             matchesExperience && matchesRating && matchesFee &&
             matchesOnline && matchesOffline;
    });
  }, [
    doctors, searchName, searchSpec, searchCity, triggerSearch,
    filterSpec, filterCity, filterState, minExperience, minRating, maxFee,
    onlyOnline, onlyOffline
  ]);

  const handleResetAllFilters = () => {
    setSearchName('');
    setSearchSpec('');
    setSearchCity('');
    setFilterSpec('');
    setFilterCity('');
    setFilterState('');
    setMinExperience(0);
    setMinRating(0);
    setMaxFee(1500);
    setOnlyOnline(false);
    setOnlyOffline(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setEmailSubscribed(true);
      setEmailValue('');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* 0. Fallback Alert Banner */}
      {isFallbackMode && (
        <div className="pt-24 shrink-0">
          <ErrorFallback message="Using Demo Data" />
        </div>
      )}

      {/* 1. Hero Section */}
      <section className={`bg-gradient-to-br from-[#2E7D32]/10 via-[#F8FFF8] to-[#D4AF37]/5 px-6 md:px-12 text-center overflow-hidden ${isFallbackMode ? 'pt-6 pb-16' : 'pt-32 pb-20'}`}>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 bg-primary/5 border border-primary/10 px-4 py-1.5 rounded-full text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>AyurVeda Connect Vaidya Directory</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-primary">
            Find Verified Ayurvedic Doctors
          </h1>
          
          <p className="text-xs md:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed">
            Connect with experienced Ayurveda experts for personalized health guidance. Schedule pulse readings or video sessions instantly.
          </p>

          {/* Core DoctorSearch box */}
          <div className="pt-4">
            <DoctorSearch
              name={searchName}
              setName={setSearchName}
              specialization={searchSpec}
              setSpecialization={setSearchSpec}
              city={searchCity}
              setCity={setSearchCity}
              onSearchSubmit={handleHeroSearchSubmit}
            />
          </div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="bg-white border-t border-b border-gray-150 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-around items-center gap-8 text-center">
          <div className="space-y-1">
            <Users className="w-6 h-6 text-accent mx-auto" />
            <h4 className="font-serif text-2xl font-bold text-primary">1,000+</h4>
            <p className="text-[10px] uppercase font-bold text-text-secondary">Verified Doctors</p>
          </div>
          <div className="w-[1px] h-10 bg-gray-100 hidden sm:block" />
          <div className="space-y-1">
            <Building className="w-6 h-6 text-accent mx-auto" />
            <h4 className="font-serif text-2xl font-bold text-primary">500+</h4>
            <p className="text-[10px] uppercase font-bold text-text-secondary">Affiliated Clinics</p>
          </div>
          <div className="w-[1px] h-10 bg-gray-100 hidden sm:block" />
          <div className="space-y-1">
            <Sprout className="w-6 h-6 text-accent mx-auto" />
            <h4 className="font-serif text-2xl font-bold text-primary">10,000+</h4>
            <p className="text-[10px] uppercase font-bold text-text-secondary">Healed Patients</p>
          </div>
        </div>
      </section>

      {/* 3. Main Grid & Filters Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Sidebar Filters */}
        <div>
          <div className="sticky top-28 space-y-6">
            <DoctorFilters
              specializations={specializations}
              selectedSpec={filterSpec}
              setSelectedSpec={setFilterSpec}
              city={filterCity}
              setCity={setFilterCity}
              state={filterState}
              setState={setFilterState}
              experience={minExperience}
              setExperience={setMinExperience}
              rating={minRating}
              setRating={setMinRating}
              maxFee={maxFee}
              setMaxFee={setMaxFee}
              online={onlyOnline}
              setOnline={setOnlyOnline}
              offline={onlyOffline}
              setOffline={setOnlyOffline}
              onReset={handleResetAllFilters}
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-primary">Directory Results</h2>
            <span className="text-xs font-semibold text-text-secondary bg-[#2E7D32]/5 px-3 py-1.5 rounded-full">
              {loading ? 'Searching...' : `${filteredDoctors.length} Practitioners Found`}
            </span>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <DoctorGrid
              doctors={filteredDoctors}
              onViewProfile={setActiveProfile}
              onBookAppointment={setActiveProfile}
              onReset={handleResetAllFilters}
            />
          )}
        </div>
      </div>

      {/* 4. Featured Doctors */}
      {!loading && (
        <FeaturedDoctors
          doctors={doctors}
          onSelectDoctor={setActiveProfile}
        />
      )}

      {/* 5. Top Rated Doctors Carousel */}
      {!loading && (
        <TopRatedDoctors
          doctors={doctors}
          onSelectDoctor={setActiveProfile}
        />
      )}

      {/* 6. Consultation Options Section */}
      <section className="bg-white py-16 px-6 md:px-12 border-t border-b border-[#2E7D32]/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block font-sans">Ecosystem Formats</span>
            <h2 className="font-serif text-3xl font-bold text-primary">Flexible Consultation Channels</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Connect with Vaidyas in the format that best fits your distance bounds and physical preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F8FFF8] border border-primary/5 rounded-2xl shadow-sm text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Video className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-serif text-base font-bold text-primary">Video Consultation</h4>
              <p className="text-xs text-text-secondary leading-relaxed">Secure online calls with full screen diagnostics and screen sharing.</p>
            </div>
            
            <div className="p-6 bg-[#F8FFF8] border border-primary/5 rounded-2xl shadow-sm text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Building className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-serif text-base font-bold text-primary">Clinic Visit</h4>
              <p className="text-xs text-text-secondary leading-relaxed">In-person consultations at our standard affiliated holistic hubs.</p>
            </div>

            <div className="p-6 bg-[#F8FFF8] border border-primary/5 rounded-2xl shadow-sm text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-serif text-base font-bold text-primary">Chat Consultation</h4>
              <p className="text-xs text-text-secondary leading-relaxed">Direct messaging channels with Vaidyas for queries and recipes.</p>
            </div>

            <div className="p-6 bg-[#F8FFF8] border border-primary/5 rounded-2xl shadow-sm text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-serif text-base font-bold text-primary">Follow Up Track</h4>
              <p className="text-xs text-text-secondary leading-relaxed">Weekly check-ins to monitor dosha levels and symptom changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Our Doctors */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block font-sans">Quality Standards</span>
          <h2 className="font-serif text-3xl font-bold text-primary">Why Choose Our Doctors</h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            All practitioners listed on our portal undergo rigorous onboarding checks to ensure standard care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white border border-[#2E7D32]/5 rounded-2xl text-center space-y-3 shadow-sm">
            <CheckCircle className="w-8 h-8 text-accent mx-auto" />
            <h4 className="font-serif text-sm font-bold text-primary">Verified Experts</h4>
            <p className="text-[10px] text-text-secondary leading-relaxed">We manually crosscheck certifications with government databases.</p>
          </div>
          
          <div className="p-6 bg-white border border-[#2E7D32]/5 rounded-2xl text-center space-y-3 shadow-sm">
            <UserCheck className="w-8 h-8 text-accent mx-auto" />
            <h4 className="font-serif text-sm font-bold text-primary">Certified Practitioners</h4>
            <p className="text-[10px] text-text-secondary leading-relaxed">BAMS and MD certifications verified from central universities.</p>
          </div>

          <div className="p-6 bg-white border border-[#2E7D32]/5 rounded-2xl text-center space-y-3 shadow-sm">
            <Briefcase className="w-8 h-8 text-accent mx-auto" />
            <h4 className="font-serif text-sm font-bold text-primary">Experienced Professionals</h4>
            <p className="text-[10px] text-text-secondary leading-relaxed">Minimum 5 years of active clinical practice required for directory listing.</p>
          </div>

          <div className="p-6 bg-white border border-[#2E7D32]/5 rounded-2xl text-center space-y-3 shadow-sm">
            <MessageSquare className="w-8 h-8 text-accent mx-auto" />
            <h4 className="font-serif text-sm font-bold text-primary">Patient Reviews</h4>
            <p className="text-[10px] text-text-secondary leading-relaxed">Authentic, unedited patient outcomes logs tied directly to practitioner profiles.</p>
          </div>
        </div>
      </section>

      {/* 8. Appointment CTA */}
      <AppointmentCTA
        onBookClick={handleResetAllFilters}
        onViewClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* 9. Newsletter Section */}
      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto border border-primary/20">
          <Sprout className="w-6 h-6 text-accent animate-float" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-primary">Get Weekly Healing Insights</h2>
        <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
          Subscribe to our platform newsletter to receive customized recipes, dosha tips, and early booking notifications directly.
        </p>

        {emailSubscribed ? (
          <div className="p-4 bg-primary/15 border border-primary/30 rounded-2xl text-primary text-xs font-bold max-w-sm mx-auto animate-fade-in-up">
            🌿 Subscribed Successfully! Check your inbox for weekly herbal remedies.
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow bg-white border border-[#2E7D32]/15 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>

      {/* 10. Doctor Profile Modal Overlay */}
      {activeProfile && (
        <DoctorProfile
          doctor={activeProfile}
          onClose={() => setActiveProfile(null)}
        />
      )}

    </div>
  );
};

export default Doctors;
