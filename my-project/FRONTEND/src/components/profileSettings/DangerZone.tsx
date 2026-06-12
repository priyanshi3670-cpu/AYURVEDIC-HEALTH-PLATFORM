import React, { useState } from 'react';
import { FiAlertTriangle, FiTrash2, FiPauseCircle } from 'react-icons/fi';

const DangerZone: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
      <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
        <FiAlertTriangle /> Danger Zone
      </h2>
      
      <p className="text-gray-600 mb-6 text-sm">
        These actions are irreversible or have significant consequences for your account. Please proceed with caution.
      </p>

      <div className="space-y-4">
        {/* Deactivate Account */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h4 className="font-semibold text-gray-900">Deactivate Account</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-lg">
              Temporarily hide your profile. You can reactivate it anytime by logging back in. Your data will remain intact.
            </p>
          </div>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap">
            <FiPauseCircle /> Deactivate
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <h4 className="font-semibold text-red-600">Delete Account</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-lg">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button 
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <FiTrash2 /> Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <FiAlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account?</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to permanently delete your account? All your medical records, appointments, and saved data will be lost immediately. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Account deletion simulated.');
                  setShowConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;
