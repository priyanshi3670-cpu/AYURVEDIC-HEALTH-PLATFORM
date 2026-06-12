import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  message?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ message = 'Using offline demo data' }) => {
  return (
    <div className="bg-amber-500/10 border border-amber-300 text-amber-900 py-3.5 px-5 rounded-2xl flex items-center space-x-3 shadow-sm max-w-2xl mx-auto mb-8 animate-fade-in-up">
      <AlertCircle className="w-5 h-5 text-accent shrink-0 animate-bounce" />
      <div className="text-xs font-semibold leading-relaxed">
        <strong>Ecosystem Status:</strong> {message}. Connection to local API server could not be established. Displaying offline-cached records.
      </div>
    </div>
  );
};

export default ErrorFallback;
