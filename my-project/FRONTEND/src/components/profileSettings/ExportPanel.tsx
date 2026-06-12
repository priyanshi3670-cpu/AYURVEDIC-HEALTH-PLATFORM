import React, { useState } from 'react';
import { FiDownload, FiFileText, FiArchive, FiCheckCircle } from 'react-icons/fi';

const ExportPanel: React.FC = () => {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setExporting(type);
    setTimeout(() => {
      setExporting(null);
      // Simulate download
      const el = document.createElement('a');
      el.href = '#';
      el.download = `AyurVeda_${type}_${new Date().getTime()}.zip`;
      el.click();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiDownload className="text-primary" /> Data Export
      </h2>
      
      <p className="text-gray-600 mb-6 text-sm">
        Download a copy of your data on AyurVeda Connect. You can choose to download specific information or your entire account archive.
      </p>

      <div className="space-y-4">
        {/* Profile Export */}
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg h-fit">
              <FiUser />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Profile & Health Data</h4>
              <p className="text-xs text-gray-500 mt-1">JSON format containing your basic info, dosha, and goals.</p>
            </div>
          </div>
          <button 
            onClick={() => handleExport('profile')}
            disabled={exporting !== null}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap min-w-[120px]"
          >
            {exporting === 'profile' ? <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span> : <FiDownload />}
            {exporting === 'profile' ? 'Exporting...' : 'Export'}
          </button>
        </div>

        {/* PDF Summary */}
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex gap-3">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg h-fit">
              <FiFileText />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Medical Summary PDF</h4>
              <p className="text-xs text-gray-500 mt-1">Comprehensive PDF report for your external doctors.</p>
            </div>
          </div>
          <button 
            onClick={() => handleExport('summary')}
            disabled={exporting !== null}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap min-w-[120px]"
          >
            {exporting === 'summary' ? <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span> : <FiDownload />}
            {exporting === 'summary' ? 'Generating...' : 'Generate PDF'}
          </button>
        </div>

        {/* Full Archive */}
        <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <div className="flex gap-3">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg h-fit">
              <FiArchive />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Complete Account Archive</h4>
              <p className="text-xs text-gray-500 mt-1">ZIP file containing all your data, records, and activity logs.</p>
            </div>
          </div>
          <button 
            onClick={() => handleExport('archive')}
            disabled={exporting !== null}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-primary transition-colors text-sm font-medium whitespace-nowrap min-w-[120px]"
          >
            {exporting === 'archive' ? <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></span> : <FiDownload />}
            {exporting === 'archive' ? 'Preparing...' : 'Download Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple icon for internal use in this file
const FiUser = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export default ExportPanel;
