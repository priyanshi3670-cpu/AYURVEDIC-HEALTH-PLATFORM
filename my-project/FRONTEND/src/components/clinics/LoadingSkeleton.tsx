import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse w-full">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div
          key={n}
          className="bg-white border border-[#2E7D32]/5 rounded-3xl p-5 h-96 flex flex-col justify-between space-y-4 shadow-sm"
        >
          {/* Cover placeholder */}
          <div className="w-full h-40 bg-gray-200 rounded-2xl" />

          {/* Details placeholder */}
          <div className="space-y-3 flex-grow">
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>

          {/* Bottom actions placeholder */}
          <div className="h-10 bg-gray-200 rounded w-full border-t border-gray-100 pt-4" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
