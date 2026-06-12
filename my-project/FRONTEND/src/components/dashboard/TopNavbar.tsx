import React, { useState } from 'react';
import { Search, Bell, AlertTriangle, CheckCircle2, User } from 'lucide-react';
import { Patient, Notification } from '../../types';

interface TopNavbarProps {
  patient: Patient;
  isFallback: boolean;
  notifications: Notification[];
  onNotificationClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  patient,
  isFallback,
  notifications,
  onNotificationClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-emerald-800/10 px-6 py-4 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Welcome & Search Bar */}
      <div className="flex items-center space-x-6 flex-grow">
        {/* Welcome */}
        <div className="hidden md:block shrink-0">
          <span className="text-[10px] uppercase font-bold text-text-secondary">Welcome back,</span>
          <h2 className="font-serif text-lg font-black text-primary leading-tight">
            {patient.name}
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search records, visits, advice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-gray-150 focus:border-primary rounded-xl pl-10 pr-4 py-2 text-xs text-text-primary font-semibold outline-none transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Connection status badge */}
        {isFallback ? (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 font-extrabold text-[9px] px-3 py-1.5 rounded-full flex items-center space-x-1.5 animate-pulse shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-accent" />
            <span>Using Demo Data</span>
          </div>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 font-extrabold text-[9px] px-3 py-1.5 rounded-full flex items-center space-x-1.5 shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span>Registry Live</span>
          </div>
        )}

        {/* Notification Bell */}
        <button
          onClick={onNotificationClick}
          className="relative bg-[#FAF9F6] border border-emerald-800/5 hover:border-primary/20 p-2.5 rounded-xl text-text-primary transition-all cursor-pointer shrink-0"
        >
          <Bell className="w-4 h-4" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          )}
        </button>

        {/* User Photo / Indicator */}
        <div className="flex items-center space-x-2.5 border-l border-emerald-800/15 pl-4 shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-primary/25 bg-gray-50">
            {patient.profilePhoto ? (
              <img 
                src={patient.profilePhoto} 
                alt={patient.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="hidden lg:block text-left text-[10px] leading-tight font-semibold">
            <span className="block text-text-primary font-bold">{patient.name}</span>
            <span className="text-accent text-[9px] font-black uppercase tracking-wider">{patient.doshaType}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
