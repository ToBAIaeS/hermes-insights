import { create } from 'zustand';
import { HermesClient } from '../api/hermes';
import { HonchoClient } from '../api/honcho';
import type { AsyncState } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  hermesUrl: string | null;
  hermesApiKey: string | null;
  honchoUrl: string | null;
  honchoApiKey: string | null;

  setHermesCredentials: (url: string, apiKey: string) => Promise<void>;
  setHonchoCredentials: (url: string, apiKey: string) => Promise<void>;
  logout: () => Promise<void>;
  loadCredentials: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  hermesUrl: null,
  hermesApiKey: null,
  honchoUrl: null,
  honchoApiKey: null,

  setHermesCredentials: async (url, apiKey) => {
    await HermesClient.saveCredentials(url, apiKey);
    set({
      isAuthenticated: true,
      hermesUrl: url,
      hermesApiKey: apiKey,
    });
  },

  setHonchoCredentials: async (url, apiKey) => {
    await HonchoClient.saveCredentials(url, apiKey);
    set({
      honchoUrl: url,
      honchoApiKey: apiKey,
    });
  },

  logout: async () => {
    await HermesClient.clearCredentials();
    await HonchoClient.clearCredentials();
    set({
      isAuthenticated: false,
      hermesUrl: null,
      hermesApiKey: null,
      honchoUrl: null,
      honchoApiKey: null,
    });
  },

  loadCredentials: async () => {
    const hasHermes = await HermesClient.hasCredentials();
    if (hasHermes) {
      const client = await HermesClient.fromSecureStore();
      if (client) {
        // We can't read back from SecureStore directly, just check existence
        set({ isAuthenticated: true });
      }
    }
  },
}));

interface HermesState {
  stats: AsyncState<unknown>;
  sessions: AsyncState<unknown[]>;
  health: AsyncState<unknown>;

  fetchStats: () => Promise<void>;
  fetchSessions: (page?: number) => Promise<void>;
  fetchHealth: () => Promise<void>;
}

export const useHermesStore = create<HermesState>((set, _get) => ({
  stats: { data: null, loading: false, error: null },
  sessions: { data: null, loading: false, error: null },
  health: { data: null, loading: false, error: null },

  fetchStats: async () => {
    set((s) => ({ stats: { ...s.stats, loading: true, error: null } }));
    try {
      const client = await HermesClient.fromSecureStore();
      if (!client) throw new Error('Not authenticated');
      const data = await client.getStats();
      set({ stats: { data, loading: false, error: null } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch stats';
      set((s) => ({ stats: { ...s.stats, loading: false, error: message } }));
    }
  },

  fetchSessions: async (page = 1) => {
    set((s) => ({ sessions: { ...s.sessions, loading: true, error: null } }));
    try {
      const client = await HermesClient.fromSecureStore();
      if (!client) throw new Error('Not authenticated');
      const data = await client.getSessions({ page });
      set({
        sessions: {
          data: data.sessions ?? data,
          loading: false,
          error: null,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch sessions';
      set((s) => ({ sessions: { ...s.sessions, loading: false, error: message } }));
    }
  },

  fetchHealth: async () => {
    set((s) => ({ health: { ...s.health, loading: true, error: null } }));
    try {
      const client = await HermesClient.fromSecureStore();
      if (!client) throw new Error('Not authenticated');
      const data = await client.getHealth();
      set({ health: { data, loading: false, error: null } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch health';
      set((s) => ({ health: { ...s.health, loading: false, error: message } }));
    }
  },
}));

interface HonchoState {
  peers: AsyncState<unknown[]>;
  currentPeer: string | null;
  insights: AsyncState<unknown[]>;

  fetchPeers: () => Promise<void>;
  fetchInsights: (peerId: string, sessionId?: string) => Promise<void>;
}

export const useHonchoStore = create<HonchoState>((set) => ({
  peers: { data: null, loading: false, error: null },
  currentPeer: null,
  insights: { data: null, loading: false, error: null },

  fetchPeers: async () => {
    set((s) => ({ peers: { ...s.peers, loading: true, error: null } }));
    try {
      const client = await HonchoClient.fromSecureStore();
      if (!client) throw new Error('Not authenticated');
      const data = await client.getPeers();
      set({ peers: { data, loading: false, error: null } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch peers';
      set((s) => ({ peers: { ...s.peers, loading: false, error: message } }));
    }
  },

  fetchInsights: async (peerId, sessionId) => {
    set((s) => ({ insights: { ...s.insights, loading: true, error: null } }));
    try {
      const client = await HonchoClient.fromSecureStore();
      if (!client) throw new Error('Not authenticated');
      const data = await client.getInsights(peerId, sessionId);
      set({ insights: { data, loading: false, error: null } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch insights';
      set((s) => ({ insights: { ...s.insights, loading: false, error: message } }));
    }
  },
}));
