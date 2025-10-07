import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/auth.slice';
import type { RootState } from '../store';
import { Button, Logo } from '../components/ui';

export const Header: React.FC = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className='sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                <div className='flex items-center gap-8'>
                    <Link
                        to='/recipes'
                        className='flex items-center'
                    >
                        <Logo className='text-2xl' />
                    </Link>

                    {isAuthenticated && (
                        <nav className='hidden md:flex items-center gap-6'>
                            <Link
                                to='/recipes'
                                className='text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors'
                            >
                                Recipes
                            </Link>
                        </nav>
                    )}
                </div>

                <div className='flex items-center gap-4'>
                    {isAuthenticated ? (
                        <div className='relative'>
                            <button
                                onClick={() =>
                                    setIsUserMenuOpen(!isUserMenuOpen)
                                }
                                className='flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100 transition-colors'
                            >
                                <div className='h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-medium'>
                                    {user?.username?.charAt(0).toUpperCase() ||
                                        'U'}
                                </div>
                                <span className='hidden sm:block text-sm font-medium text-gray-700'>
                                    {user?.username}
                                </span>
                                <svg
                                    className={`h-4 w-4 text-gray-400 transition-transform ${
                                        isUserMenuOpen ? 'rotate-180' : ''
                                    }`}
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M19 9l-7 7-7-7'
                                    />
                                </svg>
                            </button>

                            {isUserMenuOpen && (
                                <div className='absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg'>
                                    <div className='px-4 py-2 border-b border-gray-100'>
                                        <p className='text-sm font-medium text-gray-900'>
                                            {user?.username}
                                        </p>
                                        <p className='text-xs text-gray-500'>
                                            {user?.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className='flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors'
                                    >
                                        <svg
                                            className='h-4 w-4'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                                            />
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Button
                                variant='ghost'
                                onClick={() => navigate('/login')}
                            >
                                Sign In
                            </Button>
                            <Button onClick={() => navigate('/register')}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
