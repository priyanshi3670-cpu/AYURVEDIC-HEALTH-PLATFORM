import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiActivity, FiStar } from 'react-icons/fi';

import DoctorSidebar from '../components/doctorDashboard/DoctorSidebar';
import DoctorNavbar from '../components/doctorDashboard/DoctorNavbar';
import StatCard from '../components/doctorDashboard/StatCard';
import AppointmentCard from '../components/doctorDashboard/AppointmentCard';
import PatientCard from '../components/doctorDashboard/PatientCard';
import TreatmentOverview from '../components/doctorDashboard/TreatmentOverview';
import EarningsCard from '../components/doctorDashboard/EarningsCard';
import RevenueChart from '../components/doctorDashboard/RevenueChart';
import PatientGrowthChart from '../components/doctorDashboard/PatientGrowthChart';
import CalendarWidget from '../components/doctorDashboard/CalendarWidget';
import NotificationPanel from '../components/doctorDashboard/NotificationPanel';
import MessagePanel from '../components/doctorDashboard/MessagePanel';
import PerformanceCard from '../components/doctorDashboard/PerformanceCard';
import QuickActions from '../components/doctorDashboard/QuickActions';
import ReviewCard from '../components/doctorDashboard/ReviewCard';
import LoadingSkeleton from '../components/doctorDashboard/LoadingSkeleton';
import ErrorFallback from '../components/doctorDashboard/ErrorFallback';

import { doctorApi } from '../services/doctorApi';
import { appointmentApi } from '../services/appointmentApi';
import { doctorPatientApi } from '../services/doctorPatientApi';
import { earningApi } from '../services/earningApi';
import { analyticsApi } from '../services/analyticsApi';

const DoctorDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  // Data states
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  // Mock Notifications & Reviews for now
  const notifications = [
    { id: '1', title: 'New Appointment', message: 'Rahul Verma booked an appointment', time: '10 mins ago', type: 'Update', read: false },
    { id: '2', title: 'Treatment Plan Expiring', message: 'Priyanshi Sharma treatment plan ends tomorrow', time: '1 hr ago', type: 'Alert', read: false },
    { id: '3', title: 'New Review', message: '5-star rating from Amit Kumar', time: '3 hrs ago', type: 'Review', read: true }
  ];

  const reviews = [
    { id: '1', patientName: 'Amit Kumar', rating: 5, review: 'Dr. Arun is amazing. Highly recommended!', date: 'June 10, 2026' },
    { id: '2', patientName: 'Neha Singh', rating: 5, review: 'Very patient and understanding doctor.', date: 'June 8, 2026' },
  ];

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        profRes,
        aptRes,
        patRes,
        earnRes,
        analytRes
      ] = await Promise.all([
        doctorApi.getProfile(),
        appointmentApi.getAppointments(),
        doctorPatientApi.getPatients(),
        earningApi.getEarnings(),
        analyticsApi.getAnalytics()
      ]);

      setProfile(profRes.data);
      setAppointments(aptRes.data);
      setPatients(patRes.data);
      setEarnings(earnRes.data);
      setAnalytics(analytRes.data);

      if (profRes.isFallback || aptRes.isFallback || patRes.isFallback || earnRes.isFallback || analytRes.isFallback) {
        setIsFallback(true);
      } else {
        setIsFallback(false);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load doctor dashboard data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error || !profile) return <ErrorFallback error={error || "Failed to load"} onRetry={loadData} />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar activeTab={activeTab} setActiveTab={setActiveTab} notificationsCount={2} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <DoctorNavbar doctor={profile} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Fallback Banner */}
          {isFallback && (
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm flex items-center">
              <svg className="h-5 w-5 text-yellow-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-yellow-700 font-medium">
                Backend connection unavailable. Using Demo Data for dashboard.
              </p>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-in pb-24">
              {/* Header Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Patients" value={1250} icon={<FiUsers className="w-6 h-6" />} trend="8.5%" trendUp={true} colorClass="border-blue-500" />
                <StatCard title="Today's Appts" value={24} icon={<FiCalendar className="w-6 h-6" />} trend="12%" trendUp={true} colorClass="border-primary" />
                <StatCard title="Pending Consults" value={8} icon={<FiActivity className="w-6 h-6" />} trend="5%" trendUp={false} colorClass="border-yellow-500" />
                <StatCard title="Average Rating" value={profile.rating} icon={<FiStar className="w-6 h-6" />} trend="0.2" trendUp={true} colorClass="border-accent" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Revenue Chart */}
                  <RevenueChart data={analytics.revenueTrend} />
                  
                  {/* Two Column Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PatientGrowthChart data={analytics.patientGrowth} />
                    <TreatmentOverview />
                  </div>

                  {/* Upcoming Appointments */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900">Today's Schedule</h3>
                      <button className="text-primary text-sm font-medium hover:underline">View Calendar</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appointments.slice(0, 4).map((apt) => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                    </div>
                  </div>

                  {/* Recent Patients */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900">Recent Patients</h3>
                      <button className="text-primary text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {patients.slice(0, 4).map((patient) => (
                        <PatientCard key={patient.id} patient={patient} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  <EarningsCard earnings={earnings} />
                  <QuickActions />
                  <CalendarWidget />
                  <PerformanceCard />
                  <MessagePanel />
                  <NotificationPanel notifications={notifications} />
                  
                  {/* Reviews Summary */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-900">Recent Reviews</h3>
                    </div>
                    <div>
                      {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <FiActivity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</p>
                <p className="text-sm">This module is under development.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;
