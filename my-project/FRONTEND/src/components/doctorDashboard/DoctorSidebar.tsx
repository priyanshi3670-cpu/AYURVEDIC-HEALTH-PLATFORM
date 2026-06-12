import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Users, Activity, 
  FileText, DollarSign, BarChart2, MessageSquare, 
  Bell, User, Settings, LogOut, Sparkles 
} from 'lucide-react';

interface DoctorSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notificationsCount: number;
}

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ activeTab, setActiveTab, notificationsCount }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'patients', name: 'Patients', icon: Users },
    { id: 'schedule', name: 'Schedule', icon: Activity },
    { id: 'treatments', name: 'Treatments', icon: FileText },
    { id: 'earnings', name: 'Earnings', icon: DollarSign },
    { id: 'analytics', name: 'Analytics', icon: BarChart2 },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'notifications', name: 'Notifications', icon: Bell, badgeCount: notificationsCount },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="font-serif text-base font-black text-primary leading-none">AyurVeda</h1>
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-widest">Doctor Portal</span>
          </div>
        </div>
      </div>

      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'profile' || item.id === 'settings') {
                  navigate('/doctor-profile-settings');
                }
                setActiveTab(item.id);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}`} />
                <span>{item.name}</span>
              </div>
              
              {item.badgeCount !== undefined && item.badgeCount > 0 && (
                <span className={`text-[9px] font-black h-4 min-w-4 flex items-center justify-center rounded-full px-1 ${
                  isActive ? 'bg-white text-primary' : 'bg-red-500 text-white'
                }`}>
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout Portal</span>
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
