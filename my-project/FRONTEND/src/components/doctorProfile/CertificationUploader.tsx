import React from 'react';
import { FiUploadCloud, FiFileText, FiTrash2, FiEye } from 'react-icons/fi';
import { DoctorCertification } from '../../types';

interface CertificationUploaderProps {
  certifications: DoctorCertification[];
}

const CertificationUploader: React.FC<CertificationUploaderProps> = ({ certifications }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-gray-900">Certifications & Documents</h3>
          <p className="text-sm text-gray-500">Upload degrees and medical licenses for verification.</p>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm">
          <FiUploadCloud /> Upload New
        </button>
      </div>

      <div className="space-y-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary/20 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FiFileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{cert.title}</h4>
                <p className="text-xs text-gray-500">{cert.institution} • Issued {cert.issueDate}</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <FiEye className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center">
        <FiUploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm font-medium text-gray-700">Drag and drop documents here</p>
        <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (Max 5MB)</p>
      </div>
    </div>
  );
};

export default CertificationUploader;
