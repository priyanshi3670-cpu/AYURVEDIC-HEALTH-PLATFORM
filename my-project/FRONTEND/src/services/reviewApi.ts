import axios from 'axios';
import { DoctorReviewModel } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';
const client = axios.create({ baseURL: BACKEND_URL, timeout: 1500 });

export const MOCK_REVIEWS: DoctorReviewModel[] = [
  { id: '1', patientName: 'Amit Kumar', rating: 5, review: 'Dr. Arun is amazing. Highly recommended! His Panchakarma treatment completely cured my digestive issues.', date: 'June 10, 2026' },
  { id: '2', patientName: 'Neha Singh', rating: 5, review: 'Very patient and understanding doctor. Takes time to explain everything thoroughly.', date: 'June 8, 2026' },
  { id: '3', patientName: 'Sanjay Gupta', rating: 4, review: 'Great experience, the clinic was a bit crowded but the treatment was effective.', date: 'May 28, 2026' },
  { id: '4', patientName: 'Priya Verma', rating: 5, review: 'Best Ayurvedic doctor in the city. Truly holistic approach.', date: 'May 15, 2026' }
];

export const reviewApi = {
  async getReviews(): Promise<{ data: DoctorReviewModel[]; isFallback: boolean }> {
    try {
      const res = await client.get('/doctor/reviews');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_REVIEWS, isFallback: true };
    }
  }
};

export default reviewApi;
