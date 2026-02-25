import { AxiosRequestConfig } from "axios";

// API Response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

// Pagination
export interface PaginatedResponse<T> {
  status: string;
  message: string;
  code: number;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  }
}

// API Error
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Generic request config
export type ApiRequestConfig = AxiosRequestConfig;