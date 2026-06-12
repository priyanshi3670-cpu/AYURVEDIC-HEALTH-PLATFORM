import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-50 p-6 animate-pulse">
      <div className="h-20 bg-gray-200 rounded-xl mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 bg-gray-200 rounded-xl"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="space-y-6">
          <div className="h-80 bg-gray-200 rounded-xl"></div>
          <div className="h-48 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
