import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:5174/api';
const client = axios.create({ baseURL: BACKEND_URL, timeout: 1500 });

export interface PreferencesModel {
  dietPreference: string;
  exercisePreference: string;
  wellnessGoals: string[];
  preferredDoctorType: string;
  communicationPreference: string;
}

export const MOCK_PREFERENCES: PreferencesModel = {
  dietPreference: 'Vegetarian',
  exercisePreference: 'Yoga & Walking',
  wellnessGoals: ['Weight Management', 'PCOS Recovery', 'Stress Reduction'],
  preferredDoctorType: 'Panchakarma Specialist',
  communicationPreference: 'WhatsApp',
};

export const preferenceApi = {
  async getPreferences(): Promise<{ data: PreferencesModel; isFallback: boolean }> {
    try {
      const res = await client.get('/preferences');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_PREFERENCES, isFallback: true };
    }
  },

  async updatePreferences(prefs: Partial<PreferencesModel>): Promise<{ data: PreferencesModel; isFallback: boolean }> {
    try {
      const res = await client.put('/preferences', prefs);
      return { data: res.data, isFallback: false };
    } catch {
      return { data: { ...MOCK_PREFERENCES, ...prefs }, isFallback: true };
    }
  }
};

export default preferenceApi;
