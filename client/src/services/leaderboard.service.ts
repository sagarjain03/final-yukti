import api from './api';
import type { LeaderboardEntry } from '@/types/match';

export const leaderboardService = {
    /**
     * Get global leaderboard
     */
    async getLeaderboard(page = 1, limit = 50): Promise<{
        leaderboard: LeaderboardEntry[];
        total: number;
        userRank?: number;
    }> {
        const response = await api.get('/leaderboard', {
            params: { page, limit },
        });
        return response.data;
    },

    /**
     * Get leaderboard by region
     */
    async getRegionalLeaderboard(region: string, page = 1, limit = 50): Promise<{
        leaderboard: LeaderboardEntry[];
        total: number;
    }> {
        const response = await api.get(`/leaderboard/region/${region}`, {
            params: { page, limit },
        });
        return response.data;
    },

    /**
     * Get user's rank
     */
    async getUserRank(userId: string): Promise<{ rank: number; elo: number }> {
        const response = await api.get(`/leaderboard/user/${userId}`);
        return response.data;
    },

    /**
     * Get top players
     */
    async getTopPlayers(limit = 10): Promise<LeaderboardEntry[]> {
        const response = await api.get('/leaderboard/top', {
            params: { limit },
        });
        return response.data.players;
    },
};
