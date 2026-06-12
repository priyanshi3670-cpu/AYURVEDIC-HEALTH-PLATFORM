import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex bg-[#F8FFF8] min-h-screen">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white border-r border-gray-150 h-screen sticky top-0 shrink-0 p-6 space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-xl w-3/4" />
        <div className="space-y-4 pt-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-250 rounded-xl w-full" />
          ))}
        </div>
      </div>

      {/* Main View Area Skeleton */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Navbar Skeleton */}
        <div className="bg-white border-b border-gray-150 p-4 flex justify-between items-center h-16 shrink-0 animate-pulse">
          <div className="h-6 bg-gray-200 rounded-lg w-1/4" />
          <div className="flex items-center space-x-3 w-1/3 justify-end">
            <div className="h-8 bg-gray-200 rounded-lg w-24" />
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Content Canvas Skeleton */}
        <div className="p-6 md:p-8 space-y-8 animate-pulse flex-grow overflow-y-auto max-w-7xl w-full mx-auto">
          {/* Welcome Panel */}
          <div className="h-32 bg-gray-250 rounded-3xl w-full" />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-250 rounded-3xl w-full" />
            ))}
          </div>

          {/* Main Content Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-72 bg-gray-250 rounded-3xl w-full" />
              <div className="h-64 bg-gray-250 rounded-3xl w-full" />
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-250 rounded-3xl w-full" />
              <div className="h-72 bg-gray-250 rounded-3xl w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
