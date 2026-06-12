import axios from 'axios';
import { Treatment, TreatmentCategory } from '../types';
import { MOCK_TREATMENTS, MOCK_TREATMENT_CATEGORIES } from './apiService';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface TreatmentResponse<T> {
  data: T;
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

export const treatmentApi = {
  getTreatments: async (): Promise<TreatmentResponse<Treatment[]>> => {
    try {
      const res = await client.get('/treatments');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /treatments failed, using fallback mock treatments data. Error:', err.message);
      return { data: MOCK_TREATMENTS, isFallback: true, error: err.message };
    }
  },

  getTreatmentById: async (id: string): Promise<TreatmentResponse<Treatment | undefined>> => {
    try {
      const res = await client.get(`/treatments/${id}`);
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn(`API /treatments/${id} failed, using fallback data. Error:`, err.message);
      const found = MOCK_TREATMENTS.find(t => t.id === id || t.slug === id);
      return { data: found, isFallback: true, error: err.message };
    }
  },

  getTreatmentCategories: async (): Promise<TreatmentResponse<TreatmentCategory[]>> => {
    try {
      const res = await client.get('/treatment-categories');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /treatment-categories failed, using fallback data. Error:', err.message);
      return { data: MOCK_TREATMENT_CATEGORIES, isFallback: true, error: err.message };
    }
  },

  getPopularTreatments: async (): Promise<TreatmentResponse<Treatment[]>> => {
    try {
      const res = await client.get('/popular-treatments');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /popular-treatments failed, using fallback data. Error:', err.message);
      const popular = MOCK_TREATMENTS.filter(t => t.rating >= 4.9);
      return { data: popular, isFallback: true, error: err.message };
    }
  },

  getRecommendedTreatments: async (): Promise<TreatmentResponse<Treatment[]>> => {
    try {
      const res = await client.get('/recommended-treatments');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /recommended-treatments failed, using fallback data. Error:', err.message);
      const recommended = MOCK_TREATMENTS.slice(4, 9);
      return { data: recommended, isFallback: true, error: err.message };
    }
  }
};

export default treatmentApi;
