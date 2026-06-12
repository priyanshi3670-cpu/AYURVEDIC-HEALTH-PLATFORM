import axios from 'axios';
import { Package } from '../types';
import { MOCK_CLINICS } from './apiService';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface ClinicPackagesResponse {
  data: Package[];
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

export const clinicPackageApi = {
  getPackagesByClinicId: async (clinicId: string): Promise<ClinicPackagesResponse> => {
    try {
      const res = await client.get(`/clinics/${clinicId}/packages`);
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn(`API /clinics/${clinicId}/packages failed, using local fallback. Error:`, err.message);
      const clinic = MOCK_CLINICS.find(c => c.id === clinicId);
      return { data: clinic?.packages || [], isFallback: true, error: err.message };
    }
  }
};

export default clinicPackageApi;
