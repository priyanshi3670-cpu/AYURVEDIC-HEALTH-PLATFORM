import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Review } from '../../services/doctorApi';

interface DoctorReviewsProps {
  reviews: Review[];
}

export const DoctorReviews: React.FC<DoctorReviewsProps> = ({ reviews }) => {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-150">
      <h4 className="font-serif text-base font-bold text-primary flex items-center space-x-2">
        <MessageSquare className="w-5 h-5 text-accent shrink-0" />
        <span>Patient Consult Reviews</span>
      </h4>
      <div className="space-y-3.5">
        {reviews.length === 0 ? (
          <p className="text-xs text-text-secondary italic">No reviews logged yet. Be the first to leave feedback!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="p-4 bg-[#F8FFF8] border border-[#2E7D32]/5 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-primary">{rev.patientName}</span>
                <div className="flex items-center space-x-1.5">
                  <div className="flex">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-[10px] text-text-secondary font-medium">{rev.date}</span>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed italic">"{rev.comment}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorReviews;
