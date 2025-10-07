export interface ValidationError {
    field: string;
    message: string;
}

export interface ValidationErrorResponse {
    message: string;
    errors?: ValidationError[];
    statusCode: number;
}

export interface FieldErrors {
    [key: string]: string;
}
