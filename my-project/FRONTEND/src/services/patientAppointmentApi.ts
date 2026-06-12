import axios from 'axios';
import { PatientDashboardAppointment } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface AppointmentsApiResponse {
  data: PatientDashboardAppointment[];
  isFallback: boolean;
  error?: string;
}

export interface SingleAppointmentApiResponse {
  data: PatientDashboardAppointment;
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

const MOCK_APPOINTMENTS_LOCAL: PatientDashboardAppointment[] = [
  {
    id: "APT-78901",
    doctorName: "Dr. Vikram Chauhan",
    specialization: "Kayachikitsa (Internal Medicine)",
    clinic: "AyuCare SuperSpecialty Clinic, New Delhi",
    date: "2026-06-15",
    time: "10:30 AM",
    status: "Confirmed"
  },
  {
    id: "APT-45612",
    doctorName: "Dr. Smita Naram",
    specialization: "Panchakarma Specialist",
    clinic: "Ayushya Ayurvedic Wellness Center, Mumbai",
    date: "2026-07-02",
    time: "02:00 PM",
    status: "Pending"
  },
  {
    id: "APT-11223",
    doctorName: "Dr. Vikram Chauhan",
    specialization: "Kayachikitsa (Internal Medicine)",
    clinic: "AyuCare SuperSpecialty Clinic, New Delhi",
    date: "2026-05-15",
    time: "11:00 AM",
    status: "Completed"
  }
];

export const patientAppointmentApi = {
  getAppointments: async (): Promise<AppointmentsApiResponse> => {
    try {
      const res = await client.get('/patient/appointments');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /patient/appointments failed, using local fallback. Error:', err.message);
      return { data: MOCK_APPOINTMENTS_LOCAL, isFallback: true, error: err.message };
    }
  },

  cancelAppointment: async (id: string): Promise<SingleAppointmentApiResponse> => {
    try {
      const res = await client.post(`/patient/appointments/${id}/cancel`);
      return { data: res.data.data, isFallback: false };
    } catch (err: any) {
      console.warn(`API /patient/appointments/${id}/cancel failed, using local fallback. Error:`, err.message);
      const apt = MOCK_APPOINTMENTS_LOCAL.find(a => a.id === id);
      if (apt) {
        apt.status = 'Cancelled';
        return { data: apt, isFallback: true, error: err.message };
      }
      throw new Error('Appointment not found offline');
    }
  },

  rescheduleAppointment: async (id: string, date: string, time: string): Promise<SingleAppointmentApiResponse> => {
    try {
      const res = await client.post(`/patient/appointments/${id}/reschedule`, { date, time });
      return { data: res.data.data, isFallback: false };
    } catch (err: any) {
      console.warn(`API /patient/appointments/${id}/reschedule failed, using local fallback. Error:`, err.message);
      const apt = MOCK_APPOINTMENTS_LOCAL.find(a => a.id === id);
      if (apt) {
        apt.date = date;
        apt.time = time;
        apt.status = 'Confirmed'; // reset to Confirmed if rescheduled
        return { data: apt, isFallback: true, error: err.message };
      }
      throw new Error('Appointment not found offline');
    }
  }
};

export default patientAppointmentApi;
