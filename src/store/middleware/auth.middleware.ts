import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchProfile } from '../actions';

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
    matcher: isAnyOf(loginUser.fulfilled),
    effect: async (action, listenerApi) => {
        await listenerApi.dispatch(fetchProfile());
    },
});

authMiddleware.startListening({
    matcher: isAnyOf(registerUser.fulfilled),
    effect: async (action) => {},
});

authMiddleware.startListening({
    matcher: isAnyOf(registerUser.rejected),
    effect: async (action) => {},
});

authMiddleware.startListening({
    matcher: isAnyOf(loginUser.rejected, fetchProfile.rejected),
    effect: async (action) => {
        if (
            action.payload &&
            typeof action.payload === 'string' &&
            (action.payload.includes('401') ||
                action.payload.includes('Unauthorized'))
        ) {
            localStorage.removeItem('token');
        }
    },
});
