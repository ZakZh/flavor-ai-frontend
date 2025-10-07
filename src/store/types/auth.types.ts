import type { BaseEntity, LoadingState } from './common.types';

export interface User extends BaseEntity {
    email: string;
    username: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    username: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        username: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface AuthState extends LoadingState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    fieldErrors: Record<string, string>;
    loginAttempts: number;
    lastLoginAttempt: number | null;
}
