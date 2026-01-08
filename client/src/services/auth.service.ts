// import api from './api';
import type { User, LoginCredentials, SignupCredentials } from '@/types/user';
import type { AuthResponse } from '@/types/api';

// MOCK USER FOR FRONTEND TESTING
const MOCK_USER: User = {
    id: 'mock-user-123',
    username: 'Demo User',
    email: 'demo@example.com',
    elo: 1200,
    wins: 10,
    losses: 5,
    totalMatches: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // Mock login for testing
        // const response = await api.post<AuthResponse>('/auth/login', credentials);
        // return response.data;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: { ...MOCK_USER, email: credentials.email },
                    token: 'mock-jwt-token'
                });
            }, 800);
        });
    },

    /**
     * Register new user
     */
    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        // Mock signup for testing
        // const response = await api.post<AuthResponse>('/auth/signup', credentials);
        // return response.data;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    user: { ...MOCK_USER, username: credentials.username, email: credentials.email },
                    token: 'mock-jwt-token'
                });
            }, 800);
        });
    },

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<User> {
        // Mock get user for testing
        // const response = await api.get<{ user: User }>('/auth/me');
        // return response.data.user;

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_USER);
            }, 500);
        });
    },

    /**
     * Logout user
     */
    async logout(): Promise<void> {
        // await api.post('/auth/logout');
        localStorage.removeItem('token');
    },

    /**
     * Request password reset
     */
    async forgotPassword(email: string): Promise<void> {
        // await api.post('/auth/forgot-password', { email });
        return Promise.resolve();
    },

    /**
     * Reset password with token
     */
    async resetPassword(token: string, newPassword: string): Promise<void> {
        // await api.post('/auth/reset-password', { token, password: newPassword });
        return Promise.resolve();
    },

    /**
     * Update user profile
     */
    async updateProfile(data: Partial<User>): Promise<User> {
        // const response = await api.patch<{ user: User }>('/auth/profile', data);
        // return response.data.user;
        return Promise.resolve({ ...MOCK_USER, ...data });
    },
};
