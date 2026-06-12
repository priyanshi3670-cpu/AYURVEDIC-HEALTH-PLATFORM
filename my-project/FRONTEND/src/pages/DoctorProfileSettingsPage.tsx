import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiClock, FiAward, FiStar, FiSettings, FiShield } from 'react-icons/fi';

import DoctorSidebar from '../components/doctorDashboard/DoctorSidebar';
import DoctorNavbar from '../components/doctorDashboard/DoctorNavbar';

import DoctorProfileHero from '../components/doctorProfile/DoctorProfileHero';
import ProfileCompletionCard from '../components/doctorProfile/ProfileCompletionCard';
import PersonalInfoForm from '../components/doctorProfile/PersonalInfoForm';
import ProfessionalInfoForm from '../components/doctorProfile/ProfessionalInfoForm';
import SpecializationManager from '../components/doctorProfile/SpecializationManager';
import AvailabilityScheduler from '../components/doctorProfile/AvailabilityScheduler';
import ConsultationSettings from '../components/doctorProfile/ConsultationSettings';
import ClinicAffiliationCard from '../components/doctorProfile/ClinicAffiliationCard';
import CertificationUploader from '../components/doctorProfile/CertificationUploader';
import PublicProfilePreview from '../components/doctorProfile/PublicProfilePreview';
import ReviewCard from '../components/doctorProfile/ReviewCard';
import AnalyticsCard from '../components/doctorProfile/AnalyticsCard';
import VerificationStatus from '../components/doctorProfile/VerificationStatus';
import NotificationSettings from '../components/doctorProfile/NotificationSettings';
import SecuritySettings from '../components/doctorProfile/SecuritySettings';
import QuickActionPanel from '../components/doctorProfile/QuickActionPanel';
import LoadingSkeleton from '../components/doctorProfile/LoadingSkeleton';
import ErrorFallback from '../components/doctorProfile/ErrorFallback';

import { doctorProfileApi, MOCK_DOCTOR_FULL_PROFILE } from '../services/doctorProfileApi';
import { availabilityApi, MOCK_AVAILABILITY, MOCK_SETTINGS } from '../services/availabilityApi';
import { certificationApi, MOCK_CERTIFICATIONS, MOCK_CLINICS } from '../services/certificationApi';
import { reviewApi, MOCK_REVIEWS } from '../services/reviewApi';

import type { DoctorFullProfile, DoctorAvailability, DoctorCertification, DoctorClinicAffiliation, DoctorReviewModel, DoctorConsultationSettings } from '../types';

