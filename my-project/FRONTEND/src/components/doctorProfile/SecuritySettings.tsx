import React from 'react';
import { FiShield, FiKey, FiSmartphone } from 'react-icons/fi';

const SecuritySettings: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiShield className="text-primary" /> Account Security
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
              <FiKey />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Change Password</p>
              <p className="text-xs text-gray-500">Last changed 3 months ago</p>
            </div>
          </div>
          <button className="text-sm font-medium text-primary hover:underline">Update</button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
              <FiSmartphone />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Two-Factor Auth (2FA)</p>
              <p className="text-xs text-gray-500">Add an extra layer of security</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
