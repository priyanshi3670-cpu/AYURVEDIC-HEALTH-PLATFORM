import React from 'react';
import { ActivityLog } from '../../types';

interface ActivityTimelineProps {
  logs: ActivityLog[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ logs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Activity History</h2>
      
      <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 pb-4">
        {logs.map((log, index) => (
          <div key={log.id} className="relative pl-8">
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1 w-8 h-8 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center text-sm z-10">
              {log.icon}
            </div>
            
            {/* Content */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-semibold text-gray-900">{log.title}</h4>
                <time className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-100">
                  {new Date(log.timestamp).toLocaleString(undefined, {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </time>
              </div>
              <p className="text-sm text-gray-600">{log.details}</p>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="pl-8 text-gray-500 text-sm">No recent activity found.</div>
        )}
      </div>
      
      {logs.length > 0 && (
        <button className="w-full mt-4 py-2.5 text-primary hover:bg-primary/5 rounded-xl font-medium transition-colors text-sm">
          Load More Activity
        </button>
      )}
    </div>
  );
};

export default ActivityTimeline;
