import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui';
import { RecipeForm } from '../components/forms';

export const CreateRecipe: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate('/recipes');
    };

    const handleCancel = () => {
        navigate('/recipes');
    };

    return (
        <div className='max-w-4xl mx-auto space-y-8'>
            <div>
                <h1 className='text-3xl font-bold text-gray-900'>
                    Create New Recipe
                </h1>
                <p className='text-gray-600 mt-2'>
                    Share your culinary creation with the FlavorAI community
                </p>
            </div>

            <Card>
                <CardContent className='p-6'>
                    <RecipeForm
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
