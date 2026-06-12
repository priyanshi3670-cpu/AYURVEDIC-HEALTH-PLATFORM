import React from 'react';
import { FiActivity, FiCheckCircle, FiClock } from 'react-icons/fi';

const TreatmentOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Treatment Overview</h3>
        <button className="text-primary text-sm font-medium hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-3 bg-blue-50/50 rounded-xl">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <FiActivity className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Active Treatments</h4>
            <p className="text-xs text-gray-500">Currently undergoing therapy</p>
          </div>
          <div className="text-xl font-bold text-gray-900">45</div>
        </div>
        
        <div className="flex items-center gap-4 p-3 bg-green-50/50 rounded-xl">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <FiCheckCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Completed Treatments</h4>
            <p className="text-xs text-gray-500">Successfully recovered this month</p>
          </div>
          <div className="text-xl font-bold text-gray-900">28</div>
        </div>
        
        <div className="flex items-center gap-4 p-3 bg-yellow-50/50 rounded-xl">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
            <FiClock className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">Pending Follow-Ups</h4>
            <p className="text-xs text-gray-500">Scheduled for next 7 days</p>
          </div>
          <div className="text-xl font-bold text-gray-900">12</div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentOverview;
