import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Activity, 
  FileText, 
  Compass, 
  Brain, 
  Bell, 
  User, 
  LogOut,
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notificationsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, notificationsCount }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'recovery', name: 'Recovery Tracker', icon: Activity },
    { id: 'records', name: 'Medical Records', icon: FileText },
    { id: 'diet', name: 'Diet Planner', icon: UtensilsCrossed },
    { id: 'dosha', name: 'Dosha Analysis', icon: Compass },
    { id: 'ai-assistant', name: 'AI Assistant', icon: Brain, isPremium: true },
    { id: 'notifications', name: 'Notifications', icon: Bell, badgeCount: notificationsCount },
    { id: 'profile', name: 'Profile Settings', icon: User }
  ];

  const handleItemClick = (id: string) => {
    if (id === 'recovery') {
      navigate('/recovery-tracker');
    } else if (id === 'dosha') {
      navigate('/dosha-analysis');
    } else if (id === 'diet') {
      navigate('/diet-planner');
    } else if (id === 'ai-assistant') {
      navigate('/ai-assistant');
    } else if (id === 'profile') {
      navigate('/profile-settings');
    } else {
      if (
        window.location.pathname === '/recovery-tracker' ||
        window.location.pathname === '/dosha-analysis' ||
        window.location.pathname === '/diet-planner' ||
        window.location.pathname === '/ai-assistant' ||
        window.location.pathname === '/profile-settings'
      ) {
        navigate('/dashboard', { state: { activeTab: id } });
      } else {
        setActiveTab(id);
      }
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-emerald-800/10 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Upper Logo / Banner */}
      <div className="p-6 border-b border-emerald-800/5">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif text-base font-black text-primary leading-none">AyurVeda</h1>
            <span className="text-[9px] uppercase font-bold text-accent tracking-widest">Connect Portal</span>
          </div>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-text-secondary hover:bg-[#F8FFF8] hover:text-primary'
              }`}
            >
              <div className="flex items-center space-x-3">
                <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-primary'}`} />
                <span>{item.name}</span>
              </div>
              
              {/* Badges or markers */}
              {item.isPremium && (
                <span className={`text-[8px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20 text-accent' : 'bg-amber-500/10 text-amber-700'
                }`}>
                  AI
                </span>
              )}

              {item.badgeCount !== undefined && item.badgeCount > 0 && (
                <span className={`text-[9px] font-black h-4 min-w-4 flex items-center justify-center rounded-full px-1 ${
                  isActive ? 'bg-accent text-primary' : 'bg-red-500 text-white'
                }`}>
                  {item.badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-emerald-800/5">
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

export default Sidebar;
