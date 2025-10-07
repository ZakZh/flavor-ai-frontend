import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card, CardContent, Loading } from '../ui';
import type { FieldErrors } from '../../types/validation.types';

interface RegisterFormProps {
    formData: {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
    fieldErrors: FieldErrors;
    error: string | null;
    isLoading: boolean;
    onInputChange: (field: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
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
                        label='Username'
                        value={formData.username}
                        onChange={(e) =>
                            onInputChange('username', e.target.value)
                        }
                        error={fieldErrors.username}
                        placeholder='Choose a username'
                    />

                    <Input
                        label='Email'
                        type='email'
                        value={formData.email}
                        onChange={(e) => onInputChange('email', e.target.value)}
                        error={fieldErrors.email}
                        placeholder='Enter your email'
                    />

                    <Input
                        label='Password'
                        type='password'
                        value={formData.password}
                        onChange={(e) =>
                            onInputChange('password', e.target.value)
                        }
                        error={fieldErrors.password}
                        placeholder='Create a password'
                    />

                    <Input
                        label='Confirm Password'
                        type='password'
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            onInputChange('confirmPassword', e.target.value)
                        }
                        error={fieldErrors.confirmPassword}
                        placeholder='Confirm your password'
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
                                text='Creating account...'
                                inline
                            />
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600'>
                        Already have an account?{' '}
                        <Link
                            to='/login'
                            className='font-medium text-orange-600 hover:text-orange-500 transition-colors'
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
