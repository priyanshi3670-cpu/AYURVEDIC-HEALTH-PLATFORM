import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton: React.FC = () => {
  const shimmer = "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse";

  return (
    <div className="space-y-6">
      {/* Hero Skeleton */}
      <div className={`${shimmer} rounded-2xl h-52`} />

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className={`${shimmer} rounded-2xl h-[400px]`} />
          <div className={`${shimmer} rounded-2xl h-40`} />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className={`${shimmer} rounded-2xl h-32`} />
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className={`${shimmer} rounded-xl h-28`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
