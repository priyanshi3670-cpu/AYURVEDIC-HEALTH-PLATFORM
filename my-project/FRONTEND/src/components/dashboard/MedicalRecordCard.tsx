import React, { useState } from 'react';
import { FileText, ClipboardList, FileSpreadsheet, Download, UploadCloud, Plus, X } from 'lucide-react';
import { MedicalRecord } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface MedicalRecordCardProps {
  records: MedicalRecord[];
  onUploadRecord: (recordData: { title: string; type: 'Report' | 'Prescription' | 'Document'; doctorName: string }) => void;
  isUploading?: boolean;
}

export const MedicalRecordCard: React.FC<MedicalRecordCardProps> = ({
  records,
  onUploadRecord,
  isUploading = false
}) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Report' | 'Prescription' | 'Document'>('Report');
  const [doctorName, setDoctorName] = useState('');

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'Prescription':
        return ClipboardList;
      case 'Report':
        return FileSpreadsheet;
      default:
        return FileText;
    }
  };

  const getFileTypeStyle = (fileType: string) => {
    switch (fileType) {
      case 'Prescription':
        return 'from-emerald-500/10 to-emerald-600/10 text-emerald-700 border-emerald-500/20';
      case 'Report':
        return 'from-blue-500/10 to-blue-600/10 text-blue-700 border-blue-500/20';
      default:
        return 'from-purple-500/10 to-purple-600/10 text-purple-700 border-purple-500/20';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !doctorName) {
      alert('Please fill out all required fields.');
      return;
    }
    onUploadRecord({ title, type, doctorName });
    // Reset
    setTitle('');
    setDoctorName('');
    setType('Report');
    setShowUploadModal(false);
  };

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <FileText className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">safe document cabinet</span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-primary">Prescriptions & Medical Records</h3>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-primary hover:bg-primary-light text-white font-bold text-[9.5px] py-2.5 px-4.5 rounded-xl uppercase tracking-widest shadow-md flex items-center space-x-1.5 transition-all self-start cursor-pointer"
        >
          <UploadCloud className="w-4 h-4 text-accent" />
          <span>Upload Record</span>
        </button>
      </div>

      {/* Records Listing */}
      <div className="space-y-3">
        {records.length === 0 ? (
          <div className="text-center py-8 text-xs text-text-secondary font-medium">
            No health records uploaded yet. Click Upload Record to save clinical files.
          </div>
        ) : (
          records.map((rec) => {
            const IconComponent = getFileIcon(rec.type);
            return (
              <div
                key={rec.id}
                className="bg-[#FAF9F6] border border-primary/5 hover:border-primary/20 p-4.5 rounded-2xl flex items-center justify-between gap-4 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getFileTypeStyle(rec.type)} flex items-center justify-center border shadow-inner shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[8px] uppercase tracking-wider font-extrabold text-accent">
                      {rec.type}
                    </span>
                    <h4 className="font-serif font-bold text-xs md:text-sm text-text-primary truncate">
                      {rec.title}
                    </h4>
                    <p className="text-[9.5px] text-text-secondary font-semibold leading-none">
                      Provider: {rec.doctorName} • Date: {rec.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-[9.5px] font-bold text-text-secondary bg-white border border-gray-100 px-2.5 py-1 rounded-lg">
                    {rec.fileSize}
                  </span>
                  <a
                    href={rec.fileUrl}
                    onClick={(e) => e.preventDefault()}
                    className="p-2 bg-white hover:bg-primary border border-primary/5 hover:border-transparent text-primary hover:text-white rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Upload Dialog Modal overlay */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-emerald-950/45 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/10 relative p-6 md:p-8"
            >
              {/* Close */}
              <button
                onClick={() => setShowUploadModal(false)}
                className="absolute top-5 right-5 bg-primary/5 hover:bg-primary/10 p-2.5 rounded-full text-primary transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title */}
              <div className="mb-6">
                <span className="text-accent text-[9px] font-black uppercase tracking-widest block mb-1">
                  cabinet vault
                </span>
                <h3 className="font-serif text-xl font-bold text-primary">Upload Medical File</h3>
                <p className="text-[10px] text-text-secondary font-semibold mt-1">
                  Upload reports, prescriptions, or certifications to your health portal.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[8.5px] uppercase font-bold text-text-secondary block">Record Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Lipids Level Report, Liver Profile"
                    className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[8.5px] uppercase font-bold text-text-secondary block">Document Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors cursor-pointer"
                    >
                      <option value="Report">📊 Lab Report</option>
                      <option value="Prescription">📝 Prescription</option>
                      <option value="Document">📂 General Cert</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8.5px] uppercase font-bold text-text-secondary block">Clinical Practitioner *</label>
                    <input
                      type="text"
                      required
                      value={doctorName}
                      onChange={(e) => setDoctorName(e.target.value)}
                      placeholder="e.g. Dr. Vikram Chauhan"
                      className="w-full bg-[#FAF9F6] border border-gray-100 focus:border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary font-semibold outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Upload Zone */}
                <div className="border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-2xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center space-y-1.5 mt-2">
                  <UploadCloud className="w-8 h-8 text-primary shrink-0" />
                  <span className="text-[10px] text-primary font-bold">Browse local PDF or PNG image files</span>
                  <span className="text-[8.5px] text-text-secondary font-medium">Max upload file size: 5 MB</span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3 px-6 rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer mt-2"
                >
                  <span>Save Record details</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MedicalRecordCard;
