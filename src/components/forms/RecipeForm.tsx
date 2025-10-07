import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, Textarea } from '../ui';
import { createRecipe } from '../../store/slices/recipeSlice';
import type { AppDispatch } from '../../store';

interface RecipeFormData {
    title: string;
    description: string;
    instructions: string;
    ingredients: string[];
    cookingTime: number;
}

interface RecipeFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
    onSuccess,
    onCancel,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<RecipeFormData>({
        title: '',
        description: '',
        instructions: '',
        ingredients: [''],
        cookingTime: 30,
    });
    const [errors, setErrors] = useState<Partial<RecipeFormData>>({});

    const handleInputChange = (
        field: keyof RecipeFormData,
        value: string | number
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
    };

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ''],
        }));
    };

    const removeIngredient = (index: number) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter(
                (_, i) => i !== index
            );
            setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<RecipeFormData> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.instructions.trim()) {
            newErrors.instructions = 'Instructions are required';
        }

        const validIngredients = formData.ingredients.filter((ing) =>
            ing.trim()
        );
        if (validIngredients.length === 0) {
            newErrors.ingredients = ['At least one ingredient is required'];
        }

        if (formData.cookingTime <= 0) {
            newErrors.cookingTime = 1;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const recipeData = {
                ...formData,
                ingredients: formData.ingredients.filter((ing) => ing.trim()),
            };

            await dispatch(createRecipe(recipeData)).unwrap();
            onSuccess?.();
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-6'
        >
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div className='md:col-span-2'>
                    <Input
                        label='Recipe Title'
                        value={formData.title}
                        onChange={(e) =>
                            handleInputChange('title', e.target.value)
                        }
                        error={errors.title}
                        placeholder='Enter recipe title...'
                        required
                    />
                </div>

                <div className='md:col-span-2'>
                    <Textarea
                        label='Description'
                        value={formData.description}
                        onChange={(e) =>
                            handleInputChange('description', e.target.value)
                        }
                        error={errors.description}
                        placeholder='Describe your recipe...'
                        rows={3}
                        required
                    />
                </div>

                <div>
                    <Input
                        label='Cooking Time (minutes)'
                        type='number'
                        value={formData.cookingTime}
                        onChange={(e) =>
                            handleInputChange(
                                'cookingTime',
                                parseInt(e.target.value) || 0
                            )
                        }
                        error={
                            errors.cookingTime
                                ? 'Cooking time must be greater than 0'
                                : undefined
                        }
                        min='1'
                        required
                    />
                </div>

                <div className='md:col-span-2'>
                    <label className='block mb-2 text-sm font-medium text-gray-700'>
                        Ingredients
                    </label>
                    <div className='space-y-2'>
                        {formData.ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className='flex gap-2'
                            >
                                <Input
                                    value={ingredient}
                                    onChange={(e) =>
                                        handleIngredientChange(
                                            index,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Ingredient ${index + 1}...`}
                                    className='flex-1'
                                />
                                {formData.ingredients.length > 1 && (
                                    <Button
                                        type='button'
                                        variant='outline'
                                        size='icon'
                                        onClick={() => removeIngredient(index)}
                                        className='shrink-0'
                                    >
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
                                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                            />
                                        </svg>
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type='button'
                            variant='outline'
                            onClick={addIngredient}
                            className='w-full'
                        >
                            + Add Ingredient
                        </Button>
                    </div>
                    {errors.ingredients && (
                        <p className='mt-1 text-sm text-red-600'>
                            At least one ingredient is required
                        </p>
                    )}
                </div>

                <div className='md:col-span-2'>
                    <Textarea
                        label='Instructions'
                        value={formData.instructions}
                        onChange={(e) =>
                            handleInputChange('instructions', e.target.value)
                        }
                        error={errors.instructions}
                        placeholder='Write step-by-step cooking instructions...'
                        rows={6}
                        required
                    />
                </div>
            </div>

            <div className='flex gap-3 pt-4'>
                <Button
                    type='submit'
                    disabled={isLoading}
                    className='flex-1'
                >
                    {isLoading ? 'Creating Recipe...' : 'Create Recipe'}
                </Button>
                {onCancel && (
                    <Button
                        type='button'
                        variant='outline'
                        onClick={onCancel}
                        className='flex-1'
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
};
