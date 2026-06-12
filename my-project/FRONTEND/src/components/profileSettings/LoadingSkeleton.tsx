import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="bg-white/50 rounded-2xl p-6 h-48 border border-white/20"></div>

      {/* Overview Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/50 rounded-xl p-4 h-24 border border-white/20"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/50 rounded-2xl p-6 h-96 border border-white/20"></div>
          <div className="bg-white/50 rounded-2xl p-6 h-64 border border-white/20"></div>
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-white/50 rounded-2xl p-6 h-64 border border-white/20"></div>
          <div className="bg-white/50 rounded-2xl p-6 h-48 border border-white/20"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
