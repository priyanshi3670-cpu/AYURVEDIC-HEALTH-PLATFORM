import React from 'react';
import { FiLifeBuoy, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';

const SupportPanel: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-sm border border-primary/20 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <FiLifeBuoy className="text-primary" /> Need Help?
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Our support team is available 24/7 to help you with your health journey or technical issues.
      </p>

      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-3 bg-white border border-primary/20 rounded-xl hover:border-primary/50 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <FiMessageSquare />
            </div>
            <span className="font-medium text-gray-800">Contact Support</span>
          </div>
          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </button>

        <button className="w-full flex items-center justify-between p-3 bg-white border border-primary/20 rounded-xl hover:border-primary/50 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <FiHelpCircle />
            </div>
            <span className="font-medium text-gray-800">FAQs & Guides</span>
          </div>
          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">AyurVeda Connect Version 1.4.2</p>
      </div>
    </div>
  );
};

export default SupportPanel;
