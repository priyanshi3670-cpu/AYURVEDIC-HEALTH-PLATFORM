import React, { useState, useEffect, useRef } from 'react';
import { 
  UserProfile, 
  DietPlan, 
  FoodRecommendation as FoodRecType, 
  DietHistory, 
  ProgressMetric,
  Patient,
  Notification
} from '../types';
import { dietApi } from '../services/dietApi';
import { mealApi } from '../services/mealApi';
import { nutritionApi } from '../services/nutritionApi';
import patientApi from '../services/patientApi';
import patientNotificationApi from '../services/patientNotificationApi';

// Layout
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Sub-components
import DietHero from '../components/dietPlanner/DietHero';
import HealthProfileCard from '../components/dietPlanner/HealthProfileCard';
import DietGeneratorForm from '../components/dietPlanner/DietGeneratorForm';
import DietDashboard from '../components/dietPlanner/DietDashboard';
import MealPlanner from '../components/dietPlanner/MealPlanner';
import NutritionChart from '../components/dietPlanner/NutritionChart';
import FoodRecommendation from '../components/dietPlanner/FoodRecommendation';
import SeasonalDietCard from '../components/dietPlanner/SeasonalDietCard';
import DiseaseDietCard from '../components/dietPlanner/DiseaseDietCard';
import WaterTracker from '../components/dietPlanner/WaterTracker';
import GroceryList from '../components/dietPlanner/GroceryList';
import DietHistoryCardList from '../components/dietPlanner/DietHistory';
import NutritionSuggestion from '../components/dietPlanner/NutritionSuggestion';
import ProgressTracker from '../components/dietPlanner/ProgressTracker';
import DietExporter from '../components/dietPlanner/DietExporter';
import FAQSection from '../components/dietPlanner/FAQSection';
import LoadingSkeleton from '../components/dietPlanner/LoadingSkeleton';
import ErrorFallback from '../components/dietPlanner/ErrorFallback';

