import axios, { type AxiosInstance } from 'axios';
import * as SecureStore from 'expo-secure-store';

const HONCHO_URL_KEY = 'honcho_api_url';
const HONCHO_API_KEY = 'honcho_api_key';

export class HonchoClient {
  private client: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });
  }

  static async fromSecureStore(): Promise<HonchoClient | null> {
    const url = await SecureStore.getItemAsync(HONCHO_URL_KEY);
    const key = await SecureStore.getItemAsync(HONCHO_API_KEY);
    if (!url || !key) return null;
    return new HonchoClient(url, key);
  }

  static async saveCredentials(url: string, apiKey: string): Promise<void> {
    await SecureStore.setItemAsync(HONCHO_URL_KEY, url);
    await SecureStore.setItemAsync(HONCHO_API_KEY, apiKey);
  }

  static async clearCredentials(): Promise<void> {
    await SecureStore.deleteItemAsync(HONCHO_URL_KEY);
    await SecureStore.deleteItemAsync(HONCHO_API_KEY);
  }

  static async hasCredentials(): Promise<boolean> {
    const url = await SecureStore.getItemAsync(HONCHO_URL_KEY);
    const key = await SecureStore.getItemAsync(HONCHO_API_KEY);
    return !!(url && key);
  }

  // Peers
  async getPeers() {
    const { data } = await this.client.get('/v1/peers');
    return data;
  }

  async getPeer(id: string) {
    const { data } = await this.client.get(`/v1/peers/${id}`);
    return data;
  }

  // Sessions
  async getSessions(peerId: string, params?: { page?: number }) {
    const { data } = await this.client.get(`/v1/peers/${peerId}/sessions`, { params });
    return data;
  }

  async getSession(peerId: string, sessionId: string) {
    const { data } = await this.client.get(`/v1/peers/${peerId}/sessions/${sessionId}`);
    return data;
  }

  // Messages
  async getMessages(peerId: string, sessionId: string, params?: { page?: number }) {
    const { data } = await this.client.get(`/v1/peers/${peerId}/sessions/${sessionId}/messages`, {
      params,
    });
    return data;
  }

  // Insights
  async getInsights(peerId: string, sessionId?: string) {
    const url = sessionId
      ? `/v1/peers/${peerId}/sessions/${sessionId}/insights`
      : `/v1/peers/${peerId}/insights`;
    const { data } = await this.client.get(url);
    return data;
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}
