import axios from 'axios';
import { ChatMessage } from '../types';

const BACKEND_URL = 'http://127.0.0.1:5174/api';
const client = axios.create({ baseURL: BACKEND_URL, timeout: 1500 });

export const chatApi = {
  async sendMessage(message: string, history: ChatMessage[]): Promise<{ data: ChatMessage; isFallback: boolean }> {
    try {
      const res = await client.post('/ai/chat', { message, history });
      return { data: res.data, isFallback: false };
    } catch {
      // Use the mock engine from aiApi
      const { default: aiApi } = await import('./aiApi');
      return aiApi.sendMessage(message);
    }
  },

  async getChatHistory(): Promise<{ data: ChatMessage[]; isFallback: boolean }> {
    try {
      const res = await client.get('/ai/history');
      return { data: res.data, isFallback: false };
    } catch {
      const { MOCK_CHAT_HISTORY_LOCAL } = await import('./aiApi');
      return { data: MOCK_CHAT_HISTORY_LOCAL, isFallback: true };
    }
  },
};

export default chatApi;
