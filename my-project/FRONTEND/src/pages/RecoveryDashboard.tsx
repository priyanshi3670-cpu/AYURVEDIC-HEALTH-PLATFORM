import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Heart, Sparkles, User, Calendar, Clipboard } from 'lucide-react';

// Layout & Layout Components
import DashboardLayout from '../components/dashboard/DashboardLayout';

// APIs & Services
import recoveryApi from '../services/recoveryApi';
import patientApi from '../services/patientApi';
import patientNotificationApi from '../services/patientNotificationApi';

// Types
import { 
  Patient, 
  Notification,
  RecoveryProfile,
  AdvancedRecoveryProgress,
  SymptomRecord,
  MilestoneRecord,
  MedicationRecord,
  LifestyleMetricRecord,
  JournalEntryRecord,
  RecoveryAchievement,
  RecoveryWellnessScore
} from '../types';

// Page-specific Components
import RecoveryOverviewCard from '../components/recoveryTracker/RecoveryOverviewCard';
import RecoveryChart from '../components/recoveryTracker/RecoveryChart';
import SymptomTracker from '../components/recoveryTracker/SymptomTracker';
import HealingTimeline from '../components/recoveryTracker/HealingTimeline';
import MilestoneTracker from '../components/recoveryTracker/MilestoneTracker';
import MedicationTracker from '../components/recoveryTracker/MedicationTracker';
import LifestyleTracker from '../components/recoveryTracker/LifestyleTracker';
import WellnessScoreCard from '../components/recoveryTracker/WellnessScoreCard';
import RecoveryCalendar from '../components/recoveryTracker/RecoveryCalendar';
import AIRecommendationCard from '../components/recoveryTracker/AIRecommendationCard';
import RecoveryJournal from '../components/recoveryTracker/RecoveryJournal';
import ProgressComparison from '../components/recoveryTracker/ProgressComparison';
import AchievementBadge from '../components/recoveryTracker/AchievementBadge';
import ReportExporter from '../components/recoveryTracker/ReportExporter';
import NotificationPanel from '../components/recoveryTracker/NotificationPanel';
import LoadingSkeleton from '../components/recoveryTracker/LoadingSkeleton';
import ErrorFallback from '../components/recoveryTracker/ErrorFallback';

