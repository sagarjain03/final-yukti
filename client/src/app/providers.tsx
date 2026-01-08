import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useAppSelector } from '@/store';

interface ProvidersProps {
    children: ReactNode;
}

// Theme provider to sync theme with document
function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useAppSelector((state) => state.ui.theme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return <>{children}</>;
}

// Inner providers that need Redux
function InnerProviders({ children }: ProvidersProps) {
    return <ThemeProvider>{children}</ThemeProvider>;
}

// Main providers wrapper
export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <InnerProviders>{children}</InnerProviders>
        </Provider>
    );
}
