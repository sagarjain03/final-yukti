import { IconHome, IconTrophy, IconDeviceGamepad2, IconUser, IconLogin, IconLogout, IconUserCircle } from '@tabler/icons-react';
import { FloatingDock } from '@/components/ui/floating-dock';
import { useAuth } from '@/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

export function GlobalNavigation() {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const allLinks = [
        {
            title: "Home",
            icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/",
        },
        {
            title: "Play",
            icon: <IconDeviceGamepad2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/lobby",
        },
        {
            title: "Leaderboard",
            icon: <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "/leaderboard",
        },
        ...(isAuthenticated ? [
            {
                title: "Dashboard",
                icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "/dashboard",
            },
            {
                title: "Profile",
                icon: <IconUserCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "/profile",
            },
            {
                title: "Logout",
                icon: <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "/login",
                onClick: handleLogout,
            }
        ] : [
            {
                title: "Login",
                icon: <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
                href: "/login",
            }
        ]),
    ];

    // Filter out the current page's icon
    const links = allLinks.filter(link => {
        // Exact match for home
        if (link.href === "/" && currentPath === "/") return false;
        // Prefix match for others (e.g., /profile matches /profile/:id)
        if (link.href !== "/" && currentPath.startsWith(link.href)) return false;
        return true;
    });

    return (
        <div className="fixed right-4 top-1/2 z-50 -translate-y-1/2">
            <FloatingDock
                items={links}
            />
        </div>
    );
}
