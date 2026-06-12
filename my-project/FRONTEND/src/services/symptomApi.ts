import axios from 'axios';
import { SymptomRecord } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface SymptomsApiResponse {
  data: SymptomRecord[];
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

const MOCK_SYMPTOMS_LOCAL: SymptomRecord[] = [
  { id: "sym-1", symptom: "Knee Joint Stiffness", severity: "Moderate", status: "Improving", recordedDate: "2026-05-15", improvementPercentage: 65 },
  { id: "sym-2", symptom: "Localized Swelling", severity: "Mild", status: "Improving", recordedDate: "2026-05-18", improvementPercentage: 80 },
  { id: "sym-3", symptom: "Radiating Muscle Ache", severity: "Mild", status: "Stable", recordedDate: "2026-05-20", improvementPercentage: 40 }
];

export const symptomApi = {
  getSymptoms: async (): Promise<SymptomsApiResponse> => {
    try {
      const res = await client.get('/recovery/symptoms');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /recovery/symptoms failed, using local fallback. Error:', err.message);
      return { data: MOCK_SYMPTOMS_LOCAL, isFallback: true, error: err.message };
    }
  }
};

export default symptomApi;
