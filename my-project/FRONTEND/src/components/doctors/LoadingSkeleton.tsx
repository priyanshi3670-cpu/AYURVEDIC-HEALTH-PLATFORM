import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="bg-white border border-[#2E7D32]/5 rounded-3xl p-6 h-64 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="flex space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-2xl shrink-0" />
            <div className="space-y-2 flex-grow">
              <div className="h-5 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-full pt-4 border-t border-gray-100" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
