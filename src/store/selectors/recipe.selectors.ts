import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Base recipe selectors
export const selectRecipesState = (state: RootState) => state.recipes;
export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectMyRecipes = (state: RootState) => state.recipes.myRecipes;
export const selectCurrentRecipe = (state: RootState) =>
    state.recipes.currentRecipe;
export const selectRecipesLoading = (state: RootState) =>
    state.recipes.isLoading;
export const selectRecipesError = (state: RootState) => state.recipes.error;
export const selectSearchQuery = (state: RootState) =>
    state.recipes.searchQuery;
export const selectFilters = (state: RootState) => state.recipes.filters;
export const selectPagination = (state: RootState) => state.recipes.pagination;

// Derived selectors
export const selectFilteredRecipes = createSelector(
    [selectRecipes, selectSearchQuery, selectFilters],
    (recipes, searchQuery, filters) => {
        let filtered = [...recipes];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (recipe) =>
                    recipe.title.toLowerCase().includes(query) ||
                    recipe.description?.toLowerCase().includes(query) ||
                    recipe.ingredients.some((ingredient) =>
                        ingredient.toLowerCase().includes(query)
                    )
            );
        }

        // Filter by cuisine
        if (filters.cuisine) {
            // This would need to be implemented based on your recipe schema
            // For now, we'll assume recipes have a cuisine field
            filtered = filtered.filter(
                (recipe) => (recipe as any).cuisine === filters.cuisine
            );
        }

        return filtered;
    }
);

export const selectRecipesByRating = createSelector(
    [selectRecipes],
    (recipes) => {
        return [...recipes].sort(
            (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        );
    }
);

export const selectRecentRecipes = createSelector(
    [selectRecipes],
    (recipes) => {
        return [...recipes]
            .sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )
            .slice(0, 10);
    }
);

export const selectRecipeById = createSelector(
    [selectRecipes, (state: RootState, recipeId: number) => recipeId],
    (recipes, recipeId) => {
        return recipes.find((recipe) => recipe.id === recipeId);
    }
);

export const selectMyRecipeCount = createSelector(
    [selectMyRecipes],
    (myRecipes) => myRecipes.length
);

export const selectHasRecipes = createSelector(
    [selectRecipes],
    (recipes) => recipes.length > 0
);

export const selectHasMore = createSelector(
    [selectPagination],
    (pagination) => pagination.page < pagination.totalPages
);

export const selectRecipesStats = createSelector([selectRecipes], (recipes) => {
    const totalRatings = recipes.reduce(
        (sum, recipe) => sum + (recipe.ratingsCount || 0),
        0
    );
    const avgRating =
        recipes.length > 0
            ? recipes.reduce(
                  (sum, recipe) => sum + (recipe.averageRating || 0),
                  0
              ) / recipes.length
            : 0;

    return {
        totalRecipes: recipes.length,
        totalRatings,
        averageRating: avgRating,
    };
});
