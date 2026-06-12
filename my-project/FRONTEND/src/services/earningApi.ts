import axios from 'axios';
import { DoctorEarningsModel } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';
const client = axios.create({ baseURL: BACKEND_URL, timeout: 1500 });

export const MOCK_DOCTOR_EARNINGS: DoctorEarningsModel[] = [
  { id: 'earn-1', month: 'Jan', appointments: 120, earnings: 150000, commission: 15000, netIncome: 135000 },
  { id: 'earn-2', month: 'Feb', appointments: 145, earnings: 180000, commission: 18000, netIncome: 162000 },
  { id: 'earn-3', month: 'Mar', appointments: 160, earnings: 200000, commission: 20000, netIncome: 180000 },
  { id: 'earn-4', month: 'Apr', appointments: 130, earnings: 165000, commission: 16500, netIncome: 148500 },
  { id: 'earn-5', month: 'May', appointments: 175, earnings: 220000, commission: 22000, netIncome: 198000 },
  { id: 'earn-6', month: 'Jun', appointments: 90, earnings: 110000, commission: 11000, netIncome: 99000 }, // Partial month
];

export const earningApi = {
  async getEarnings(): Promise<{ data: DoctorEarningsModel[]; isFallback: boolean }> {
    try {
      const res = await client.get('/doctor/earnings');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_DOCTOR_EARNINGS, isFallback: true };
    }
  }
};

export default earningApi;
