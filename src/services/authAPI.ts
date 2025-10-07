import api from './api';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    username: string;
    confirmPassword?: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        username: string;
    };
}

export interface User {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export const authAPI = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    async register(userData: RegisterData): Promise<{ message: string }> {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async getProfile(): Promise<User> {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};
