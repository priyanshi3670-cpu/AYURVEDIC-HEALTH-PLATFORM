import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface ErrorFallbackProps {
  error: string;
  onRetry: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
      <div className="bg-red-100 p-4 rounded-full mb-4">
        <FiAlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Profile</h3>
      <p className="text-gray-600 mb-6 max-w-md">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm"
      >
        <FiRefreshCw className="w-5 h-5" />
        <span>Try Again</span>
      </button>
    </div>
  );
};

export default ErrorFallback;
