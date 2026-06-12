import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div key={num} className="bg-white border border-[#2E7D32]/5 rounded-2xl p-6 h-64 space-y-4">
          <div className="bg-gray-200 h-40 rounded-xl w-full" />
          <div className="h-4 bg-gray-250 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
