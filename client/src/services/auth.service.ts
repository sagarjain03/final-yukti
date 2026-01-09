import api from './api';
import type { User, LoginCredentials, SignupCredentials } from '@/types/user';
import type { AuthResponse } from '@/types/api';

// Backend user interface (matches IUser from server)
interface BackendUser {
    _id: string;
    username: string;
    email: string;
    rating: number;
    college?: string;
    matchesPlayed: number;
    matchesWon: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * Single source of truth for user mapping.
 * Transforms backend IUser format to frontend User format.
 */
function mapBackendUser(backendUser: BackendUser): User {
    return {
        id: backendUser._id,
        username: backendUser.username,
        email: backendUser.email,
        elo: backendUser.rating,
        wins: backendUser.matchesWon,
        losses: backendUser.matchesPlayed - backendUser.matchesWon,
        totalMatches: backendUser.matchesPlayed,
        college: backendUser.college,
        createdAt: backendUser.createdAt,
        updatedAt: backendUser.updatedAt,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${backendUser.username}`,
    };
}

export const authService = {
    /**
     * Login user with email and password
     */
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post('/auth/login', credentials);
        // Backend returns: { statusCode, data: { user, token }, message }
        const { user, token } = response.data.data;
        return { user: mapBackendUser(user), token };
    },

    /**
     * Register new user
     */
    async signup(credentials: SignupCredentials): Promise<AuthResponse> {
        const response = await api.post('/auth/register', credentials);
        // Backend returns: { statusCode, data: { user, token }, message }
        const { user, token } = response.data.data;
        return { user: mapBackendUser(user), token };
    },

    /**
     * Get current authenticated user (for session restore)
     * Returns only user, NOT token (token already exists in storage)
     */
    async getCurrentUser(): Promise<User> {
        const response = await api.get('/auth/me');
        // Backend returns: { statusCode, data: { user }, message }
        const { user } = response.data.data;
        return mapBackendUser(user);
    },

    /**
     * Logout user - clears token from storage
     */
    async logout(): Promise<void> {
        localStorage.removeItem('token');
    },

    /**
     * Request password reset
     */
    async forgotPassword(email: string): Promise<void> {
        await api.post('/auth/forgot-password', { email });
    },

    /**
     * Reset password with token
     */
    async resetPassword(token: string, newPassword: string): Promise<void> {
        await api.post('/auth/reset-password', { token, password: newPassword });
    },

    /**
     * Update user profile
     */
    async updateProfile(data: Partial<User>): Promise<User> {
        const response = await api.patch('/auth/profile', data);
        return mapBackendUser(response.data.data.user);
    },
};
