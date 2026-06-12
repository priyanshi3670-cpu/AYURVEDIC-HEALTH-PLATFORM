import React from 'react';
import { FiBookmark, FiUser, FiHome, FiFileText, FiActivity } from 'react-icons/fi';
import { SavedContentItem } from '../../types';

interface SavedContentGridProps {
  items: SavedContentItem[];
}

const SavedContentGrid: React.FC<SavedContentGridProps> = ({ items }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Doctor': return <FiUser className="text-blue-500" />;
      case 'Clinic': return <FiHome className="text-purple-500" />;
      case 'Treatment': return <FiActivity className="text-green-500" />;
      case 'Article': return <FiFileText className="text-orange-500" />;
      default: return <FiBookmark className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiBookmark className="text-primary" /> Saved Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-md transition-all group flex flex-col justify-between h-full bg-gray-50/50">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500 flex items-center gap-1.5 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                  {getIcon(item.type)} {item.type}
                </span>
                <button className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.subtitle}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200/50 text-xs text-gray-400">
              Saved on {new Date(item.savedDate).toLocaleDateString()}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full py-8 text-center text-gray-500">
            No saved content yet. Browse treatments and doctors to save them here.
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedContentGrid;
