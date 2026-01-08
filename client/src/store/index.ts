export { store, type RootState, type AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';

// Auth slice exports
export {
    login,
    signup,
    getCurrentUser,
    logout,
    clearError,
    setUser,
} from './auth.slice';

// Match slice exports
export {
    createRoom,
    joinRoom,
    getMatch,
    setCurrentRoom,
    setCurrentMatch,
    updateMatch,
    leaveRoom,
    clearMatchError,
} from './match.slice';

// UI slice exports
export {
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
} from './ui.slice';
