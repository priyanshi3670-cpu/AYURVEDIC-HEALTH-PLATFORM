import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero cards row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="bg-white border border-emerald-950/5 rounded-2xl p-5 h-28 flex flex-col justify-between shadow-sm">
            <div className="h-3 w-16 bg-emerald-950/5 rounded"></div>
            <div className="h-6 w-12 bg-emerald-950/5 rounded"></div>
          </div>
        ))}
      </div>

      {/* Grid of documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="bg-white border border-emerald-950/5 rounded-2xl p-6 h-52 flex flex-col justify-between shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/5 shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 w-3/4 bg-emerald-950/5 rounded"></div>
                <div className="h-3 w-1/2 bg-emerald-950/5 rounded"></div>
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-emerald-950/5">
              <div className="h-3 w-2/3 bg-emerald-950/5 rounded"></div>
              <div className="h-3 w-1/2 bg-emerald-950/5 rounded"></div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <div className="h-8 w-20 bg-emerald-950/5 rounded-lg"></div>
              <div className="h-8 w-20 bg-emerald-950/5 rounded-lg"></div>
              <div className="h-8 w-20 bg-emerald-950/5 rounded-lg ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
