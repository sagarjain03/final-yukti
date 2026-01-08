import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description?: string;
}

interface UIState {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    modalOpen: string | null; // modal identifier or null
    toasts: Toast[];
    isSocketConnected: boolean;
}

const initialState: UIState = {
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
    sidebarOpen: true,
    modalOpen: null,
    toasts: [],
    isSocketConnected: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
            document.documentElement.classList.toggle('dark', state.theme === 'dark');
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
            document.documentElement.classList.toggle('dark', action.payload === 'dark');
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
        },
        openModal: (state, action: PayloadAction<string>) => {
            state.modalOpen = action.payload;
        },
        closeModal: (state) => {
            state.modalOpen = null;
        },
        addToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
            const id = Date.now().toString();
            state.toasts.push({ ...action.payload, id });
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
        setSocketConnected: (state, action: PayloadAction<boolean>) => {
            state.isSocketConnected = action.payload;
        },
    },
});

export const {
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebarOpen,
    openModal,
    closeModal,
    addToast,
    removeToast,
    clearToasts,
    setSocketConnected,
} = uiSlice.actions;

export default uiSlice.reducer;
