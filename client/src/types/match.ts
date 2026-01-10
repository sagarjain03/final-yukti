import type { User } from './user';

export type MatchType = '1v1' | 'squad';
export type MatchStatus = 'waiting' | 'in_progress' | 'completed' | 'cancelled';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface Match {
    id: string;
    type: MatchType;
    status: MatchStatus;
    players: MatchPlayer[];
    problem: Problem;
    startTime?: string;
    endTime?: string;
    duration: number; // in seconds
    roomId: string;
}

export interface MatchPlayer {
    user: User;
    score: number;
    correctness: number;
    timeEfficiency: number;
    optimization: number;
    submissionCount: number;
    isReady: boolean;
    hasSubmitted: boolean;
}

export interface Problem {
    id: string;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    constraints: string[];
    examples: ProblemExample[];
    testCases: TestCase[];
    idealTime: number; // in milliseconds
    timeLimit: number; // in milliseconds
    memoryLimit: number; // in MB
}

export interface ProblemExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface TestCase {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

export interface Submission {
    id: string;
    matchId: string;
    playerId: string;
    code: string;
    language: string;
    status: SubmissionStatus;
    executionTime?: number;
    memoryUsage?: number;
    testsPassed: number;
    totalTests: number;
    score: number;
    submittedAt: string;
}

export type SubmissionStatus =
    | 'pending'
    | 'running'
    | 'accepted'
    | 'wrong_answer'
    | 'time_limit_exceeded'
    | 'memory_limit_exceeded'
    | 'runtime_error'
    | 'compilation_error';

export interface Room {
    id: string;
    name: string;
    type: MatchType;
    host: User;
    players: User[];
    maxPlayers: number;
    isPrivate: boolean;
    password?: string;
    status: 'waiting' | 'starting' | 'in_progress';
    createdAt: string;
}

export interface MatchState {
    currentMatch: Match | null;
    currentRoom: Room | null;
    isLoading: boolean;
    error: string | null;
}

export interface LeaderboardEntry {
    rank: number;
    user: User;
    elo: number;
    wins: number;
    losses: number;
    winRate: number;
}
