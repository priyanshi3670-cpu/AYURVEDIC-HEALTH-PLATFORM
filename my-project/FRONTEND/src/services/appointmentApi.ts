import axios from 'axios';
import { DoctorAppointmentModel } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';
const client = axios.create({ baseURL: BACKEND_URL, timeout: 1500 });

export const MOCK_DOCTOR_APPOINTMENTS: DoctorAppointmentModel[] = [
  { id: 'apt-1', patientName: 'Rahul Verma', date: '2026-06-12', time: '10:00 AM', consultationType: 'In-Clinic', status: 'Pending', condition: 'Joint Pain' },
  { id: 'apt-2', patientName: 'Priyanshi Sharma', date: '2026-06-12', time: '11:30 AM', consultationType: 'Online', status: 'Pending', condition: 'PCOS Follow-up' },
  { id: 'apt-3', castPatientName: 'Amit Kumar', date: '2026-06-12', time: '02:15 PM', consultationType: 'In-Clinic', status: 'Completed', condition: 'Digestive Issues' } as any,
  { id: 'apt-4', patientName: 'Neha Singh', date: '2026-06-13', time: '09:00 AM', consultationType: 'Online', status: 'Pending', condition: 'Skin Allergies' },
  { id: 'apt-5', patientName: 'Vikram Joshi', date: '2026-06-13', time: '04:00 PM', consultationType: 'In-Clinic', status: 'Pending', condition: 'Back Pain' },
];

export const appointmentApi = {
  async getAppointments(): Promise<{ data: DoctorAppointmentModel[]; isFallback: boolean }> {
    try {
      const res = await client.get('/doctor/appointments');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_DOCTOR_APPOINTMENTS, isFallback: true };
    }
  },

  async getSchedule(): Promise<{ data: DoctorAppointmentModel[]; isFallback: boolean }> {
    try {
      const res = await client.get('/doctor/schedule');
      return { data: res.data, isFallback: false };
    } catch {
      return { data: MOCK_DOCTOR_APPOINTMENTS.filter(a => a.date === '2026-06-12'), isFallback: true };
    }
  }
};

export default appointmentApi;
