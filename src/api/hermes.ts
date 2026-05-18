import axios, { type AxiosInstance, type AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

const HERMES_URL_KEY = 'hermes_api_url';
const HERMES_API_KEY = 'hermes_api_key';

export class HermesClient {
  private client: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    });
  }

  static async fromSecureStore(): Promise<HermesClient | null> {
    const url = await SecureStore.getItemAsync(HERMES_URL_KEY);
    const key = await SecureStore.getItemAsync(HERMES_API_KEY);
    if (!url || !key) return null;
    return new HermesClient(url, key);
  }

  static async saveCredentials(url: string, apiKey: string): Promise<void> {
    await SecureStore.setItemAsync(HERMES_URL_KEY, url);
    await SecureStore.setItemAsync(HERMES_API_KEY, apiKey);
  }

  static async clearCredentials(): Promise<void> {
    await SecureStore.deleteItemAsync(HERMES_URL_KEY);
    await SecureStore.deleteItemAsync(HERMES_API_KEY);
  }

  static async hasCredentials(): Promise<boolean> {
    const url = await SecureStore.getItemAsync(HERMES_URL_KEY);
    const key = await SecureStore.getItemAsync(HERMES_API_KEY);
    return !!(url && key);
  }

  // Health / Stats
  async getHealth() {
    const { data } = await this.client.get('/health');
    return data;
  }

  async getStats() {
    const { data } = await this.client.get('/api/stats');
    return data;
  }

  // Sessions
  async getSessions(params?: { page?: number; per_page?: number }) {
    const { data } = await this.client.get('/api/sessions', { params });
    return data;
  }

  async getSession(id: string) {
    const { data } = await this.client.get(`/api/sessions/${id}`);
    return data;
  }

  // Profiles
  async getProfiles() {
    const { data } = await this.client.get('/api/profiles');
    return data;
  }

  // Tasks
  async getTasks(params?: { status?: string; page?: number }) {
    const { data } = await this.client.get('/api/tasks', { params });
    return data;
  }

  // Costs
  async getCosts(params?: { from?: string; to?: string }) {
    const { data } = await this.client.get('/api/costs', { params });
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

export function isApiError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.detail ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
}