// Re-export socket events from types for convenience
export { SOCKET_EVENTS } from '@/types/socket';
export type { SocketEventName } from '@/types/socket';

// Event helpers
export const createRoomEvent = (name: string, type: '1v1' | 'squad', isPrivate: boolean) => ({
    name,
    type,
    isPrivate,
});

export const joinRoomEvent = (roomId: string, password?: string) => ({
    roomId,
    password,
});

export const submitCodeEvent = (matchId: string, code: string, language: string) => ({
    matchId,
    code,
    language,
});
