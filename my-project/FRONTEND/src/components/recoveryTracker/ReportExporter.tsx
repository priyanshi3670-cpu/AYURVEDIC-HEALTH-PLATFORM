import React from 'react';
import { Download, Printer, FileText, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RecoveryProfile, AdvancedRecoveryProgress, SymptomRecord, MilestoneRecord, MedicationRecord } from '../../types';

interface ReportExporterProps {
  profile: RecoveryProfile;
  progressPoints: AdvancedRecoveryProgress[];
  symptoms: SymptomRecord[];
  milestones: MilestoneRecord[];
  medications: MedicationRecord[];
  isFallback: boolean;
}

export const ReportExporter: React.FC<ReportExporterProps> = ({
  profile,
  progressPoints,
  symptoms,
  milestones,
  medications,
  isFallback
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    // Generate text report content
    const reportContent = `
==================================================
        AYURVEDA CONNECT - HEALTH REPORT
==================================================
Date: ${new Date().toLocaleDateString()}
Report Status: ${isFallback ? 'Demo Mode' : 'Verified Server Sync'}

PATIENT DETAILS:
--------------------------------------------------
Patient Name: ${profile.patientName}
Condition:    ${profile.condition}
Doctor:       ${profile.doctorName}
Treatment:    ${profile.treatmentPlan}
Plan Period:  ${profile.startDate} to ${profile.expectedRecoveryDate}
Current Stage: ${profile.currentStage}
Progress:     ${profile.completionPercentage}%

SYMPTOM TRACKING INDICATORS:
--------------------------------------------------
${symptoms.map(s => `- ${s.symptom}: Severity: ${s.severity} | Improvement: ${s.improvementPercentage}% | Status: ${s.status}`).join('\n')}

TREATMENT MILESTONES:
--------------------------------------------------
${milestones.map(m => `- ${m.title} (${m.date}): Status: ${m.status}\n  Description: ${m.description}`).join('\n')}

DAILY MEDICATIONS & DOSES CHECKLIST:
--------------------------------------------------
${medications.map(med => `- ${med.name}: Dosage: ${med.dosage} | Frequency: ${med.frequency} | Intake Logged today: ${med.completed ? 'YES' : 'NO'}`).join('\n')}

==================================================
Generated via AyurVeda Connect Health Portal.
    `;

    const blob = new Blob([reportContent.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vedic_Recovery_Report_${profile.patientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const rawData = {
      profile,
      progressPoints,
      symptoms,
      milestones,
      medications,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(rawData, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vedic_Recovery_Dataset_${profile.patientName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-emerald-950/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-5"
    >
      <div className="flex items-center space-x-3 border-b border-emerald-50 pb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-650/10 text-indigo-700 flex items-center justify-center border border-indigo-500/20 shadow-sm">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-base font-black text-text-primary">Vedic Exporter Hub</h3>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Download or print your progress stats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* PDF Download */}
        <button
          onClick={handleDownloadReport}
          className="flex flex-col items-center justify-center p-5 border border-emerald-950/5 rounded-2xl hover:border-emerald-600/20 hover:bg-emerald-50/5 transition-all duration-300 space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Download className="w-5 h-5" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-bold text-text-primary block">Download Health Report</strong>
            <span className="text-[9px] text-text-secondary font-bold block uppercase tracking-wider mt-0.5">Text Summary File</span>
          </div>
        </button>

        {/* Print Layout */}
        <button
          onClick={handlePrint}
          className="flex flex-col items-center justify-center p-5 border border-emerald-950/5 rounded-2xl hover:border-emerald-600/20 hover:bg-emerald-50/5 transition-all duration-300 space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Printer className="w-5 h-5" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-bold text-text-primary block">Print Recovery Log</strong>
            <span className="text-[9px] text-text-secondary font-bold block uppercase tracking-wider mt-0.5">Open System Dialog</span>
          </div>
        </button>

        {/* Export Dataset */}
        <button
          onClick={handleExportJSON}
          className="flex flex-col items-center justify-center p-5 border border-emerald-950/5 rounded-2xl hover:border-emerald-600/20 hover:bg-emerald-50/5 transition-all duration-300 space-y-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-bold text-text-primary block">Export Raw Dataset</strong>
            <span className="text-[9px] text-text-secondary font-bold block uppercase tracking-wider mt-0.5">Structured JSON format</span>
          </div>
        </button>
      </div>

      <div className="flex items-center space-x-2 text-[10px] text-text-secondary font-bold bg-emerald-50/20 p-3 rounded-xl border border-emerald-500/5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Exported reports are compatible with standard diagnostic portals and can be shared directly with your consulting Vaidya.</span>
      </div>
    </motion.div>
  );
};

export default ReportExporter;
