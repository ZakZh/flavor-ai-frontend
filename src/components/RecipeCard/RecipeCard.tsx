import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, StarRating } from '../ui';

interface Recipe {
    id: number;
    title: string;
    description?: string;
    cookTime?: number;
    averageRating?: number;
    author: {
        id: number;
        username: string;
    };
    createdAt: string;
}

interface RecipeCardProps {
    recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <Link to={`/recipes/${recipe.id}`}>
            <Card className='h-full transition-all duration-200 cursor-pointer group hover:shadow-lg'>
                <div className='aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center'>
                    <div className='text-6xl transition-transform duration-200 group-hover:scale-110'>
                        Image
                    </div>
                </div>

                <CardContent className='p-4'>
                    <div className='space-y-3'>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600 line-clamp-2'>
                                {recipe.title}
                            </h3>
                            <p className='mt-1 text-sm text-gray-600 line-clamp-2'>
                                {recipe.description}
                            </p>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4 text-xs text-gray-500'>
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
                                    {recipe.cookTime || 0}m
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
                                    {recipe.author.username}
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <StarRating
                                    rating={recipe.averageRating || 0}
                                    readonly
                                    size='sm'
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
