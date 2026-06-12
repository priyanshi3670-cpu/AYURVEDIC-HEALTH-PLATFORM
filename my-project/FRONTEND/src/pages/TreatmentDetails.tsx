import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, UserCheck, Bot, Sparkles, Mail, Send, Check } from 'lucide-react';

// APIs
import treatmentDetailsApi from '../services/treatmentDetailsApi';
import doctorRecommendationApi from '../services/doctorRecommendationApi';
import treatmentApi from '../services/treatmentApi';

// Types
import { Treatment, Doctor, RecoveryMilestone, TreatmentFAQ } from '../types';

// Components
import TreatmentHero from '../components/treatments/TreatmentHero';
import TreatmentOverview from '../components/treatments/TreatmentOverview';
import TreatmentBenefits from '../components/treatments/TreatmentBenefits';
import ProcedureTimeline from '../components/treatments/ProcedureTimeline';
import RecoveryTimeline from '../components/treatments/RecoveryTimeline';
import PersonalizedPlan from '../components/treatments/PersonalizedPlan';
import DoctorRecommendation from '../components/treatments/DoctorRecommendation';
import CostBreakdown from '../components/treatments/CostBreakdown';
import SuitableConditions from '../components/treatments/SuitableConditions';
import Precautions from '../components/treatments/Precautions';
import TreatmentReviews from '../components/treatments/TreatmentReviews';
import SimilarTreatments from '../components/treatments/SimilarTreatments';
import ErrorFallback from '../components/treatments/ErrorFallback';
import LoadingSkeleton from '../components/treatments/LoadingSkeleton';

export const TreatmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // States
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [timeline, setTimeline] = useState<RecoveryMilestone[]>([]);
  const [allTreatments, setAllTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [trtRes, doctorsRes, timelineRes, allRes] = await Promise.all([
          treatmentDetailsApi.getTreatmentById(id),
          doctorRecommendationApi.getRecommendedDoctors(id),
          treatmentDetailsApi.getTreatmentRecoveryTimeline(id),
          treatmentApi.getTreatments()
        ]);

        if (trtRes.data) {
          setTreatment(trtRes.data);
          setDoctors(doctorsRes.data);
          setTimeline(timelineRes.data);
          setAllTreatments(allRes.data);
          setIsFallback(trtRes.isFallback || doctorsRes.isFallback || timelineRes.isFallback || allRes.isFallback);
        } else {
          // Redirect if treatment totally missing
          console.warn('Treatment not found in registry');
          navigate('/treatments');
        }
      } catch (err) {
        console.error('Error fetching details page assets:', err);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDetails();
  }, [id, navigate]);

  const handleBookConsultation = () => {
    // Navigate to doctor appointment system
    navigate('/doctors');
  };

  const handleExploreDoctors = () => {
    navigate('/doctors');
  };

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-8">
        <div className="flex items-center space-x-3 text-primary justify-center py-20 font-serif text-lg font-bold">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
          <span>Restoring doshic profile from registry...</span>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (!treatment) return null;

  // Render Custom FAQ Accordion matching treatment-specific FAQs
  const faqList = treatment.faq || [];

  return (
    <div className="bg-background min-h-screen text-text-primary">
      {/* 11. DIAGNOSTIC WARNING BANNER */}
      {isFallback && (
        <div className="sticky top-[72px] z-40 w-full px-4 pt-2">
          <ErrorFallback message="Using Demo Data" />
        </div>
      )}

      {/* 2. TREATMENT HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 space-y-16">
        <TreatmentHero 
          treatment={treatment}
          onBookConsultation={handleBookConsultation}
          onFindDoctor={handleExploreDoctors}
        />

        {/* 3. TREATMENT OVERVIEW SECTION */}
        <TreatmentOverview treatment={treatment} />

        {/* 4. TREATMENT BENEFITS SECTION */}
        <TreatmentBenefits />

        {/* 5. PROCEDURE TIMELINE SECTION */}
        <ProcedureTimeline treatment={treatment} />

        {/* 6. RECOVERY TIMELINE SECTION */}
        <RecoveryTimeline milestones={timeline} isFallback={isFallback} />

        {/* 7. PERSONALIZED PLAN SECTION */}
        <PersonalizedPlan treatment={treatment} />

        {/* 8. RECOMMENDED DOCTORS SECTION */}
        <DoctorRecommendation doctors={doctors} isFallback={isFallback} />

        {/* 9. COST BREAKDOWN */}
        <CostBreakdown totalEstimate={treatment.costEstimate} />

        {/* 10. SUITABLE CONDITIONS SECTION */}
        <SuitableConditions conditions={treatment.suitableFor} />

        {/* 11. PRECAUTIONS & CONTRAINDICATIONS */}
        <Precautions 
          precautions={treatment.precautions}
          contraindications={treatment.contraindications}
        />

        {/* 12. PATIENT REVIEWS SECTION */}
        <TreatmentReviews treatmentName={treatment.name} />

        {/* 13. FAQ SECTION */}
        {faqList.length > 0 && (
          <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-accent text-[9px] font-bold uppercase tracking-widest block">Accurate answers</span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Treatment Specific FAQs</h3>
            </div>
            
            <div className="space-y-4">
              {faqList.map((f, i) => (
                <div key={i} className="bg-[#FAF9F6] border border-primary/5 p-4.5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-primary">Q: {f.question}</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">A: {f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 14. SIMILAR TREATMENTS SECTION */}
        <SimilarTreatments 
          currentTreatment={treatment}
          allTreatments={allTreatments}
        />

        {/* 15. CTA BANNER */}
        <section className="bg-gradient-to-r from-primary via-primary-light to-[#1B5E20] text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full translate-x-20 -translate-y-20 blur-2xl" />

          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border border-white/15 inline-block">
              Begin Rejuvenation
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-black">
              Start Your Personalized Ayurveda Healing Journey
            </h2>
            <p className="text-xs text-white/90 leading-relaxed font-semibold">
              Connect with our registered practitioner ecosystem to formulate a bespoke diet, lifestyle, and clinical therapy schedule designed for your body type.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto shrink-0 relative z-10">
            <button
              onClick={handleBookConsultation}
              className="bg-accent hover:bg-accent-light text-primary font-bold text-xs py-4 px-6 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
            </button>
            <button
              onClick={handleExploreDoctors}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs py-4 px-6 rounded-xl transition-all uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Explore Doctors</span>
            </button>
          </div>
        </section>

        {/* 16. NEWSLETTER SECTION */}
        <section className="bg-white border border-[#2E7D32]/10 p-8 md:p-12 rounded-3xl shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mx-auto">
            <Mail className="w-6 h-6 text-accent" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Subscribe to AyurVeda Insights</h3>
            <p className="text-xs text-text-secondary leading-relaxed font-medium max-w-md mx-auto">
              Get clinical updates on Panchakarma schedules, health guides, and seasonal diet routines directly in your inbox.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-[#F8FFF8] border border-primary/20 text-primary py-3.5 px-6 rounded-2xl inline-flex items-center space-x-2.5 text-xs font-bold animate-fade-in-up">
              <Check className="w-4.5 h-4.5 text-accent shrink-0" />
              <span>Thank you! Your secure subscription is now active.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-[#FAF9F6] border border-[#2E7D32]/10 rounded-xl py-3 px-4 text-xs focus:outline-none focus:border-primary font-semibold text-text-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-colors shrink-0 uppercase tracking-widest flex items-center justify-center space-x-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5 text-accent" />
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default TreatmentDetails;
