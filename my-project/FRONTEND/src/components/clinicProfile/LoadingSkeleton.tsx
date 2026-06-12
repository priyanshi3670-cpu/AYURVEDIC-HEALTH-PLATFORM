import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-96 bg-gray-200 rounded-3xl w-full" />
      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-40 bg-gray-200 rounded-3xl w-full" />
          <div className="h-64 bg-gray-200 rounded-3xl w-full" />
          <div className="h-80 bg-gray-200 rounded-3xl w-full" />
        </div>
        <div className="space-y-6">
          <div className="h-48 bg-gray-200 rounded-3xl w-full" />
          <div className="h-80 bg-gray-200 rounded-3xl w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
