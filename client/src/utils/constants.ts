// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

// App Constants
export const APP_NAME = 'CodeBattle Arena';
export const APP_DESCRIPTION = 'Real-time competitive coding platform';

// Game Constants
export const MATCH_DURATION = 30 * 60; // 30 minutes in seconds
export const MAX_SQUAD_SIZE = 5;
export const DEFAULT_ELO = 1200;

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/dashboard',
    LOBBY: '/lobby',
    ROOM: '/room/:roomId',
    BATTLE: '/battle/:matchId',
    RESULT: '/result/:matchId',
    ANALYSIS: '/analysis/:matchId',
    LEADERBOARD: '/leaderboard',
    PROFILE: '/profile/:userId',
    MY_PROFILE: '/profile',
} as const;

// Scoring weights
export const SCORING = {
    CORRECTNESS_WEIGHT: 0.6, // 60%
    TIME_EFFICIENCY_WEIGHT: 0.2, // 20%
    OPTIMIZATION_WEIGHT: 0.2, // 20%
} as const;

// Match Types
export const MATCH_TYPES = {
    DUEL: '1v1',
    SQUAD: 'squad',
} as const;

// Match Status
export const MATCH_STATUS = {
    WAITING: 'waiting',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;
