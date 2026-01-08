import { useEffect, useCallback, useRef } from 'react';
import type { Socket } from 'socket.io-client';
import { getSocket, connectSocket, disconnectSocket } from '@/socket';
import { useAppDispatch, useAppSelector, setSocketConnected } from '@/store';

export function useSocket() {
    const dispatch = useAppDispatch();
    const socketRef = useRef<Socket | null>(null);
    const { token } = useAppSelector((state) => state.auth);
    const { isSocketConnected } = useAppSelector((state) => state.ui);

    useEffect(() => {
        if (token && !socketRef.current?.connected) {
            socketRef.current = connectSocket(token);

            socketRef.current.on('connect', () => {
                dispatch(setSocketConnected(true));
            });

            socketRef.current.on('disconnect', () => {
                dispatch(setSocketConnected(false));
            });

            socketRef.current.on('error', (error) => {
                console.error('Socket error:', error);
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off('connect');
                socketRef.current.off('disconnect');
                socketRef.current.off('error');
            }
        };
    }, [token, dispatch]);

    const disconnect = useCallback(() => {
        disconnectSocket();
        dispatch(setSocketConnected(false));
    }, [dispatch]);

    const emit = useCallback(<T>(event: string, data: T) => {
        socketRef.current?.emit(event, data);
    }, []);

    const on = useCallback(<T>(event: string, callback: (data: T) => void) => {
        socketRef.current?.on(event, callback);
        return () => {
            socketRef.current?.off(event, callback);
        };
    }, []);

    const off = useCallback((event: string) => {
        socketRef.current?.off(event);
    }, []);

    return {
        socket: socketRef.current || getSocket(),
        isConnected: isSocketConnected,
        emit,
        on,
        off,
        disconnect,
    };
}
