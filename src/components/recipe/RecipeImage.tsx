import React from 'react';
import { Card } from '../ui';
import type { RecipeImageProps } from './types';

export const RecipeImage: React.FC<RecipeImageProps> = () => {
    return (
        <Card>
            <div className='aspect-[16/9] bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center rounded-t-xl'>
                <div className='text-6xl'>Image</div>
            </div>
        </Card>
    );
};
