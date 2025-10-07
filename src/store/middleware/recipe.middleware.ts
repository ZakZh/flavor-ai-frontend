import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    fetchRecipes,
} from '../actions';

// Create the middleware instance
export const recipeMiddleware = createListenerMiddleware();

// Listen for recipe creation success
recipeMiddleware.startListening({
    matcher: isAnyOf(createRecipe.fulfilled),
    effect: async (action, listenerApi) => {},
});

// Listen for recipe updates
recipeMiddleware.startListening({
    matcher: isAnyOf(updateRecipe.fulfilled),
    effect: async (action, listenerApi) => {},
});

// Listen for recipe deletion
recipeMiddleware.startListening({
    matcher: isAnyOf(deleteRecipe.fulfilled),
    effect: async (action, listenerApi) => {},
});
