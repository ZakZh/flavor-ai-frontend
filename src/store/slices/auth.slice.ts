import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchProfile } from '../actions';
import type { AuthState, User } from '../types';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    fieldErrors: {},
    isAuthenticated: !!localStorage.getItem('token'),
    loginAttempts: 0,
    lastLoginAttempt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loginAttempts = 0;
            state.lastLoginAttempt = null;
            localStorage.removeItem('token');
        },

        clearError: (state) => {
            state.error = null;
            state.fieldErrors = {};
        },

        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
        },

        incrementLoginAttempts: (state) => {
            state.loginAttempts += 1;
            state.lastLoginAttempt = Date.now();
        },

        resetLoginAttempts: (state) => {
            state.loginAttempts = 0;
            state.lastLoginAttempt = null;
        },
    },

    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.access_token;
                state.user = action.payload.user as User;
                state.isAuthenticated = true;
                state.error = null;
                state.fieldErrors = {};
                state.loginAttempts = 0;
                state.lastLoginAttempt = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.loginAttempts += 1;
                state.lastLoginAttempt = Date.now();

                // Extract field errors from backend response
                const payload = action.payload as any;

                if (payload && typeof payload === 'object') {
                    // Check if payload has errors array
                    if (payload.errors && Array.isArray(payload.errors)) {
                        const extractedFieldErrors: Record<string, string> = {};
                        payload.errors.forEach((err: any) => {
                            const fieldName = Array.isArray(err.path)
                                ? err.path[0]
                                : err.path || 'general';
                            if (extractedFieldErrors[fieldName]) {
                                extractedFieldErrors[fieldName] +=
                                    '; ' + err.message;
                            } else {
                                extractedFieldErrors[fieldName] = err.message;
                            }
                        });
                        state.fieldErrors = extractedFieldErrors;
                        state.error = payload.message || null;
                    } else {
                        state.error = payload.message || 'Login failed';
                        state.fieldErrors = {};
                    }
                } else {
                    state.error = payload || 'Login failed';
                    state.fieldErrors = {};
                }
            })

            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;

                const payload = action.payload as any;

                if (payload && typeof payload === 'object') {
                    if (payload.errors && Array.isArray(payload.errors)) {
                        const extractedFieldErrors: Record<string, string> = {};
                        payload.errors.forEach((err: any) => {
                            const fieldName = Array.isArray(err.path)
                                ? err.path[0]
                                : err.path || 'general';
                            if (extractedFieldErrors[fieldName]) {
                                extractedFieldErrors[fieldName] +=
                                    '; ' + err.message;
                            } else {
                                extractedFieldErrors[fieldName] = err.message;
                            }
                        });
                        state.fieldErrors = extractedFieldErrors;
                        state.error = payload.message || null;
                    } else {
                        state.error = payload.message || 'Registration failed';
                        state.fieldErrors = {};
                    }
                } else {
                    state.error = payload || 'Registration failed';
                    state.fieldErrors = {};
                }
            })

            // Fetch Profile
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                if (
                    action.payload?.includes('401') ||
                    action.payload?.includes('Unauthorized')
                ) {
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('token');
                }
            });
    },
});

export const {
    logout,
    clearError,
    setCredentials,
    incrementLoginAttempts,
    resetLoginAttempts,
} = authSlice.actions;

export default authSlice.reducer;
