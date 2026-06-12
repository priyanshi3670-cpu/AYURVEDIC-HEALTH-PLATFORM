import React from 'react';
import { Download, Printer, Share2, ClipboardCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { DoshaResult } from '../../types';

interface ReportExporterProps {
  result: DoshaResult;
  isFallback: boolean;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({ result, isFallback }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const reportContent = `
==================================================
      AYURVEDA CONNECT - PRAKRITI REPORT
==================================================
Date: ${result.assessmentDate}
Patient Name: ${result.patientName}
Status: ${isFallback ? 'Demo Sandbox Mode' : 'Verified Server Analysis'}

CONSTITUTION ANALYSIS:
--------------------------------------------------
Dominant Dosha: ${result.dominantDosha}
${result.secondaryDosha ? `Secondary Dosha: ${result.secondaryDosha}` : ''}

Composition Percentages:
- Vata (Air + Ether):   ${result.vataPercentage}%
- Pitta (Fire + Water):  ${result.pittaPercentage}%
- Kapha (Water + Earth): ${result.kaphaPercentage}%

--------------------------------------------------
RECOMMENDATIONS & LIFESTYLE SUMMARY:
- Favor foods matching: ${result.dominantDosha}
- Follow Dina-Charya routines aligned with solar cycles
- Engage in daily calming pranayama or grounding yoga poses

==================================================
Generated via AyurVeda Connect Constitution Portal.
    `;

    const blob = new Blob([reportContent.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ayurvedic_Prakriti_Report_${result.patientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const mockLink = `http://127.0.0.1:5173/dosha-analysis/results/${result.id}`;
    navigator.clipboard.writeText(mockLink);
    alert(`Results link copied to clipboard! Share it with your doctor:\n${mockLink}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6"
    >
      <div className="flex items-center space-x-2.5 border-b border-gray-50 pb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <ClipboardCheck className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">export & print centre</span>
          <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Download Constitution Report</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Download TXT */}
        <button
          onClick={handleDownloadReport}
          className="flex flex-col items-center justify-center p-5 border border-primary/5 hover:border-primary/20 bg-[#FAF9F6] rounded-2xl transition-all duration-300 space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <Download className="w-5 h-5" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-bold text-text-primary block">Download Report</strong>
            <span className="text-[9px] text-text-secondary font-bold block uppercase tracking-wider mt-0.5">Text Summary File</span>
          </div>
        </button>

        {/* Print Layout */}
        <button
          onClick={handlePrint}
          className="flex flex-col items-center justify-center p-5 border border-primary/5 hover:border-primary/20 bg-[#FAF9F6] rounded-2xl transition-all duration-300 space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <Printer className="w-5 h-5" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-bold text-text-primary block">Print Results</strong>
            <span className="text-[9px] text-text-secondary font-bold block uppercase tracking-wider mt-0.5">Open Browser Dialog</span>
          </div>
        </button>

        {/* Share Link */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center justify-center p-5 border border-primary/5 hover:border-primary/20 bg-[#FAF9F6] rounded-2xl transition-all duration-300 space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-bold text-text-primary block">Share Results Link</strong>
            <span className="text-[9px] text-text-secondary font-bold block uppercase tracking-wider mt-0.5">Copy link to clipboard</span>
          </div>
        </button>

      </div>

      <div className="flex items-center space-x-2 text-[10px] text-text-secondary font-bold bg-emerald-50/20 p-3.5 rounded-xl border border-emerald-500/5">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Vedic analysis profiles can be exported directly and synced with clinic patient histories for custom retreat planning.</span>
      </div>
    </motion.div>
  );
};

export default ReportExporter;
