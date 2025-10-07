import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import recipesReducer from './slices/recipes.slice';
import { authMiddleware, recipeMiddleware } from './middleware';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        })
            .concat(authMiddleware.middleware)
            .concat(recipeMiddleware.middleware),
    devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export everything for easy access
export * from './types';
export * from './actions';
export * from './selectors';
