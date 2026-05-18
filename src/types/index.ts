export * from './hermes';
export * from './honcho';

// Common types
export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
