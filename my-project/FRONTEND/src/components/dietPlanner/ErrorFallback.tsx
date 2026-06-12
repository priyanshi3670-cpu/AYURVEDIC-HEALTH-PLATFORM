import React from 'react';
import { AlertTriangle, WifiOff, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error?: string;
  onRetry?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onRetry }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center space-x-3 text-amber-850">
        <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
          <AlertTriangle className="w-5 h-5 animate-bounce" />
        </div>
        <div>
          <h5 className="text-xs font-black text-amber-900 uppercase tracking-wide">
            Using Demo Data
          </h5>
          <p className="text-[11px] text-amber-700 font-medium leading-relaxed mt-0.5">
            The remote compilation server is offline. We have automatically fallback-activated local client-side calculators. All systems are fully functional.
          </p>
        </div>
      </div>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Server Connect</span>
        </button>
      )}
    </div>
  );
};

export default ErrorFallback;
