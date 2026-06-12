import React from 'react';
import { FiStar, FiMessageCircle } from 'react-icons/fi';
import { DoctorReviewModel } from '../../types';

interface ReviewCardProps {
  review: DoctorReviewModel;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            {review.patientName.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{review.patientName}</h4>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 italic mb-3">"{review.review}"</p>
      <button className="text-primary text-xs font-medium hover:underline flex items-center gap-1">
        <FiMessageCircle className="w-3 h-3" /> Reply to Review
      </button>
    </div>
  );
};

export default ReviewCard;