const DoctorProfileSettingsPage: React.FC = () => {
  const [sidebarTab, setSidebarTab] = useState('profile');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState<DoctorFullProfile>(MOCK_DOCTOR_FULL_PROFILE);
  const [availability, setAvailability] = useState<DoctorAvailability[]>(MOCK_AVAILABILITY);
  const [consultationSettings, setConsultationSettings] = useState<DoctorConsultationSettings>(MOCK_SETTINGS);
  const [certifications, setCertifications] = useState<DoctorCertification[]>(MOCK_CERTIFICATIONS);
  const [clinics, setClinics] = useState<DoctorClinicAffiliation[]>(MOCK_CLINICS);
  const [reviews, setReviews] = useState<DoctorReviewModel[]>(MOCK_REVIEWS);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [profRes, availRes, settRes, certRes, clinRes, revRes] = await Promise.all([
        doctorProfileApi.getProfile(),
        availabilityApi.getAvailability(),
        availabilityApi.getSettings(),
        certificationApi.getCertifications(),
        certificationApi.getClinics(),
        reviewApi.getReviews(),
      ]);

      setProfile(profRes.data);
      setAvailability(availRes.data);
      setConsultationSettings(settRes.data);
      setCertifications(certRes.data);
      setClinics(clinRes.data);
      setReviews(revRes.data);

      const anyFallback = profRes.isFallback || availRes.isFallback || settRes.isFallback || certRes.isFallback || clinRes.isFallback || revRes.isFallback;
      setIsFallback(anyFallback);
    } catch (err) {
      console.error(err);
      setError('Unable to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveProfile = async (data: any) => {
    setIsSaving(true);
    try {
      const res = await doctorProfileApi.updateProfile(data);
      setProfile(res.data);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAvailability = async (data: DoctorAvailability[]) => {
    setIsSaving(true);
    try {
      await availabilityApi.updateAvailability(data);
      setAvailability(data);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSpecializationsUpdate = (specs: string[]) => {
    setProfile(prev => ({ ...prev, specializations: specs }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser className="w-4 h-4" /> },
    { id: 'availability', label: 'Availability', icon: <FiClock className="w-4 h-4" /> },
    { id: 'certifications', label: 'Certifications', icon: <FiAward className="w-4 h-4" /> },
    { id: 'reviews', label: 'Reviews', icon: <FiStar className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <FiShield className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DoctorSidebar activeTab={sidebarTab} setActiveTab={setSidebarTab} notificationsCount={0} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="h-20 bg-white border-b border-gray-200" />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <LoadingSkeleton />
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DoctorSidebar activeTab={sidebarTab} setActiveTab={setSidebarTab} notificationsCount={0} />
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="h-20 bg-white border-b border-gray-200" />
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <ErrorFallback error={error} onRetry={loadData} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar activeTab={sidebarTab} setActiveTab={setSidebarTab} notificationsCount={2} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DoctorNavbar doctor={{
          id: profile.id,
          name: profile.fullName,
          photo: profile.profilePhoto,
          specialization: profile.qualification,
          qualification: profile.qualification,
          experience: `${profile.experience} Years`,
          rating: profile.rating,
          clinicName: clinics[0]?.clinicName || '',
          city: profile.city,
          email: profile.email,
          phone: profile.phone,
        }} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Fallback Banner */}
          {isFallback && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm flex items-center">
              <svg className="h-5 w-5 text-yellow-400 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-yellow-700 font-medium">
                Backend connection unavailable. Using Demo Data for your profile.
              </p>
            </div>
          )}

          <div className="space-y-6 pb-24">
            {/* Hero */}
            <DoctorProfileHero profile={profile} />

            {/* Tab Navigation */}
            <div className="flex bg-white border border-gray-200 p-1.5 rounded-xl overflow-x-auto no-scrollbar shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* ── PROFILE TAB ── */}
              {activeTab === 'profile' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <PersonalInfoForm profile={profile} onSave={handleSaveProfile} isSaving={isSaving} />
                    <ProfessionalInfoForm profile={profile} onSave={handleSaveProfile} isSaving={isSaving} />
                    <SpecializationManager specializations={profile.specializations} onUpdate={handleSpecializationsUpdate} />
                  </div>
                  <div className="space-y-6">
                    <ProfileCompletionCard percentage={profile.completionPercentage} />
                    <VerificationStatus profile={profile} />
                    <PublicProfilePreview profile={profile} />
                    <AnalyticsCard />
                    <QuickActionPanel onTabChange={setActiveTab} />
                  </div>
                </div>
              )}

              {/* ── AVAILABILITY TAB ── */}
              {activeTab === 'availability' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <AvailabilityScheduler availability={availability} onSave={handleSaveAvailability} isSaving={isSaving} />
                  </div>
                  <div className="space-y-6">
                    <ConsultationSettings settings={consultationSettings} />
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Clinic Affiliations</h3>
                        <button className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                          + Add Clinic
                        </button>
                      </div>
                      <div className="space-y-3">
                        {clinics.map((clinic) => (
                          <ClinicAffiliationCard key={clinic.id} clinic={clinic} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CERTIFICATIONS TAB ── */}
              {activeTab === 'certifications' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CertificationUploader certifications={certifications} />
                  </div>
                  <div className="space-y-6">
                    <VerificationStatus profile={profile} />
                    <QuickActionPanel onTabChange={setActiveTab} />
                  </div>
                </div>
              )}

              {/* ── REVIEWS TAB ── */}
              {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="font-bold text-gray-900">Patient Reviews</h3>
                          <p className="text-sm text-gray-500">{reviews.length} reviews • {profile.rating} average rating</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <AnalyticsCard />
                    <PublicProfilePreview profile={profile} />
                  </div>
                </div>
              )}

              {/* ── SETTINGS TAB ── */}
              {activeTab === 'settings' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <NotificationSettings />
                  </div>
                  <div className="space-y-6">
                    <ProfileCompletionCard percentage={profile.completionPercentage} />
                    <QuickActionPanel onTabChange={setActiveTab} />
                  </div>
                </div>
              )}

              {/* ── SECURITY TAB ── */}
              {activeTab === 'security' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <SecuritySettings />
                  </div>
                  <div className="space-y-6">
                    <VerificationStatus profile={profile} />
                    <QuickActionPanel onTabChange={setActiveTab} />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorProfileSettingsPage;
