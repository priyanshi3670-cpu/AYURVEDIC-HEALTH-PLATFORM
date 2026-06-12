import React from 'react';
import { FiStar } from 'react-icons/fi';
import { DoctorReviewModel } from '../../types';

interface ReviewCardProps {
  review: DoctorReviewModel;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
            {review.patientName.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{review.patientName}</h4>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
        </div>
        <div className="flex text-accent text-sm">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={i < review.rating ? 'fill-current' : 'text-gray-300'} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2 italic">"{review.review}"</p>
    </div>
  );
};

export default ReviewCard;