export const RecoveryDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  // Patient Context States
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Page 10 Recovery Tracker States
  const [profile, setProfile] = useState<RecoveryProfile | null>(null);
  const [progressPoints, setProgressPoints] = useState<AdvancedRecoveryProgress[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomRecord[]>([]);
  const [milestones, setMilestones] = useState<MilestoneRecord[]>([]);
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [lifestyle, setLifestyle] = useState<LifestyleMetricRecord[]>([]);
  const [wellnessScore, setWellnessScore] = useState<RecoveryWellnessScore | null>(null);
  const [achievements, setAchievements] = useState<RecoveryAchievement[]>([]);
  const [journal, setJournal] = useState<JournalEntryRecord[]>([]);

  useEffect(() => {
    const fetchRecoveryData = async () => {
      setLoading(true);
      try {
        const [recoveryRes, patientRes, notificationsRes] = await Promise.all([
          recoveryApi.getRecoveryDashboard(),
          patientApi.getPatientProfile(),
          patientNotificationApi.getNotifications()
        ]);

        // Merge fallback flags
        const hasFallback = recoveryRes.isFallback || patientRes.isFallback || notificationsRes.isFallback;
        setIsFallback(hasFallback);

        if (recoveryRes.error || patientRes.error || notificationsRes.error) {
          setErrorMsg(recoveryRes.error || patientRes.error || notificationsRes.error);
        }

        // Set state values
        setPatient(patientRes.data);
        setNotifications(notificationsRes.data);

        const rData = recoveryRes.data;
        setProfile(rData.profile);
        setProgressPoints(rData.progressPoints);
        setSymptoms(rData.symptoms);
        setMilestones(rData.milestones);
        setMedications(rData.medications);
        setLifestyle(rData.lifestyle);
        setWellnessScore(rData.wellnessScore);
        setAchievements(rData.achievements);
        setJournal(rData.journal);

      } catch (err: any) {
        console.error('Failed to load page 10 recovery dataset, loading fallbacks.', err);
        setIsFallback(true);
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecoveryData();
  }, []);

  const handleToggleMed = async (id: string) => {
    try {
      const res = await recoveryApi.toggleMedication(id);
      if (res.data) {
        setMedications(prev => prev.map(m => m.id === id ? { ...m, completed: res.data.completed } : m));
      }
    } catch (err) {
      console.error('Medication status toggle failed', err);
    }
  };

  const handleAddJournalEntry = async (entry: { notes: string; mood: 'Great' | 'Good' | 'Neutral' | 'Fatigued'; healthFeedback: string }) => {
    try {
      const res = await recoveryApi.addJournalEntry(entry);
      if (res.data) {
        setJournal(prev => [res.data, ...prev]);
      }
    } catch (err) {
      console.error('Add journal entry failed', err);
    }
  };

  if (loading || !patient || !profile || !wellnessScore) {
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
        activeTab="recovery"
        setActiveTab={() => {}}
      >
        <div className="space-y-8 print:space-y-6">
          
          {/* 1. VIBRANT TREATMENT PLAN HEADER */}
          <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-500/10 print:border-black print:text-black print:bg-none print:shadow-none">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none print:hidden" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none print:hidden" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-accent px-4 py-1 rounded-full inline-block border border-accent/25 print:border-black print:text-black">
                  Clinical Path: {profile.currentStage}
                </span>
                <h1 className="font-serif text-2xl md:text-3xl font-black leading-tight">
                  {profile.condition}
                </h1>
                <p className="text-xs text-white/80 max-w-xl font-medium leading-relaxed print:text-black">
                  Active treatment plan: <strong className="text-accent print:text-black">{profile.treatmentPlan}</strong>, prescribed under expert Vaidya consultant <strong className="text-white print:text-black">{profile.doctorName}</strong>.
                </p>
              </div>

              {/* Progress Summary indicators */}
              <div className="flex flex-wrap gap-4 shrink-0 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl print:border-black print:text-black print:bg-none">
                <div className="text-left text-xs">
                  <span className="text-white/60 text-[9px] uppercase font-black block print:text-black">Plan Period</span>
                  <strong className="text-white text-xs font-bold block print:text-black">{profile.startDate} to {profile.expectedRecoveryDate}</strong>
                </div>
                <div className="w-px h-8 bg-white/20 print:bg-black/20" />
                <div className="text-left text-xs">
                  <span className="text-white/60 text-[9px] uppercase font-black block print:text-black">Current Completion</span>
                  <strong className="text-accent text-sm font-black print:text-black">{profile.completionPercentage}% Achieved</strong>
                </div>
              </div>
            </div>
          </section>

          {/* 2. STATS OVERVIEW CARDS */}
          <RecoveryOverviewCard
            completionPercentage={profile.completionPercentage}
            healthScore={wellnessScore.overall}
            energyLevel={progressPoints[progressPoints.length - 1]?.energyLevel || 85}
            sleepQuality={progressPoints[progressPoints.length - 1]?.sleepQuality || 80}
            stressLevel={progressPoints[progressPoints.length - 1]?.stressLevel || 30}
          />

          {/* 3. CORE ANALYTICS AND DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left 2 Columns: Charts, Symptoms, Timeline, Comparison */}
            <div className="lg:col-span-2 space-y-8 print:col-span-3">
              {/* Monthly/Weekly recovery curves */}
              <RecoveryChart
                weeklyData={progressPoints}
                monthlyData={[]} // Use points for general plotting
                condition={profile.condition}
              />

              {/* Symptom Tracker */}
              <SymptomTracker symptoms={symptoms} />

              {/* Milestones Checklist */}
              <MilestoneTracker milestones={milestones} />

              {/* Healing Journey Timeline */}
              <HealingTimeline />

              {/* Start vs Current Comparison */}
              <ProgressComparison />

              {/* Document Exporters */}
              <ReportExporter
                profile={profile}
                progressPoints={progressPoints}
                symptoms={symptoms}
                milestones={milestones}
                medications={medications}
                isFallback={isFallback}
              />
            </div>

            {/* Right Column: Herbs, Lifestyle, Scores, Recommendations, Calendar, Alarms */}
            <div className="space-y-8 print:hidden">
              {/* Herbs schedule & logging checklist */}
              <MedicationTracker
                medications={medications}
                onToggleMed={handleToggleMed}
              />

              {/* Lifestyle compliance metrics */}
              <LifestyleTracker lifestyleMetrics={lifestyle} />

              {/* Wellness Score board */}
              <WellnessScoreCard score={wellnessScore} />

              {/* AI Insight Card */}
              <AIRecommendationCard doshaType="Vata-Kapha" />

              {/* Notification Alarm Panel */}
              <NotificationPanel />

              {/* Daily Schedule Calendar widget */}
              <RecoveryCalendar />
            </div>

          </div>

          {/* 4. FULL WIDTH TIMELINE HISTORY & BADGES */}
          <div className="space-y-8 print:space-y-6">
            {/* Healing Achievements */}
            <AchievementBadge achievements={achievements} />

            {/* Daily Veda Log Form & Scrollable timeline */}
            <div className="print:hidden">
              <RecoveryJournal
                entries={journal}
                onAddEntry={handleAddJournalEntry}
              />
            </div>
          </div>

        </div>
      </DashboardLayout>
    </div>
  );
};

export default RecoveryDashboard;
