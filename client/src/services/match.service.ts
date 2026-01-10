import api from './api';
import type { Match, Room, Submission } from '@/types/match';

export const matchService = {
    /**
     * Create a new room
     */
    async createRoom(data: {
        name: string;
        type: '1v1' | 'squad';
        isPrivate: boolean;
        password?: string;
    }): Promise<Room> {
        const response = await api.post<{ room: Room }>('/rooms', data);
        return response.data.room;
    },

    /**
     * Join an existing room
     */
    async joinRoom(roomId: string, password?: string): Promise<Room> {
        const response = await api.post<{ room: Room }>(`/rooms/${roomId}/join`, { password });
        return response.data.room;
    },

    /**
     * Leave current room
     */
    async leaveRoom(roomId: string): Promise<void> {
        await api.post(`/rooms/${roomId}/leave`);
    },

    /**
     * Get room by ID
     */
    async getRoom(roomId: string): Promise<Room> {
        const response = await api.get<{ room: Room }>(`/rooms/${roomId}`);
        return response.data.room;
    },

    /**
     * Get available public rooms
     */
    async getPublicRooms(): Promise<Room[]> {
        const response = await api.get<{ rooms: Room[] }>('/rooms');
        return response.data.rooms;
    },

    /**
     * Get match by ID
     */
    async getMatch(matchId: string): Promise<Match> {
        const response = await api.get<{ match: Match }>(`/matches/${matchId}`);
        return response.data.match;
    },

    /**
     * Submit code for a match
     */
    async submitCode(matchId: string, code: string, language: string): Promise<Submission> {
        const response = await api.post<{ submission: Submission }>(`/matches/${matchId}/submit`, {
            code,
            language,
        });
        return response.data.submission;
    },

    /**
     * Get match history for a user
     */
    async getMatchHistory(userId: string, page = 1, limit = 10): Promise<{ matches: Match[]; total: number }> {
        const response = await api.get(`/users/${userId}/matches`, {
            params: { page, limit },
        });
        return response.data;
    },

    /**
     * Get match analysis/results
     */
    async getMatchAnalysis(matchId: string): Promise<{
        match: Match;
        submissions: Submission[];
        stats: Record<string, unknown>;
    }> {
        const response = await api.get(`/matches/${matchId}/analysis`);
        return response.data;
    },
};
