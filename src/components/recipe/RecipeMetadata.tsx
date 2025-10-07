import React from 'react';
import type { RecipeMetadataProps } from './types';

export const RecipeMetadata: React.FC<RecipeMetadataProps> = ({
    recipe,
    formatDate,
}) => {
    return (
        <div className='flex items-center gap-6 text-sm text-gray-500'>
            <div className='flex items-center gap-1'>
                <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                </svg>
                {recipe.cookTime || 30} min
            </div>
            <div className='flex items-center gap-1'>
                <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                    />
                </svg>
                by {recipe.author.username}
            </div>
            <div className='flex items-center gap-1'>
                <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                </svg>
                {formatDate(recipe.createdAt)}
            </div>
        </div>
    );
};
