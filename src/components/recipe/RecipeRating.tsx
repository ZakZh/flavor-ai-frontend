import React from 'react';
import { Card, CardContent, StarRating } from '../ui';
import type { RecipeRatingProps } from './types';

export const RecipeRating: React.FC<RecipeRatingProps> = ({
    recipe,
    user,
    userRating,
    isSubmittingRating,
    onRatingChange,
    isOwner,
}) => {
    return (
        <Card>
            <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    Rate this Recipe
                </h3>

                {/* Average Rating */}
                <div className='mb-4'>
                    <div className='flex items-center justify-between mb-2'>
                        <span className='text-sm text-gray-600'>
                            Average Rating
                        </span>
                        <span className='text-sm font-medium text-gray-900'>
                            {recipe.averageRating
                                ? `${recipe.averageRating.toFixed(1)} / 5.0`
                                : 'No ratings yet'}
                        </span>
                    </div>
                    <StarRating
                        rating={recipe.averageRating || 0}
                        readonly
                        size='md'
                    />
                    {recipe.ratingsCount && (
                        <p className='text-xs text-gray-500 mt-1'>
                            Based on {recipe.ratingsCount} rating
                            {recipe.ratingsCount !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {/* User Rating */}
                {!isOwner && (
                    <div>
                        <span className='text-sm text-gray-600 block mb-2'>
                            Your Rating
                        </span>
                        {user ? (
                            <div className='relative'>
                                <StarRating
                                    rating={userRating}
                                    onRatingChange={
                                        isSubmittingRating
                                            ? undefined
                                            : onRatingChange
                                    }
                                    readonly={isSubmittingRating}
                                    size='md'
                                />
                                {isSubmittingRating && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-white/75'>
                                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500'></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <StarRating
                                    rating={0}
                                    readonly={true}
                                    size='md'
                                />
                                <p className='text-xs text-orange-600 mt-1'>
                                    Please log in to rate this recipe
                                </p>
                            </div>
                        )}
                        {user && userRating > 0 && (
                            <p className='text-xs text-green-600 mt-1'>
                                You rated this recipe {userRating} star
                                {userRating !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
