import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-56 bg-gray-200 rounded-2xl" />

      {/* Tab bar skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 w-28 bg-gray-200 rounded-lg" />
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-80 bg-gray-200 rounded-2xl" />
          <div className="h-60 bg-gray-200 rounded-2xl" />
        </div>
        <div className="space-y-6">
          <div className="h-48 bg-gray-200 rounded-2xl" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
