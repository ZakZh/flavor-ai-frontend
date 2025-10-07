import React from 'react';
import { Card, CardContent } from '../ui';
import type { RecipeStatsProps } from './types';

export const RecipeStats: React.FC<RecipeStatsProps> = ({
    recipe,
    formatDate,
}) => {
    return (
        <Card>
            <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                    Recipe Info
                </h3>
                <div className='space-y-3'>
                    <div className='flex justify-between'>
                        <span className='text-sm text-gray-600'>Cook Time</span>
                        <span className='text-sm font-medium text-gray-900'>
                            {recipe.cookTime || 30} minutes
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-sm text-gray-600'>
                            Ingredients
                        </span>
                        <span className='text-sm font-medium text-gray-900'>
                            {recipe.ingredients.length} items
                        </span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-sm text-gray-600'>Created</span>
                        <span className='text-sm font-medium text-gray-900'>
                            {formatDate(recipe.createdAt)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
