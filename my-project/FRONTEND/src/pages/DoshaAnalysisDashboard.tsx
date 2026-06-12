import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HelpCircle, Activity, Award, Clipboard, ChevronRight } from 'lucide-react';

// Layout
import DashboardLayout from '../components/dashboard/DashboardLayout';

// APIs & Services
import doshaApi from '../services/doshaApi';
import patientApi from '../services/patientApi';
import patientNotificationApi from '../services/patientNotificationApi';

// Types
import { 
  Patient, 
  Notification, 
  DoshaQuestion, 
  DoshaResult, 
  AssessmentHistory as HistoryRecord 
} from '../types';

// Page-specific Components
import DoshaHero from '../components/doshaAnalysis/DoshaHero';
import DoshaCard from '../components/doshaAnalysis/DoshaCard';
import AssessmentForm from '../components/doshaAnalysis/AssessmentForm';
import ResultDashboard from '../components/doshaAnalysis/ResultDashboard';
import AssessmentHistory from '../components/doshaAnalysis/AssessmentHistory';
import FAQSection from '../components/doshaAnalysis/FAQSection';
import LoadingSkeleton from '../components/doshaAnalysis/LoadingSkeleton';
import ErrorFallback from '../components/doshaAnalysis/ErrorFallback';

export const DoshaAnalysisDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  // Layout Context States
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Page 12 States
  const [questions, setQuestions] = useState<DoshaQuestion[]>([]);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [activeResult, setActiveResult] = useState<DoshaResult | null>(null);
  const [activeRecom, setActiveRecom] = useState<any | null>(null);
  
  // UX State Flow
  const [assessmentActive, setAssessmentActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // References for scrolling
  const learnRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [questionsRes, patientRes, notificationsRes, historyRes] = await Promise.all([
          doshaApi.getQuestions(),
          patientApi.getPatientProfile(),
          patientNotificationApi.getNotifications(),
          doshaApi.getAssessmentHistory()
        ]);

        const hasFallback = questionsRes.isFallback || patientRes.isFallback || notificationsRes.isFallback || historyRes.isFallback;
        setIsFallback(hasFallback);

        if (questionsRes.error || patientRes.error || notificationsRes.error || historyRes.error) {
          setErrorMsg(questionsRes.error || patientRes.error || notificationsRes.error || historyRes.error);
        }

        setPatient(patientRes.data);
        setNotifications(notificationsRes.data);
        setQuestions(questionsRes.data);
        setHistory(historyRes.data);

        // If history exists, load the most recent result as default preview
        if (historyRes.data && historyRes.data.length > 0) {
          const latestId = historyRes.data[0].id;
          await loadSelectedResult(latestId);
        }
      } catch (err: any) {
        console.error('Failed to load Prakriti initialization dataset', err);
        setIsFallback(true);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const loadSelectedResult = async (id: string) => {
    try {
      // Find results locally or fetch recommendations for that dominant dosha
      // Since result data is stored inside history, look it up
      const histItem = history.find(h => h.id === id) || (history.length > 0 ? history[0] : null);
      if (histItem) {
        const fullResult: DoshaResult = {
          id: histItem.id,
          patientName: patient?.name || "Priyanshi Sharma",
          assessmentDate: histItem.date,
          vataPercentage: histItem.vata,
          pittaPercentage: histItem.pitta,
          kaphaPercentage: histItem.kapha,
          dominantDosha: histItem.dominantDosha
        };
        setActiveResult(fullResult);

        const recomRes = await doshaApi.getRecommendations(histItem.dominantDosha);
        setActiveRecom(recomRes.data);
        setAssessmentActive(false);
      }
    } catch (err) {
      console.error('Failed to load result recommendations', err);
    }
  };

  const handleStartQuiz = () => {
    setActiveResult(null);
    setActiveRecom(null);
    setAssessmentActive(true);
  };

  const handleScrollToLearn = () => {
    learnRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitQuiz = async (answers: Record<string, number>) => {
    setIsSubmitting(true);
    try {
      const res = await doshaApi.submitAssessment(answers, patient?.name);
      if (res.data) {
        const freshResult = res.data;
        setActiveResult(freshResult);

        // Fetch custom recommendations
        const recomRes = await doshaApi.getRecommendations(freshResult.dominantDosha);
        setActiveRecom(recomRes.data);

        // Update history list
        const newHistItem: HistoryRecord = {
          id: freshResult.id,
          date: freshResult.assessmentDate,
          vata: freshResult.vataPercentage,
          pitta: freshResult.pittaPercentage,
          kapha: freshResult.kaphaPercentage,
          dominantDosha: freshResult.dominantDosha
        };
        setHistory(prev => [newHistItem, ...prev]);

        // Disable quiz view
        setAssessmentActive(false);
      }
    } catch (err) {
      console.error('Failed to submit Prakriti answers', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !patient) {
    return (
      <div className="flex bg-[#F8FFF8] min-h-screen font-sans">
        <div className="flex-grow p-6 md:p-8">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FFF8] print:bg-white print:p-0">
      {/* 0. ONLINE STATUS ALERT RIBBON */}
      <ErrorFallback isFallback={isFallback} errorMsg={errorMsg} />

      <DashboardLayout
        patient={patient}
        isFallback={isFallback}
        notifications={notifications}
        activeTab="dosha"
        setActiveTab={() => {}}
      >
        <div className="space-y-8 print:space-y-6">
          
          {/* 1. HERO SECTION */}
          {!assessmentActive && !activeResult && (
            <DoshaHero
              onStartAssessment={handleStartQuiz}
              onScrollToLearn={handleScrollToLearn}
            />
          )}

          {/* 2. CORE WIZARD OR RESULTS INTERFACE */}
          {assessmentActive ? (
            <AssessmentForm
              questions={questions}
              onSubmit={handleSubmitQuiz}
              isSubmitting={isSubmitting}
            />
          ) : activeResult && activeRecom ? (
            <ResultDashboard
              result={activeResult}
              recom={activeRecom}
              isFallback={isFallback}
              onRetake={handleStartQuiz}
            />
          ) : (
            // Fallback welcome message if history is empty
            <div className="bg-white border border-emerald-950/5 p-8 rounded-3xl text-center shadow-sm space-y-4">
              <Clipboard className="w-12 h-12 text-emerald-200 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-text-primary">No Assessment Completed Yet</h3>
                <p className="text-xs text-text-secondary max-w-md mx-auto">
                  Take the quiz to identify your biological bio-energies (doshas) and get custom diet plans.
                </p>
              </div>
              <button
                onClick={handleStartQuiz}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl text-xs font-bold font-serif shadow cursor-pointer inline-block"
              >
                Take Assessment Now
              </button>
            </div>
          )}

          {/* 3. DOSHA EXPLANATION OVERVIEW SECTION (Only visible when not testing) */}
          {!assessmentActive && (
            <div ref={learnRef} className="space-y-6 scroll-mt-6">
              <div className="space-y-1">
                <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">ayurveda concepts</span>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-primary">Understand the Three Doshas</h2>
                <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
                  Every individual contains a unique balance of Vata (Air), Pitta (Fire), and Kapha (Earth). Imbalances in these bio-energies trigger physical blockages.
                </p>
              </div>

              {/* Character Details Grid */}
              <DoshaCard />
            </div>
          )}

          {/* 4. HISTORICAL LOGS TIMELINE AND FAQS */}
          {!assessmentActive && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* History list */}
              <div className="lg:col-span-2">
                <AssessmentHistory
                  history={history}
                  onSelectResult={loadSelectedResult}
                />
              </div>

              {/* FAQs Accordions */}
              <div>
                <FAQSection />
              </div>

            </div>
          )}

        </div>
      </DashboardLayout>
    </div>
  );
};

export default DoshaAnalysisDashboard;