export const DietPlannerDashboard: React.FC = () => {
  // Portal Layout States
  const [patient, setPatient] = useState<Patient | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Diet Specific States
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activePlan, setActivePlan] = useState<DietPlan | null>(null);
  const [history, setHistory] = useState<DietHistory[]>([]);
  const [progress, setProgress] = useState<ProgressMetric[]>([]);
  const [recommendations, setRecommendations] = useState<FoodRecType | null>(null);
  
  // Interactive hydration state
  const [waterIntake, setWaterIntake] = useState(1200);

  // Status indicators
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // References for scrolling
  const recommendationsRef = useRef<HTMLDivElement>(null);

  // Initial Data Fetch
  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    let fallbackTriggered = false;

    try {
      // 1. Fetch Patient profile & notifications (for dashboard layout)
      const patientRes = await patientApi.getPatientProfile();
      setPatient(patientRes.data);
      if (patientRes.isFallback) fallbackTriggered = true;

      const notificationsRes = await patientNotificationApi.getNotifications();
      setNotifications(notificationsRes.data);
      if (notificationsRes.isFallback) fallbackTriggered = true;

      // 2. Fetch Diet Profile
      const profileRes = await dietApi.getProfile();
      setProfile(profileRes.data);
      if (profileRes.isFallback) fallbackTriggered = true;

      // 3. Fetch Diet Plans
      const plansRes = await dietApi.getPlans();
      if (plansRes.data && plansRes.data.length > 0) {
        setActivePlan(plansRes.data[0]);
        setWaterIntake(1200); // Reset or set default
      }
      if (plansRes.isFallback) fallbackTriggered = true;

      // 4. Fetch History List
      const historyRes = await dietApi.getHistory();
      setHistory(historyRes.data);
      if (historyRes.isFallback) fallbackTriggered = true;

      // 5. Fetch Progress Logs
      const progressRes = await nutritionApi.getNutrition();
      setProgress(progressRes.data.progress);
      if (progressRes.isFallback) fallbackTriggered = true;

      // 6. Fetch Food Recommendations
      const doshaToQuery = profileRes.data?.doshaType || 'Pitta';
      const recommendationsRes = await mealApi.getRecommendations(doshaToQuery);
      setRecommendations(recommendationsRes.data);
      if (recommendationsRes.isFallback) fallbackTriggered = true;

      setIsFallback(fallbackTriggered);
    } catch (err: any) {
      console.error('Failed to boot diet planner dashboard:', err.message);
      setErrorMsg(err.message);
      setIsFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Diet plan compilation form submit
  const handleGeneratePlan = async (formData: Omit<UserProfile, 'id'>) => {
    setIsLoading(true);
    try {
      const res = await dietApi.generatePlan(formData);
      
      // Update states
      setActivePlan(res.data);
      setProfile({ id: `profile-${Date.now()}`, ...formData });
      
      // Refetch foods recommendations based on new dominant Dosha
      const recRes = await mealApi.getRecommendations(formData.doshaType);
      setRecommendations(recRes.data);

      // Reload compilation list
      const histRes = await dietApi.getHistory();
      setHistory(histRes.data);

      setIsFallback(res.isFallback || recRes.isFallback || histRes.isFallback);
    } catch (err: any) {
      console.error('Failed to generate diet plan:', err.message);
      setErrorMsg(err.message);
      setIsFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch/Load historical compiled plan as active
  const handleLoadPlan = async (planId: string) => {
    setIsLoading(true);
    try {
      const plansRes = await dietApi.getPlans();
      const match = plansRes.data.find(p => p.id === planId);
      if (match) {
        setActivePlan(match);
      } else {
        // Build mock load
        const fallbackTarget = activePlan?.doshaType || 'Pitta';
        const dummyLoaded: DietPlan = {
          id: planId,
          planName: `Historical Compiled Plan (${planId})`,
          doshaType: fallbackTarget,
          goal: activePlan?.goal || 'General Health',
          dailyCalories: activePlan?.dailyCalories || 1700,
          duration: '30 Days',
          meals: activePlan?.meals || [],
          nutritionSummary: activePlan?.nutritionSummary || {
            calories: 1700,
            protein: 60,
            carbs: 220,
            fats: 45,
            waterTarget: 2500
          }
        };
        setActivePlan(dummyLoaded);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update Hydration Index
  const handleUpdateWater = (amount: number) => {
    setWaterIntake(amount);
  };

  // Add Progress Metric Log
  const handleAddProgressLog = (newMetric: ProgressMetric) => {
    setProgress(prev => [...prev, newMetric]);
  };

  const handleScrollToRecommendations = () => {
    recommendationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading && !profile) {
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
      
      {/* Error Fallback warning header */}
      {isFallback && (
        <ErrorFallback onRetry={fetchData} />
      )}

      {patient && (
        <DashboardLayout
          patient={patient}
          isFallback={isFallback}
          notifications={notifications}
          activeTab="diet"
          setActiveTab={() => {}}
        >
          <div className="space-y-8 print:space-y-6">
            
            {/* Title Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-50 pb-5">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-black text-gray-805 text-gray-850">
                  Ayurvedic Diet Planner
                </h1>
                <p className="text-xs text-gray-400 font-bold mt-1">
                  Personalized Pathya Ahara & Nutrition recommendation based on dominant Doshas
                </p>
              </div>
            </div>

            {/* Hero Header */}
            <DietHero
              onGenerateClick={() => setIsFormOpen(true)}
              onScrollToRecommendations={handleScrollToRecommendations}
            />

            {/* Main Grid: Left sidebar profile & Right meals list */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (Span 4) */}
              <div className="lg:col-span-4 space-y-8">
                {profile && (
                  <HealthProfileCard
                    profile={profile}
                    onEditClick={() => setIsFormOpen(true)}
                  />
                )}

                <ProgressTracker
                  progressData={progress}
                  onAddLog={handleAddProgressLog}
                />

                {activePlan && (
                  <DietExporter plan={activePlan} />
                )}
              </div>

              {/* Right Column (Span 8) */}
              <div className="lg:col-span-8 space-y-8">
                {activePlan && (
                  <>
                    <DietDashboard plan={activePlan} />
                    <MealPlanner meals={activePlan.meals} />
                  </>
                )}

                {/* Eat vs Avoid Guidelines */}
                <div ref={recommendationsRef}>
                  {recommendations && (
                    <FoodRecommendation recommendation={recommendations} />
                  )}
                </div>
              </div>
            </div>

            {/* Secondary Bottom Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activePlan && (
                <NutritionChart plan={activePlan} progressData={progress} />
              )}
              
              {profile && (
                <NutritionSuggestion dosha={profile.doshaType} goals={profile.healthGoals} />
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SeasonalDietCard />
              <DiseaseDietCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activePlan && (
                <>
                  <WaterTracker
                    target={activePlan.nutritionSummary.waterTarget}
                    current={waterIntake}
                    onUpdate={handleUpdateWater}
                  />
                  <GroceryList meals={activePlan.meals} />
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <DietHistoryCardList
                history={history}
                activePlanId={activePlan?.id || ''}
                onSelectPlan={handleLoadPlan}
              />
              <FAQSection />
            </div>

          </div>
        </DashboardLayout>
      )}

      {/* Form Wizard Modal */}
      <DietGeneratorForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleGeneratePlan}
        initialProfile={profile}
      />
    </div>
  );
};

export default DietPlannerDashboard;
