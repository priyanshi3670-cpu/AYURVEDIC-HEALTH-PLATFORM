import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase, MapPin } from 'lucide-react';
import { Doctor } from '../../types';

interface SimilarDoctorsProps {
  doctors: Doctor[];
  currentDoctorId: string;
}

export const SimilarDoctors: React.FC<SimilarDoctorsProps> = ({ doctors, currentDoctorId }) => {
  // Filter out current doctor and get up to 4 similar ones
  const similar = React.useMemo(() => {
    return doctors
      .filter((d) => d.id !== currentDoctorId)
      .slice(0, 4);
  }, [doctors, currentDoctorId]);

  if (similar.length === 0) return null;

  return (
    <div className="space-y-6 pt-10 border-t border-gray-150">
      <div className="space-y-2">
        <h3 className="font-serif text-xl font-bold text-primary">Similar Doctors</h3>
        <p className="text-xs text-text-secondary">Consult other verified Ayurvedic experts in related specialties.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similar.map((doc) => (
          <Link
            key={doc.id}
            to={`/doctor/${doc.id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group bg-white border border-[#2E7D32]/5 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Photo */}
              <div className="w-full h-36 rounded-xl overflow-hidden shadow-sm relative">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Specs */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-primary group-hover:text-primary-light transition-colors">
                  {doc.name}
                </h4>
                <span className="text-[10px] text-accent uppercase font-bold tracking-wider block">
                  {doc.specialization}
                </span>
              </div>

              {/* Rating / Experience */}
              <div className="flex justify-between items-center text-[10px] text-text-secondary pt-1 border-t border-gray-50">
                <div className="flex items-center space-x-0.5">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span className="font-bold text-primary">{doc.rating}</span>
                </div>
                <div className="flex items-center space-x-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-secondary" />
                  <span>{doc.experience} Yrs</span>
                </div>
              </div>
            </div>

            {/* Price / Action */}
            <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[10px] text-text-secondary">
                Fee: <strong className="text-primary text-xs font-bold">₹{doc.consultationFee}</strong>
              </span>
              <span className="text-[10px] font-bold text-[#2E7D32] flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                <span>View Details</span>
                <span>→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarDoctors;
