import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card, CardContent, Loading } from '../ui';
import type { FieldErrors } from '../../types/validation.types';

interface LoginFormProps {
    formData: {
        email: string;
        password: string;
    };
    fieldErrors: FieldErrors;
    error: string | null;
    isLoading: boolean;
    onInputChange: (field: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    formData,
    fieldErrors,
    error,
    isLoading,
    onInputChange,
    onSubmit,
}) => {
    return (
        <Card className='shadow-lg'>
            <CardContent className='p-6'>
                <form
                    onSubmit={onSubmit}
                    className='space-y-4'
                >
                    <Input
                        label='Email'
                        type='email'
                        value={formData.email}
                        onChange={(e) => onInputChange('email', e.target.value)}
                        placeholder='Enter your email'
                        error={fieldErrors.email}
                    />

                    <Input
                        label='Password'
                        type='password'
                        value={formData.password}
                        onChange={(e) =>
                            onInputChange('password', e.target.value)
                        }
                        placeholder='Enter your password'
                        error={fieldErrors.password}
                    />

                    {(error || fieldErrors.general) && (
                        <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                            <p className='text-sm text-red-600'>
                                {typeof error === 'string'
                                    ? error
                                    : typeof error === 'object' &&
                                      (error as any)?.message
                                    ? (error as any).message
                                    : fieldErrors.general ||
                                      'An error occurred'}
                            </p>
                        </div>
                    )}

                    <Button
                        type='submit'
                        disabled={isLoading}
                        className='w-full'
                        size='lg'
                    >
                        {isLoading ? (
                            <Loading
                                size='sm'
                                text='Signing in...'
                                inline
                            />
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600'>
                        Don't have an account?{' '}
                        <Link
                            to='/register'
                            className='font-medium text-orange-600 hover:text-orange-500 transition-colors'
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
