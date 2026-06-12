import React, { useState } from 'react';
import { FiLock, FiKey, FiSmartphone, FiClock, FiCheck } from 'react-icons/fi';
import { SecuritySettings } from '../../types';

interface SecurityCenterProps {
  security: SecuritySettings;
}

const SecurityCenter: React.FC<SecurityCenterProps> = ({ security }) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(security.twoFactorEnabled);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-800"></div>
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiLock className="text-slate-800" /> Security Center
      </h2>

      <div className="space-y-6">
        {/* Password Management */}
        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FiKey className="text-gray-500" /> Password
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Last changed on {new Date(security.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
            <button 
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium whitespace-nowrap"
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {isChangingPassword && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                </div>
                <button className="w-full py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors font-medium">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Two Factor Auth */}
        <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <FiSmartphone className="text-gray-500" /> Two-Factor Authentication
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md">
              Add an extra layer of security to your account by requiring a code from your mobile device when logging in.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={twoFactorEnabled} 
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
            </label>
          </div>
        </div>

        {/* Login History Preview */}
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <FiClock className="text-gray-500" /> Recent Logins
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {security.loginHistory.slice(0, 3).map((login) => (
              <div key={login.id} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{login.device} • {login.browser}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{login.location} • {login.ip}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {login.status === 'Success' ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <FiCheck className="w-3 h-3" /> Success
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        Failed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{new Date(login.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SecurityCenter;
