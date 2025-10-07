import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../services/authAPI';
import type {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
} from '../types';

// Auth action types
export const AUTH_ACTION_TYPES = {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    FETCH_PROFILE: 'auth/fetchProfile',
    LOGOUT: 'auth/logout',
    REFRESH_TOKEN: 'auth/refreshToken',
} as const;

// Login user
export const loginUser = createAsyncThunk<
    AuthResponse,
    LoginCredentials,
    { rejectValue: any }
>(AUTH_ACTION_TYPES.LOGIN, async (credentials, { rejectWithValue }) => {
    try {
        const response = await authAPI.login(credentials);
        localStorage.setItem('token', response.access_token);
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data || { message: 'Login failed' }
        );
    }
});

// Register user
export const registerUser = createAsyncThunk<
    AuthResponse,
    RegisterData,
    { rejectValue: any }
>(AUTH_ACTION_TYPES.REGISTER, async (userData, { rejectWithValue }) => {
    try {
        const response = await authAPI.register(userData);
        localStorage.setItem('token', response.access_token);
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data || { message: 'Registration failed' }
        );
    }
});

// Fetch user profile
export const fetchProfile = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(AUTH_ACTION_TYPES.FETCH_PROFILE, async (_, { rejectWithValue }) => {
    try {
        const response = await authAPI.getProfile();
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch profile'
        );
    }
});

// Refresh token (for future implementation)
export const refreshToken = createAsyncThunk<
    { access_token: string },
    void,
    { rejectValue: string }
>(AUTH_ACTION_TYPES.REFRESH_TOKEN, async (_, { rejectWithValue }) => {
    try {
        // This would be implemented when you add refresh token functionality
        throw new Error('Refresh token not implemented');
    } catch (error: any) {
        return rejectWithValue('Failed to refresh token');
    }
});
