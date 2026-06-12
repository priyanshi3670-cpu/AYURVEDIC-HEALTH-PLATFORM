import React from 'react';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

interface ErrorFallbackProps {
  error: string;
  onRetry: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-red-100">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiAlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
        <p className="text-gray-600 text-sm mb-6">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <FiRefreshCw /> Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
