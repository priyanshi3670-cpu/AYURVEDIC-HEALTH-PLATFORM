import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero card loading */}
      <div className="bg-white border border-emerald-950/5 rounded-3xl p-8 h-48 flex flex-col justify-between shadow-sm">
        <div className="space-y-3">
          <div className="h-4 w-32 bg-emerald-950/5 rounded"></div>
          <div className="h-6 w-3/4 bg-emerald-950/5 rounded"></div>
          <div className="h-3 w-1/2 bg-emerald-950/5 rounded"></div>
        </div>
        <div className="h-10 w-40 bg-emerald-950/5 rounded-xl"></div>
      </div>

      {/* Grid of dosha cards loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="bg-white border border-emerald-950/5 rounded-3xl p-6 h-64 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="h-5 w-24 bg-emerald-950/5 rounded"></div>
              <div className="h-3 w-full bg-emerald-950/5 rounded"></div>
              <div className="h-3 w-5/6 bg-emerald-950/5 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-2/3 bg-emerald-950/5 rounded"></div>
              <div className="h-3 w-1/2 bg-emerald-950/5 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
