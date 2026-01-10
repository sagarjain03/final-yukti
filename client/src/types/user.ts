export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    elo: number;
    rank?: number;
    wins: number;
    losses: number;
    totalMatches: number;
    college?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile extends User {
    bio?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    preferredLanguage?: string;
    matchHistory: MatchHistoryItem[];
    achievements: Achievement[];
}

export interface MatchHistoryItem {
    matchId: string;
    opponent: string;
    opponentAvatar?: string;
    result: 'win' | 'loss' | 'draw';
    eloChange: number;
    date: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    username: string;
    email: string;
    password: string;
    college?: string;
}
