import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  message?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ message = 'Using Demo Data' }) => {
  return (
    <div className="bg-amber-500/10 border border-amber-300 text-amber-900 py-3.5 px-5 rounded-2xl flex items-center space-x-3 shadow-sm max-w-xl mx-auto mb-6 animate-fade-in-up">
      <AlertTriangle className="w-5 h-5 text-[#D4AF37] shrink-0 animate-bounce" />
      <div className="text-xs font-bold leading-relaxed">
        <strong>Ecosystem Connection:</strong> {message}. Reaching the Partner Registry failed; loading secure offline cached details.
      </div>
    </div>
  );
};

export default ErrorFallback;
