// Generic API response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Auth responses
export interface AuthResponse {
    user: import('./user').User;
    token: string;
}

// Error response
export interface ApiError {
    message: string;
    code?: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}

// Match creation response
export interface CreateMatchResponse {
    match: import('./match').Match;
    roomId: string;
}

// Leaderboard response
export interface LeaderboardResponse {
    leaderboard: import('./match').LeaderboardEntry[];
    userRank?: number;
    total: number;
}

// Code execution response from Judge0
export interface ExecutionResult {
    stdout: string;
    stderr: string;
    compile_output: string | null;
    status: {
        id: number;
        description: string;
    };
    time: string;
    memory: number;
}
