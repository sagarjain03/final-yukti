import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.slice';
import matchReducer from './match.slice';
import uiReducer from './ui.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        match: matchReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serializable check
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
