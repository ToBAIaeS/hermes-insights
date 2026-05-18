// Hermes Dashboard API Types

export interface HermesConfig {
  baseUrl: string;
  apiKey: string;
}

export interface HermesStats {
  uptime_seconds: number;
  version: string;
  model: string;
  provider: string;
}

export interface HermesSession {
  id: string;
  profile: string;
  model: string;
  provider: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  total_tokens: number;
  cost_usd: number;
}

export interface HermesSessionList {
  sessions: HermesSession[];
  total: number;
  page: number;
  per_page: number;
}

export interface HermesProfile {
  name: string;
  model: string;
  provider: string;
  system_prompt?: string;
}

export interface HermesTask {
  id: string;
  title: string;
  status: string;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface HermesCostEntry {
  date: string;
  total_tokens: number;
  cost_usd: number;
  model: string;
}

export interface HermesHealth {
  status: string;
  version: string;
  uptime: number;
}