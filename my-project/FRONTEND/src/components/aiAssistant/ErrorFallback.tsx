import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

interface ErrorFallbackProps {
  onRetry?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <FiAlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
        <div>
          <span className="text-xs font-bold text-amber-800">Using Demo Data</span>
          <p className="text-[10px] text-amber-600">Backend server unavailable. Showing local fallback responses.</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors cursor-pointer shrink-0"
        >
          <FiRefreshCw className="w-3 h-3" />
          Retry
        </button>
      )}
    </motion.div>
  );
};

export default ErrorFallback;
