import React from 'react';
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import { DoctorProfileModel } from '../../types';

interface DoctorNavbarProps {
  doctor: DoctorProfileModel;
}

const DoctorNavbar: React.FC<DoctorNavbarProps> = ({ doctor }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex-1 max-w-xl relative hidden md:block">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search patients, appointments, or treatments..." 
          className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <div className="flex items-center gap-3 border-r border-gray-200 pr-6">
          <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
            <FiSettings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{doctor.name}</p>
            <p className="text-xs text-gray-500">{doctor.specialization}</p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            {doctor.photo ? (
              <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center text-white font-bold">
                {doctor.name.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DoctorNavbar;
