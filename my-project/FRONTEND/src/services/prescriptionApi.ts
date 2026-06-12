import axios from 'axios';
import { Prescription, ApiResponse } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

// Offline Sandbox Local Fallbacks
const MOCK_PRESCRIPTIONS_LOCAL: Prescription[] = [
  {
    id: "pr-1",
    doctorName: "Dr. Vikram Chauhan",
    date: "2026-05-15",
    medicines: [
      { name: "Rasnasaptak Kwath (Decoction)", dosage: "30 ml", frequency: "Twice daily (before meals)" },
      { name: "Yogaraj Guggulu tablets", dosage: "2 tablets", frequency: "Twice daily (after meals)" },
      { name: "Ksheerabala Taila drops", dosage: "2 drops", frequency: "Each nostril (Pratimarsha Nasya)" }
    ],
    duration: "30 Days",
    notes: "Consume herbs with warm water only. Avoid wheat, refined sugar, and cold items."
  },
  {
    id: "pr-2",
    doctorName: "Dr. Smita Naram",
    date: "2026-04-12",
    medicines: [
      { name: "Kanchnar Guggulu tablets", dosage: "2 tablets", frequency: "Twice daily (after meals)" },
      { name: "Shatavari Powder", dosage: "3g", frequency: "Once daily (at bedtime with warm milk)" }
    ],
    duration: "60 Days",
    notes: "Focus on cooling pranayama and maintain early sleep schedules (before 10:30 PM)."
  }
];

export const prescriptionApi = {
  getPrescriptions: async (): Promise<ApiResponse<Prescription[]>> => {
    try {
      const res = await client.get('/prescriptions');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /prescriptions failed, using local fallback. Error:', err.message);
      return { data: MOCK_PRESCRIPTIONS_LOCAL, isFallback: true, error: err.message };
    }
  }
};

export default prescriptionApi;
