import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/actions';
import {
    selectAuthLoading,
    selectAuthError,
    selectAuthFieldErrors,
} from '../store/selectors/auth.selectors';
import { LoginForm } from '../components/forms';
import { Logo } from '../components/ui';
import type { AppDispatch } from '../store';

export const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);
    const fieldErrors = useSelector(selectAuthFieldErrors) || {};

    const generalError = Object.keys(fieldErrors).length > 0 ? null : error;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(loginUser(formData)).then((result) => {
            if (loginUser.fulfilled.match(result)) {
                navigate('/recipes');
            }
        });
    };

    return (
        <div className='flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-orange-50 via-white to-orange-50'>
            <div className='w-full max-w-md space-y-8'>
                <div className='text-center'>
                    <Logo className='mb-2' />
                    <h2 className='text-2xl font-semibold text-gray-900'>
                        Welcome Back
                    </h2>
                    <p className='mt-2 text-gray-600'>
                        Discover and share amazing recipes
                    </p>
                </div>

                <LoginForm
                    formData={formData}
                    fieldErrors={fieldErrors}
                    error={generalError}
                    isLoading={isLoading}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};
