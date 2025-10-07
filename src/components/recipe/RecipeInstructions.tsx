import React from 'react';
import { Card, CardContent } from '../ui';
import type { RecipeInstructionsProps } from './types';

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
    instructions,
}) => {
    const displayInstructions = Array.isArray(instructions)
        ? instructions.join('\n\n')
        : instructions;

    return (
        <Card>
            <CardContent className='p-6'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                    Instructions
                </h2>
                <div className='prose prose-gray max-w-none'>
                    <div className='whitespace-pre-wrap text-gray-700 leading-relaxed'>
                        {displayInstructions}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
