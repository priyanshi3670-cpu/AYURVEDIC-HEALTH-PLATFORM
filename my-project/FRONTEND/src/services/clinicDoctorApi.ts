import axios from 'axios';
import { Doctor } from '../types';
import { MOCK_DOCTORS, MOCK_CLINICS } from './apiService';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface ClinicDoctorsResponse {
  data: Doctor[];
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

export const clinicDoctorApi = {
  getDoctorsByClinicId: async (clinicId: string): Promise<ClinicDoctorsResponse> => {
    try {
      const res = await client.get(`/clinics/${clinicId}/doctors`);
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn(`API /clinics/${clinicId}/doctors failed, using local fallback. Error:`, err.message);
      
      const clinic = MOCK_CLINICS.find(c => c.id === clinicId);
      if (!clinic) {
        return { data: MOCK_DOCTORS.slice(0, 3), isFallback: true, error: err.message };
      }
      
      const filtered = MOCK_DOCTORS.filter(d => 
        d.clinicName.toLowerCase().includes(clinic.name.toLowerCase().split(' ')[0]) ||
        d.city.toLowerCase() === clinic.city.toLowerCase()
      );
      
      return {
        data: filtered.length > 0 ? filtered : MOCK_DOCTORS.slice(0, 3),
        isFallback: true,
        error: err.message
      };
    }
  }
};

export default clinicDoctorApi;
