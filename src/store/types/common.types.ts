// Base types
export interface BaseEntity {
    id: number;
    createdAt: string;
    updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Loading states
export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

// Form states
export interface FormState extends LoadingState {
    isDirty: boolean;
    isValid: boolean;
    touched: Record<string, boolean>;
    errors: Record<string, string>;
}
