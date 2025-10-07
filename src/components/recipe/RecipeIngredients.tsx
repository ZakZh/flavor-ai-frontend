import React from 'react';
import { Card, CardContent } from '../ui';
import type { RecipeIngredientsProps } from './types';

export const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
    ingredients,
}) => {
    const renderIngredient = (ingredient: any, index: number) => {
        const displayText =
            typeof ingredient === 'string'
                ? ingredient
                : `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredient.name}`;

        return (
            <li
                key={index}
                className='flex items-start gap-3'
            >
                <div className='w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0'></div>
                <span className='text-gray-700'>{displayText}</span>
            </li>
        );
    };

    return (
        <Card>
            <CardContent className='p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Ingredients
                </h2>
                <ul className='space-y-2'>
                    {ingredients.map(renderIngredient)}
                </ul>
            </CardContent>
        </Card>
    );
};
