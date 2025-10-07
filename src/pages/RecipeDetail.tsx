import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipeById, rateRecipe } from '../store/slices/recipeSlice';
import { Button, Loading } from '../components/ui';
import {
    RecipeHeader,
    RecipeImage,
    RecipeMetadata,
    RecipeIngredients,
    RecipeInstructions,
    RecipeRating,
    RecipeStats,
} from '../components/recipe';
import type { RootState, AppDispatch } from '../store';

export const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { currentRecipe, isLoading } = useSelector(
        (state: RootState) => state.recipes
    );
    const { user } = useSelector((state: RootState) => state.auth);
    const [userRating, setUserRating] = useState(0);
    const [isSubmittingRating, setIsSubmittingRating] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeById(parseInt(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentRecipe && user) {
            const existingRating = currentRecipe.ratings?.find(
                (rating) => rating.userId === user.id
            );
            if (existingRating) {
                setUserRating(existingRating.rating);
            }
        }
    }, [currentRecipe, user]);

    const handleRating = async (rating: number) => {
        if (!currentRecipe || !user || isSubmittingRating) {
            return;
        }

        setIsSubmittingRating(true);
        try {
            await dispatch(
                rateRecipe({
                    id: currentRecipe.id,
                    rating,
                })
            ).unwrap();

            setUserRating(rating);

            dispatch(fetchRecipeById(currentRecipe.id));
        } catch (error) {
        } finally {
            setIsSubmittingRating(false);
        }
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <div className='max-w-4xl mx-auto flex justify-center py-12'>
                <Loading
                    size='lg'
                    text='Loading recipe...'
                />
            </div>
        );
    }

    if (!currentRecipe) {
        return (
            <div className='max-w-4xl mx-auto text-center py-12'>
                <div className='text-6xl mb-4'>🍽️</div>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                    Recipe not found
                </h2>
                <p className='text-gray-600 mb-6'>
                    The recipe you're looking for doesn't exist.
                </p>
                <Link to='/recipes'>
                    <Button>Back to Recipes</Button>
                </Link>
            </div>
        );
    }

    const isOwner = user?.id === currentRecipe.authorId;

    return (
        <div className='max-w-4xl mx-auto space-y-8'>
            <RecipeHeader onGoBack={() => navigate(-1)} />

            <RecipeImage recipe={currentRecipe as any} />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2 space-y-6'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                            {currentRecipe.title}
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            {currentRecipe.description}
                        </p>
                    </div>

                    <RecipeMetadata
                        recipe={currentRecipe as any}
                        formatDate={formatDate}
                    />

                    <RecipeIngredients
                        ingredients={currentRecipe.ingredients as any}
                    />

                    <RecipeInstructions
                        instructions={currentRecipe.instructions as any}
                    />
                </div>

                <div className='space-y-6'>
                    <RecipeRating
                        recipe={currentRecipe as any}
                        user={user}
                        userRating={userRating}
                        isSubmittingRating={isSubmittingRating}
                        onRatingChange={handleRating}
                        isOwner={isOwner}
                    />

                    <RecipeStats
                        recipe={currentRecipe as any}
                        formatDate={formatDate}
                    />
                </div>
            </div>
        </div>
    );
};
