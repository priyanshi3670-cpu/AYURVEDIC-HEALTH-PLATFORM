import axios from 'axios';
import { DoctorAvailability, DoctorConsultationSettings } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';
const client = axios.create({ baseURL: BACKEND_URL, timeout: 1500 });

export const MOCK_AVAILABILITY: DoctorAvailability[] = [
  { id: '1', day: 'Monday', startTime: '09:00', endTime: '13:00', consultationMode: 'Both', slotDuration: 30, status: 'Available' },
  { id: '2', day: 'Monday', startTime: '15:00', endTime: '18:00', consultationMode: 'Both', slotDuration: 30, status: 'Available' },
  { id: '3', day: 'Tuesday', startTime: '09:00', endTime: '14:00', consultationMode: 'In-Clinic', slotDuration: 20, status: 'Available' },
  { id: '4', day: 'Wednesday', startTime: '10:00', endTime: '16:00', consultationMode: 'Online', slotDuration: 15, status: 'Available' },
  { id: '5', day: 'Thursday', startTime: '09:00', endTime: '13:00', consultationMode: 'Both', slotDuration: 30, status: 'Available' },
  { id: '6', day: 'Friday', startTime: '09:00', endTime: '18:00', consultationMode: 'Both', slotDuration: 30, status: 'Available' },
  { id: '7', day: 'Saturday', startTime: '10:00', endTime: '14:00', consultationMode: 'In-Clinic', slotDuration: 30, status: 'Available' },
  { id: '8', day: 'Sunday', startTime: '00:00', endTime: '00:00', consultationMode: 'Both', slotDuration: 30, status: 'Unavailable' }
];

export const MOCK_SETTINGS: DoctorConsultationSettings = {
  onlineConsultation: true,
  videoConsultation: true,
  clinicConsultation: true,
  homeVisit: false,
  emergencyConsultation: true
};

export const availabilityApi = {
  async getAvailability(): Promise<{ data: DoctorAvailability[]; isFallback: boolean }> {
    try {
      const res = await client.get('/doctor/availability');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_AVAILABILITY, isFallback: true };
    }
  },

  async updateAvailability(availability: DoctorAvailability[]): Promise<{ success: boolean; isFallback: boolean }> {
    try {
      await client.put('/doctor/availability', availability);
      return { success: true, isFallback: false };
    } catch {
      return { success: true, isFallback: true };
    }
  },

  async getSettings(): Promise<{ data: DoctorConsultationSettings; isFallback: boolean }> {
    try {
      const res = await client.get('/doctor/consultation-settings');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_SETTINGS, isFallback: true };
    }
  }
};

export default availabilityApi;
