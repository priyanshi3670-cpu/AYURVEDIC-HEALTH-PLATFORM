import React from 'react';
import { WifiOff, ShieldAlert, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorFallbackProps {
  isFallback: boolean;
  errorMsg?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ isFallback, errorMsg }) => {
  if (!isFallback) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-amber-50 border-b border-amber-500/20 px-4 py-2.5 sm:px-6 lg:px-8 text-amber-800 flex items-center justify-between"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 border border-amber-500/20">
            <WifiOff className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold text-amber-900 leading-normal">
            Using Demo Data <span className="opacity-80 font-medium">— Backend server at :5174 is offline. All records are stored locally in the browser sandbox.</span>
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          {errorMsg && (
            <span className="text-[9px] uppercase font-black tracking-wider text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 max-w-[150px] truncate">
              {errorMsg}
            </span>
          )}
          <span className="text-[9px] uppercase font-black tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-500/10">
            Offline Sandbox Active
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorFallback;
