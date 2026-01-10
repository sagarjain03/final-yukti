import { useCallback } from 'react';
import { useAppDispatch, useAppSelector, login, signup, logout, getCurrentUser } from '@/store';
import type { LoginCredentials, SignupCredentials } from '@/types/user';

export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

    const handleLogin = useCallback(
        async (credentials: LoginCredentials) => {
            const result = await dispatch(login(credentials));
            return result;
        },
        [dispatch]
    );

    const handleSignup = useCallback(
        async (credentials: SignupCredentials) => {
            const result = await dispatch(signup(credentials));
            return result;
        },
        [dispatch]
    );

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const checkAuth = useCallback(async () => {
        if (localStorage.getItem('token')) {
            await dispatch(getCurrentUser());
        }
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        checkAuth,
    };
}
