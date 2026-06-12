import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { Patient, Notification } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  patient: Patient;
  isFallback: boolean;
  notifications: Notification[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  patient,
  isFallback,
  notifications,
  activeTab,
  setActiveTab
}) => {
  return (
    <div className="flex bg-[#F8FFF8] min-h-screen font-sans">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        notificationsCount={notifications.length} 
      />

      {/* Main viewport area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavbar 
          patient={patient} 
          isFallback={isFallback} 
          notifications={notifications}
          onNotificationClick={() => setActiveTab('notifications')}
        />

        {/* Content canvas container */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
