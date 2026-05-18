// Honcho API Types

export interface HonchoConfig {
  baseUrl: string;
  apiKey: string;
}

export interface HonchoUser {
  id: string;
  name: string;
  email?: string;
  created_at: string;
}

export interface HonchoPeer {
  id: string;
  name: string;
  type: string;
  created_at: string;
}

export interface HonchoSession {
  id: string;
  user_id: string;
  peer_id: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, unknown>;
}

export interface HonchoMessage {
  id: string;
  session_id: string;
  peer_id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  created_at: string;
  metadata?: Record<string, unknown>;
}

export interface HonchoInsight {
  id: string;
  session_id: string;
  content: string;
  type: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}