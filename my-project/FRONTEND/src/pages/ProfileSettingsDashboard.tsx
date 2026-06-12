import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiSettings, FiShield, FiBell } from 'react-icons/fi';
import ProfileHero from '../components/profileSettings/ProfileHero';
import AccountOverviewCards from '../components/profileSettings/AccountOverviewCards';
import PersonalInfoForm from '../components/profileSettings/PersonalInfoForm';
import HealthProfileCard from '../components/profileSettings/HealthProfileCard';
import PreferenceSettings from '../components/profileSettings/PreferenceSettings';
import NotificationSettings from '../components/profileSettings/NotificationSettings';
import PrivacySettings from '../components/profileSettings/PrivacySettings';
import SecurityCenter from '../components/profileSettings/SecurityCenter';
import DeviceCard from '../components/profileSettings/DeviceCard';
import ActivityTimeline from '../components/profileSettings/ActivityTimeline';
import WellnessGoalCard from '../components/profileSettings/WellnessGoalCard';
import SavedContentGrid from '../components/profileSettings/SavedContentGrid';
import ExportPanel from '../components/profileSettings/ExportPanel';
import DangerZone from '../components/profileSettings/DangerZone';
import SupportPanel from '../components/profileSettings/SupportPanel';
import LoadingSkeleton from '../components/profileSettings/LoadingSkeleton';
import ErrorFallback from '../components/profileSettings/ErrorFallback';

import profileSettingsApi from '../services/profileSettingsApi';
import settingsApi from '../services/settingsApi';
import securityApi from '../services/securityApi';

const ProfileSettingsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Data states
  const [profileData, setProfileData] = useState<any>(null);
  const [overviewData, setOverviewData] = useState<any>(null);
  const [activityData, setActivityData] = useState<any>(null);
  const [savedData, setSavedData] = useState<any>(null);
  const [goalsData, setGoalsData] = useState<any>(null);
  const [appSettings, setAppSettings] = useState<any>(null);
  const [notificationPrefs, setNotificationPrefs] = useState<any>(null);
  const [privacyPrefs, setPrivacyPrefs] = useState<any>(null);
  const [securitySettings, setSecuritySettings] = useState<any>(null);
  const [activeDevices, setActiveDevices] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all needed data
      const [
        profRes,
        overRes,
        actRes,
        savRes,
        goalRes,
        appSetRes,
        notifRes,
        privRes,
        secRes,
        devRes
      ] = await Promise.all([
        profileSettingsApi.getProfile(),
        profileSettingsApi.getAccountOverview(),
        profileSettingsApi.getActivityLogs(),
        profileSettingsApi.getSavedContent(),
        profileSettingsApi.getWellnessGoals(),
        settingsApi.getSettings(),
        settingsApi.getNotificationPrefs(),
        settingsApi.getPrivacyPrefs(),
        securityApi.getSecuritySettings(),
        securityApi.getActiveDevices()
      ]);

      setProfileData(profRes.data);
      setOverviewData(overRes.data);
      setActivityData(actRes.data);
      setSavedData(savRes.data);
      setGoalsData(goalRes.data);
      setAppSettings(appSetRes.data);
      setNotificationPrefs(notifRes.data);
      setPrivacyPrefs(privRes.data);
      setSecuritySettings(secRes.data);
      setActiveDevices(devRes.data);

      // Check if any request used fallback
      if (
        profRes.isFallback || overRes.isFallback || actRes.isFallback || 
        savRes.isFallback || goalRes.isFallback || appSetRes.isFallback || 
        notifRes.isFallback || privRes.isFallback || secRes.isFallback || devRes.isFallback
      ) {
        setIsFallback(true);
      } else {
        setIsFallback(false);
      }
    } catch (err) {
      console.error("Failed to load profile data", err);
      setError("Unable to load profile data. Please check your connection.");
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
      const res = await profileSettingsApi.updateProfile(data);
      setProfileData(res.data);
      // alert('Profile updated successfully');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSettings = async (data: any) => {
    setIsSaving(true);
    try {
      const res = await settingsApi.updateSettings(data);
      setAppSettings(res.data);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotifications = async (data: any) => {
    setIsSaving(true);
    try {
      const res = await settingsApi.updateNotificationPrefs(data);
      setNotificationPrefs(res.data);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePrivacy = async (data: any) => {
    setIsSaving(true);
    try {
      const res = await settingsApi.updatePrivacyPrefs(data);
      setPrivacyPrefs(res.data);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoutDevice = async (id: string) => {
    try {
      await securityApi.logoutDevice(id);
      setActiveDevices(activeDevices.filter((d: any) => d.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <ErrorFallback error={error || "Failed to load"} onRetry={loadData} />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
    { id: 'security', label: 'Security', icon: <FiShield /> },
    { id: 'activity', label: 'Activity', icon: <FiBell /> }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 animate-fade-in pb-24">
      {/* Fallback Banner */}
      {isFallback && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 font-medium">
                Backend connection unavailable. Using Demo Data for profile and settings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header section with Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal profile, security, and platform preferences.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Rendering based on Tabs */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <ProfileHero profile={profileData} />
            <AccountOverviewCards overview={overviewData} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PersonalInfoForm profile={profileData} onSave={handleSaveProfile} isSaving={isSaving} />
              </div>
              <div className="space-y-6">
                <HealthProfileCard profile={profileData} />
                <SupportPanel />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PreferenceSettings settings={appSettings} onSave={handleSaveSettings} isSaving={isSaving} />
              <NotificationSettings prefs={notificationPrefs} onSave={handleSaveNotifications} isSaving={isSaving} />
            </div>
            <div className="space-y-6">
              <PrivacySettings prefs={privacyPrefs} onSave={handleSavePrivacy} isSaving={isSaving} />
              <ExportPanel />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SecurityCenter security={securitySettings} />
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Active Devices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeDevices.map((dev: any) => (
                    <DeviceCard key={dev.id} device={dev} onLogout={handleLogoutDevice} />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <DangerZone />
              <SupportPanel />
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ActivityTimeline logs={activityData} />
              <SavedContentGrid items={savedData} />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Wellness Goals</h2>
                <div className="space-y-4">
                  {goalsData.map((goal: any) => (
                    <WellnessGoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSettingsDashboard;
