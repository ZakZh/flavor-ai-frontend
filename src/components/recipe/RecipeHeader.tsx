import React from 'react';
import { Button } from '../ui';
import type { RecipeHeaderProps } from './types';

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({ onGoBack }) => {
    return (
        <div className='flex items-center justify-between'>
            <Button
                variant='ghost'
                onClick={onGoBack}
            >
                <svg
                    className='w-4 h-4 mr-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 19l-7-7 7-7'
                    />
                </svg>
                Back
            </Button>
        </div>
    );
};
