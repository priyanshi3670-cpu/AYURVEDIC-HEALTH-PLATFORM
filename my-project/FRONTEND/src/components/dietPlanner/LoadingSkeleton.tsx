import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-emerald-800/20 rounded-3xl h-48 w-full" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-150 bg-gray-100 rounded-3xl h-80 w-full" />
        <div className="bg-gray-150 bg-gray-100 rounded-3xl h-80 w-full md:col-span-2" />
      </div>

      {/* Meals Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-150 bg-gray-100 rounded w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-150 bg-gray-100 rounded-3xl h-64 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
