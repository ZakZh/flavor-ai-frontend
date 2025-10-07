import { validationRules, type FormSchema } from '../validation';

// Login form validation schema
export const loginSchema: FormSchema = {
    email: {
        rules: [
            validationRules.required('Email is required'),
            validationRules.email(),
        ],
    },
    password: {
        rules: [validationRules.required('Password is required')],
    },
};

// Registration form validation schema
export const registerSchema: FormSchema = {
    email: {
        rules: [
            validationRules.required('Email is required'),
            validationRules.email(),
        ],
    },
    username: {
        rules: [
            validationRules.required('Username is required'),
            validationRules.minLength(
                3,
                'Username must be at least 3 characters'
            ),
            validationRules.maxLength(
                20,
                'Username must be no more than 20 characters'
            ),
        ],
    },
    password: {
        rules: [
            validationRules.required('Password is required'),
            validationRules.password(),
        ],
    },
    confirmPassword: {
        rules: [
            validationRules.required('Please confirm your password'),
            validationRules.confirmPassword(),
        ],
    },
};
