export interface Doctor {
    id: string;
    name: string;
    photo: string;
    specialization: string;
    qualification: string;
    experience: number; // in years
    clinicName: string;
    city: string;
    state: string;
    rating: number; // out of 5
    reviewCount: number;
    consultationFee: number;
    languages: string[];
    about: string;
    availability: string; // e.g., "Mon-Sat, 10 AM - 5 PM"
    onlineConsultation: boolean;
    offlineConsultation: boolean;
    specialExpertise: string[];
    education: string[];
    awards: string[];
}

export interface Specialization {
    name: string;
    count: number;
}

export type ConsultationType = 'Online Video' | 'Clinic Visit' | 'Chat Connect';

export interface Review {
    id: string;
    doctorId: string;
    patientName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Appointment {
    id: string;
    doctorId: string;
    patientName: string;
    email: string;
    phone: string;
    appointmentDate: string;
    appointmentTime: string;
    consultationType: ConsultationType;
    notes?: string;
    status: 'Pending' | 'Confirmed' | 'Completed';
}

export interface TreatmentCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface TreatmentFAQ {
    question: string;
    answer: string;
}

export interface RecoveryTimelineStep {
    step: string;
    description: string;
    duration?: string;
}

export interface Treatment {
    id: string;
    name: string;
    slug: string;
    category: string;
    description: string;
    overview: string;
    benefits: string[];
    procedure: string;
    duration: string;
    recoveryTime: string;
    costEstimate: number;
    suitableFor: string[];
    contraindications: string[];
    precautions: string[];
    steps: string[];
    image: string;
    rating: number;
    reviewCount: number;
    faq: TreatmentFAQ[];
}

export interface TreatmentBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcedureStep {
  step: string;
  description: string;
}

export interface RecoveryMilestone {
  step: string;
  description: string;
}

export interface PersonalizedPlan {
  patientAge: number;
  healthGoal: string;
  doshaType: string;
  suggestedTherapy: string;
  suggestedDiet: string[];
  suggestedLifestyle: string[];
  expectedTimeline: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  benefits: string[];
  image: string;
}

export interface OpeningHour {
  day: string;
  hours: string;
  closed: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export type ClinicType = 'Ayurveda Clinic' | 'Ayurveda Hospital' | 'Panchakarma Center' | 'Wellness Center' | 'Holistic Healing Center';

export interface Clinic {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  type: ClinicType;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  rating: number;
  reviewCount: number;
  yearsEstablished: number;
  doctorsCount: number;
  services: string[];
  facilities: string[];
  openingHours: string;
  images: string[];
  latitude: number;
  longitude: number;
  gallery: GalleryImage[];
  packages: Package[];
  mission: string;
  history: string;
  openingHoursList: OpeningHour[];
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ClinicReview {
  id: string;
  clinicId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  recoveryResult?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
}

export interface PanchakarmaCenter {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  specialTherapies: string[];
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  profilePhoto: string;
  city: string;
  doshaType: string;
  healthGoals: string[];
  joinedDate: string;
}

export interface PatientDashboardAppointment {
  id: string;
  doctorName: string;
  specialization: string;
  clinic: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export interface RecoveryProgress {
  id: string;
  condition: string;
  progress: number;
  startDate: string;
  expectedCompletion: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  type: 'Report' | 'Prescription' | 'Document';
  date: string;
  doctorName: string;
  fileSize: string;
  fileUrl: string;
  category?: string;
  clinicName?: string;
  fileType?: string;
  description?: string;
  status?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'Appointment' | 'Reminder' | 'Tip' | 'System';
}

export interface HealthGoal {
  id: string;
  title: string;
  progress: number;
  target: string;
}

export interface WellnessMetric {
  dietAdherence: number;
  exerciseProgress: number;
  sleepQuality: number;
  waterIntake: number;
}

export interface AIRecommendation {
  suggestedDiet: string[];
  recommendedTreatment: string;
  lifestyleTips: string[];
  doctorFollowUpReminder: string;
}

export interface RecoveryProfile {
  id: string;
  patientName: string;
  condition: string;
  doctorName: string;
  treatmentPlan: string;
  startDate: string;
  expectedRecoveryDate: string;
  currentStage: string;
  completionPercentage: number;
}

export interface AdvancedRecoveryProgress {
  id: string;
  week: string;
  progressPercentage: number;
  healthScore: number;
  energyLevel: number;
  sleepQuality: number;
  stressLevel: number;
}

export interface SymptomRecord {
  id: string;
  symptom: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  status: 'Improving' | 'Stable' | 'Worsening';
  recordedDate: string;
  improvementPercentage: number;
}

export interface MilestoneRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Upcoming';
}

export interface MedicationRecord {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  completed: boolean;
  reminderActive: boolean;
}

export interface LifestyleMetricRecord {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  compliancePercentage: number;
}

export interface JournalEntryRecord {
  id: string;
  date: string;
  notes: string;
  mood: 'Great' | 'Good' | 'Neutral' | 'Fatigued';
  healthFeedback: string;
}

export interface RecoveryAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate?: string;
}

export interface RecoveryWellnessScore {
  overall: number;
  physical: number;
  mental: number;
  lifestyle: number;
}

export interface Prescription {
  id: string;
  doctorName: string;
  date: string;
  medicines: { name: string; dosage: string; frequency: string }[];
  duration: string;
  notes: string;
}

export interface LabReport {
  id: string;
  testName: string;
  date: string;
  result: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
  doctorName: string;
}

export interface TreatmentHistory {
  id: string;
  treatmentName: string;
  doctorName: string;
  clinicName: string;
  startDate: string;
  endDate: string;
  status: 'Completed' | 'Ongoing';
}

export type DocumentCategory = 'Prescription' | 'Report' | 'Lab Test' | 'Treatment History' | 'Invoice';

export interface Activity {
  id: string;
  title: string;
  type: 'Upload' | 'Download' | 'Visit' | 'New Report';
  timestamp: string;
  details: string;
}

export interface HealthInsight {
  id: string;
  title: string;
  description: string;
  category: 'Progress' | 'Trend' | 'Recommendation' | 'Suggestion';
}

export interface DoshaQuestion {
  id: string;
  question: string;
  category: string;
  options: string[];
  scoreMapping: { vata: number; pitta: number; kapha: number }[];
}

export interface DoshaAnswer {
  questionId: string;
  selectedOptionIndex: number;
}

export interface DoshaResult {
  id: string;
  patientName: string;
  assessmentDate: string;
  vataPercentage: number;
  pittaPercentage: number;
  kaphaPercentage: number;
  dominantDosha: string;
  secondaryDosha?: string;
  recommendations?: string[];
}

export interface Recommendation {
  diet: string[];
  lifestyle: string[];
  yoga: string[];
  meditation: string[];
  sleep: string[];
}

export interface FoodRecommendation {
  dosha: string;
  eat: string[];
  avoid: string[];
}

export interface DailyRoutine {
  wakeUp: string;
  morningMeal: string;
  midday: string;
  eveningMeal: string;
  sleepTime: string;
}

export interface TreatmentSuggestion {
  therapies: string[];
  panchakarma: string[];
  herbalSupport: string[];
}

export interface AssessmentHistory {
  id: string;
  date: string;
  vata: number;
  pitta: number;
  kapha: number;
  dominantDosha: string;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  doshaType: string;
  healthGoals: string[];
  medicalConditions: string[];
  dietPreference: string;
}

export interface DietPlan {
  id: string;
  planName: string;
  doshaType: string;
  goal: string;
  dailyCalories: number;
  duration: string;
  meals: Meal[];
  nutritionSummary: NutritionSummary;
}

export interface Meal {
  id: string;
  mealType: 'Breakfast' | 'Mid-Morning Snack' | 'Lunch' | 'Evening Snack' | 'Dinner' | 'Bedtime Drink';
  mealName: string;
  time: string;
  calories: number;
  ingredients: string[];
  benefits: string[];
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  waterTarget: number;
}

export interface WaterTracker {
  goal: number;
  current: number;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

export interface ProgressMetric {
  date: string;
  weight: number;
  bmi: number;
  adherenceRate: number;
}

export interface DietHistory {
  id: string;
  planName: string;
  dateGenerated: string;
  goal: string;
  calories: number;
  duration: string;
}

// ─── Page 14: AI Ayurveda Assistant ───

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

export interface AIResponse {
  id: string;
  question: string;
  answer: string;
  category: string;
  confidence: number;
  relatedTopics: string[];
}

export interface AIDoshaInsight {
  id: string;
  doshaType: string;
  strengths: string[];
  imbalances: string[];
  recommendedActions: string[];
  description: string;
}

export interface AIHealthTip {
  id: string;
  title: string;
  description: string;
  category: 'Daily' | 'Seasonal' | 'Stress' | 'Digestive';
  icon: string;
}

export interface AISymptomAnalysis {
  id: string;
  symptoms: string[];
  possibleInsights: string[];
  lifestyleSuggestions: string[];
  doctorConsultation: boolean;
  severity: 'Low' | 'Moderate' | 'High';
}

export interface AIConversationRecord {
  id: string;
  title: string;
  date: string;
  messageCount: number;
  lastMessage: string;
  category: string;
}

export interface AIBookmark {
  id: string;
  title: string;
  content: string;
  type: 'Advice' | 'Tip' | 'Recommendation';
  savedDate: string;
}

export interface AINotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'Health' | 'Diet' | 'Appointment';
  time: string;
  read: boolean;
}

export interface AIWellnessTask {
  id: string;
  task: string;
  icon: string;
  completed: boolean;
  time: string;
}

export interface AITreatmentRec {
  id: string;
  treatmentName: string;
  benefits: string[];
  estimatedDuration: string;
  recommendedDoctor: string;
  confidence: number;
}

export interface AIRecommendationCard {
  id: string;
  title: string;
  description: string;
  category: 'Diet' | 'Lifestyle' | 'Exercise' | 'Meditation' | 'Sleep';
  icon: string;
  tips: string[];
}

// ─── Page 15: Patient Profile & Settings ───

export interface FullUserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  profilePhoto: string;
  city: string;
  state: string;
  country: string;
  doshaType: string;
  healthGoals: string[];
  medicalConditions: string[];
  joinedDate: string;
  lifestylePreference: string;
  dietPreference: string;
  exercisePreference: string;
}

export interface AccountOverview {
  appointments: number;
  savedTreatments: number;
  medicalRecords: number;
  recoveryPlans: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  communicationMethod: 'Email' | 'SMS' | 'WhatsApp' | 'In-App';
  consultationType: 'Online' | 'Offline' | 'Both';
}

export interface NotificationPrefs {
  appointmentAlerts: boolean;
  medicineReminders: boolean;
  recoveryUpdates: boolean;
  aiRecommendations: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export interface PrivacyPrefs {
  profileVisibility: 'Public' | 'Doctors Only' | 'Private';
  healthDataSharing: boolean;
  doctorAccess: boolean;
  analyticsTracking: boolean;
}

export interface SecuritySettings {
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
  loginHistory: LoginEntry[];
}

export interface LoginEntry {
  id: string;
  date: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  status: 'Success' | 'Failed';
}

export interface ActiveDevice {
  id: string;
  deviceName: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface ActivityLog {
  id: string;
  title: string;
  type: 'Login' | 'Profile Update' | 'Appointment' | 'Download' | 'Settings';
  timestamp: string;
  details: string;
  icon: string;
}

export interface WellnessGoalItem {
  id: string;
  title: string;
  category: 'Weight' | 'Recovery' | 'Diet' | 'Exercise';
  target: string;
  current: string;
  progress: number;
  unit: string;
}

export interface SavedContentItem {
  id: string;
  title: string;
  type: 'Doctor' | 'Clinic' | 'Treatment' | 'Article';
  subtitle: string;
  savedDate: string;
  image?: string;
}

// ─── Page 16: Doctor Dashboard ───

export interface DoctorProfileModel {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  qualification: string;
  experience: string;
  rating: number;
  clinicName: string;
  city: string;
  email: string;
  phone: string;
}

export interface DoctorPatientModel {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  appointmentDate: string;
  status: 'Recovering' | 'Active' | 'Completed' | 'Pending';
  progress: number;
  lastVisit: string;
}

export interface DoctorAppointmentModel {
  id: string;
  patientName: string;
  date: string;
  time: string;
  consultationType: 'Online' | 'In-Clinic';
  status: 'Pending' | 'Completed' | 'Cancelled';
  condition?: string;
}

export interface DoctorEarningsModel {
  id: string;
  month: string;
  appointments: number;
  earnings: number;
  commission: number;
  netIncome: number;
}

export interface DoctorAnalyticsModel {
  revenueTrend: { month: string; amount: number }[];
  patientGrowth: { month: string; count: number }[];
  consultationTypes: { name: string; value: number }[];
  recoverySuccess: { metric: string; value: number }[];
}

export interface DoctorNotificationModel {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'Alert' | 'Update' | 'Review';
  read: boolean;
}

export interface DoctorReviewModel {
  id: string;
  patientName: string;
  rating: number;
  review: string;
  date: string;
}

export interface DoctorPerformanceMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
}

// ─── Page 17: Doctor Profile Settings ───

export interface DoctorFullProfile {
  id: string;
  fullName: string;
  profilePhoto: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  experience: number;
  qualification: string;
  specializations: string[];
  languages: string[];
  consultationFee: number;
  onlineConsultationFee: number;
  rating: number;
  reviewCount: number;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  medicalRegStatus: 'Verified' | 'Pending' | 'Rejected';
  profileApprovalStatus: 'Approved' | 'Under Review' | 'Rejected';
  completionPercentage: number;
}

export interface DoctorCertification {
  id: string;
  title: string;
  institution: string;
  issueDate: string;
  certificateUrl: string;
}

export interface DoctorAvailability {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  consultationMode: 'Online' | 'In-Clinic' | 'Both';
  slotDuration: number;
  status: 'Available' | 'Unavailable';
}

export interface DoctorClinicAffiliation {
  id: string;
  clinicName: string;
  address: string;
  city: string;
  consultationDays: string[];
}

export interface DoctorConsultationSettings {
  onlineConsultation: boolean;
  videoConsultation: boolean;
  clinicConsultation: boolean;
  homeVisit: boolean;
  emergencyConsultation: boolean;
}
