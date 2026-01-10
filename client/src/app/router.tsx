import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

// Pages
import { Landing } from '@/pages/landing';
import { Login, Signup } from '@/pages/auth';
import { Dashboard } from '@/pages/dashboard';
import { Lobby, Room } from '@/pages/lobby';
import { Battle } from '@/pages/battle';
import { Result } from '@/pages/result';
import { Analysis } from '@/pages/analysis';
import { Leaderboard } from '@/pages/leaderboard';
import { Profile } from '@/pages/profile';
import { NotFound } from '@/pages/error';

const router = createBrowserRouter([
    // Public routes
    {
        path: '/',
        element: <Landing />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/leaderboard',
        element: <Leaderboard />,
    },

    // Protected routes
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/lobby',
        element: (
            <ProtectedRoute>
                <Lobby />
            </ProtectedRoute>
        ),
    },
    {
        path: '/room/:roomId',
        element: (
            <ProtectedRoute>
                <Room />
            </ProtectedRoute>
        ),
    },
    {
        path: '/battle/:matchId',
        element: (
            <ProtectedRoute>
                <Battle />
            </ProtectedRoute>
        ),
    },
    {
        path: '/result/:matchId',
        element: (
            <ProtectedRoute>
                <Result />
            </ProtectedRoute>
        ),
    },
    {
        path: '/analysis/:matchId',
        element: (
            <ProtectedRoute>
                <Analysis />
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile/:userId',
        element: <Profile />,
    },

    // 404
    {
        path: '*',
        element: <NotFound />,
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
