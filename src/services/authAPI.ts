import api from './api';
import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
} from '../store/types/auth.types';

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

    async register(userData: RegisterData): Promise<AuthResponse> {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    async getProfile(): Promise<User> {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};
