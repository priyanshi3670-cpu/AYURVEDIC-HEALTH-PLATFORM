import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile and Header Row */}
      <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-emerald-950/5"></div>
            <div className="space-y-2">
              <div className="h-4 w-48 bg-emerald-950/5 rounded"></div>
              <div className="h-3 w-32 bg-emerald-950/5 rounded"></div>
            </div>
          </div>
          <div className="h-8 w-40 bg-emerald-950/5 rounded-xl"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-emerald-950/5">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-3 w-20 bg-emerald-950/5 rounded"></div>
              <div className="h-4 w-32 bg-emerald-950/5 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="bg-white border border-emerald-950/5 rounded-2xl p-5 h-36 flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-emerald-950/5 rounded"></div>
              <div className="w-8 h-8 rounded-xl bg-emerald-950/5"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 w-16 bg-emerald-950/5 rounded"></div>
              <div className="h-3 w-24 bg-emerald-950/5 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 h-96 shadow-sm">
            <div className="h-5 w-48 bg-emerald-950/5 rounded mb-6"></div>
            <div className="h-64 w-full bg-emerald-950/5 rounded-xl"></div>
          </div>
          <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 h-80 shadow-sm">
            <div className="h-5 w-48 bg-emerald-950/5 rounded mb-6"></div>
            <div className="h-48 w-full bg-emerald-950/5 rounded-xl"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 h-[400px] shadow-sm">
            <div className="h-5 w-32 bg-emerald-950/5 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-md bg-emerald-950/5"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-full bg-emerald-950/5 rounded"></div>
                    <div className="h-2.5 w-1/2 bg-emerald-950/5 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-emerald-950/5 rounded-2xl p-6 h-60 shadow-sm">
            <div className="h-5 w-32 bg-emerald-950/5 rounded mb-4"></div>
            <div className="h-32 w-full bg-emerald-950/5 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
