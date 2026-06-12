import axios from 'axios';
import { Clinic } from '../types';
import { MOCK_CLINICS } from './apiService';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface ClinicApiResponse<T> {
  data: T;
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

export const clinicApi = {
  getClinics: async (searchParams?: { name?: string; city?: string; service?: string }): Promise<ClinicApiResponse<Clinic[]>> => {
    try {
      const res = await client.get('/clinics', { params: searchParams });
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /clinics failed, using local fallback. Error:', err.message);
      
      let results = [...MOCK_CLINICS];
      if (searchParams) {
        const { name, city, service } = searchParams;
        if (name) {
          results = results.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (city) {
          results = results.filter(c => c.city.toLowerCase() === city.toLowerCase());
        }
        if (service) {
          results = results.filter(c => c.services.some(s => s.toLowerCase() === service.toLowerCase()));
        }
      }
      return { data: results, isFallback: true, error: err.message };
    }
  },

  getClinicById: async (id: string): Promise<ClinicApiResponse<Clinic | undefined>> => {
    try {
      const res = await client.get(`/clinics/${id}`);
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn(`API /clinics/${id} failed, using local fallback. Error:`, err.message);
      const found = MOCK_CLINICS.find(c => c.id === id);
      return { data: found, isFallback: true, error: err.message };
    }
  },

  getPanchakarmaCenters: async (): Promise<ClinicApiResponse<Clinic[]>> => {
    try {
      const res = await client.get('/panchakarma-centers');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /panchakarma-centers failed, using local fallback. Error:', err.message);
      const centers = MOCK_CLINICS.filter(c => c.type === 'Panchakarma Center');
      return { data: centers, isFallback: true, error: err.message };
    }
  },

  getFeaturedClinics: async (): Promise<ClinicApiResponse<Clinic[]>> => {
    try {
      const res = await client.get('/featured-clinics');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /featured-clinics failed, using local fallback. Error:', err.message);
      const featured = MOCK_CLINICS.filter(c => c.rating >= 4.8);
      return { data: featured, isFallback: true, error: err.message };
    }
  },

  getCities: async (): Promise<ClinicApiResponse<string[]>> => {
    try {
      const res = await client.get('/cities');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /cities failed, using local fallback. Error:', err.message);
      const cities = Array.from(new Set(MOCK_CLINICS.map(c => c.city)));
      return { data: cities, isFallback: true, error: err.message };
    }
  },

  getServices: async (): Promise<ClinicApiResponse<string[]>> => {
    try {
      const res = await client.get('/services');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /services failed, using local fallback. Error:', err.message);
      const servicesSet = new Set<string>();
      MOCK_CLINICS.forEach(c => c.services.forEach(s => servicesSet.add(s)));
      return { data: Array.from(servicesSet), isFallback: true, error: err.message };
    }
  }
};

export default clinicApi;
