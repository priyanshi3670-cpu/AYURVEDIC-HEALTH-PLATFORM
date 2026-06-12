import React from 'react';
import { motion } from 'framer-motion';
import { AIBookmark } from '../../types';
import { FiBookmark, FiTrash2 } from 'react-icons/fi';

interface BookmarkPanelProps {
  bookmarks: AIBookmark[];
  onRemove?: (id: string) => void;
}

const typeColors: Record<string, string> = {
  Advice: 'bg-blue-100 text-blue-700',
  Tip: 'bg-emerald-100 text-emerald-700',
  Recommendation: 'bg-amber-100 text-amber-700',
};

const BookmarkPanel: React.FC<BookmarkPanelProps> = ({ bookmarks, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6"
    >
      <div className="flex items-center gap-2 mb-1">
        <FiBookmark className="w-4 h-4 text-[#D4AF37]" />
        <h3 className="font-serif text-lg font-bold text-gray-800">Saved Bookmarks</h3>
      </div>
      <p className="text-xs text-gray-400 mb-4">Your saved advice, tips, and recommendations</p>

      {bookmarks.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-6">No bookmarks saved yet.</p>
      ) : (
        <div className="space-y-2.5">
          {bookmarks.map((bm) => (
            <div key={bm.id} className="bg-[#F8FFF8] border border-emerald-50 rounded-xl p-4 group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold text-gray-800">{bm.title}</h4>
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${typeColors[bm.type] || 'bg-gray-100 text-gray-600'}`}>
                    {bm.type}
                  </span>
                </div>
                {onRemove && (
                  <button
                    onClick={() => onRemove(bm.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all cursor-pointer"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{bm.content}</p>
              <p className="text-[9px] text-gray-400 mt-2">Saved on {bm.savedDate}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BookmarkPanel;
