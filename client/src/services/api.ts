import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/utils/constants';

// Create axios instance
const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true, // For future refresh-token cookies
});

// Request interceptor - Add auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Normalize errors
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string; statusCode?: number }>) => {
        // Extract clean error message from backend ApiError format
        const message = error.response?.data?.message || error.message || 'An error occurred';
        const statusCode = error.response?.status;

        // Create normalized error
        const normalizedError = new Error(message);
        (normalizedError as any).statusCode = statusCode;

        // Don't redirect on 401 - let the caller handle it
        // This allows getCurrentUser to handle expired tokens gracefully

        return Promise.reject(normalizedError);
    }
);

export default api;
