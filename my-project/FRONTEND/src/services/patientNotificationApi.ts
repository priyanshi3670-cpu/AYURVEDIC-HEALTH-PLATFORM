import axios from 'axios';
import { Notification } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';

export interface NotificationsApiResponse {
  data: Notification[];
  isFallback: boolean;
  error?: string;
}

const client = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1500
});

const MOCK_NOTIFICATIONS_LOCAL: Notification[] = [
  {
    id: "notif-1",
    title: "Upcoming Consultation Alert",
    message: "Your appointment with Dr. Vikram Chauhan is in 3 days. Prepare your updated diet logs.",
    date: "2026-06-12",
    type: "Appointment"
  },
  {
    id: "notif-2",
    title: "Morning Kashayam Reminder",
    message: "Time to consume your Dashamula decoction (empty stomach) for optimal metabolic fire.",
    date: "2026-06-12",
    type: "Reminder"
  },
  {
    id: "notif-3",
    title: "Daily Health Tip",
    message: "Avoid drinking ice-cold water during or immediately after meals as it dampens Agni (digestive fire).",
    date: "2026-06-11",
    type: "Tip"
  }
];

export const patientNotificationApi = {
  getNotifications: async (): Promise<NotificationsApiResponse> => {
    try {
      const res = await client.get('/patient/notifications');
      return { data: res.data, isFallback: false };
    } catch (err: any) {
      console.warn('API /patient/notifications failed, using local fallback. Error:', err.message);
      return { data: MOCK_NOTIFICATIONS_LOCAL, isFallback: true, error: err.message };
    }
  }
};

export default patientNotificationApi;
