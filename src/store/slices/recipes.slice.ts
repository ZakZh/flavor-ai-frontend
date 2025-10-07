import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
    fetchRecipes,
    fetchMyRecipes,
    fetchRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    rateRecipe,
} from '../actions';
import type { Recipe } from '../../services/recipeAPI';

export interface RecipeFilters {
    cuisine?: string;
    cookTime?: {
        min?: number;
        max?: number;
    };
    ingredients?: string[];
}

export interface RecipesState {
    // Recipe collections
    recipes: Recipe[];
    myRecipes: Recipe[];
    currentRecipe: Recipe | null;

    // Search and filters
    searchQuery: string;
    filters: RecipeFilters;

    // Pagination
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };

    // UI states
    view: 'grid' | 'list';
    sortBy: 'newest' | 'oldest' | 'rating' | 'cookTime' | 'title';
    sortOrder: 'asc' | 'desc';

    // Loading states
    isLoading: boolean;
    error: string | null;
}

const initialState: RecipesState = {
    recipes: [],
    myRecipes: [],
    currentRecipe: null,
    searchQuery: '',
    filters: {},
    pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
    },
    view: 'grid',
    sortBy: 'newest',
    sortOrder: 'desc',
    isLoading: false,
    error: null,
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },

        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            // Reset pagination when searching
            state.pagination.page = 1;
        },

        setFilters: (state, action: PayloadAction<RecipeFilters>) => {
            state.filters = action.payload;
            // Reset pagination when filtering
            state.pagination.page = 1;
        },

        clearFilters: (state) => {
            state.filters = {};
            state.searchQuery = '';
            state.pagination.page = 1;
        },

        setView: (state, action: PayloadAction<'grid' | 'list'>) => {
            state.view = action.payload;
        },

        setSorting: (
            state,
            action: PayloadAction<{
                sortBy: RecipesState['sortBy'];
                sortOrder: RecipesState['sortOrder'];
            }>
        ) => {
            state.sortBy = action.payload.sortBy;
            state.sortOrder = action.payload.sortOrder;
        },

        clearCurrentRecipe: (state) => {
            state.currentRecipe = null;
        },

        resetPagination: (state) => {
            state.pagination = {
                page: 1,
                limit: 12,
                total: 0,
                totalPages: 0,
            };
        },
    },

    extraReducers: (builder) => {
        builder
            // Fetch Recipes
            .addCase(fetchRecipes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.isLoading = false;
                // If it's the first page, replace recipes, otherwise append
                if (action.meta.arg.page === 1) {
                    state.recipes = action.payload.data;
                } else {
                    state.recipes.push(...action.payload.data);
                }
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Fetch My Recipes
            .addCase(fetchMyRecipes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyRecipes.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.meta.arg.page === 1) {
                    state.myRecipes = action.payload.data;
                } else {
                    state.myRecipes.push(...action.payload.data);
                }
            })
            .addCase(fetchMyRecipes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Fetch Recipe By ID
            .addCase(fetchRecipeById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentRecipe = action.payload;
            })
            .addCase(fetchRecipeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Create Recipe
            .addCase(createRecipe.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createRecipe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.myRecipes.unshift(action.payload);
                // Also add to main recipes list if it exists
                state.recipes.unshift(action.payload);
            })
            .addCase(createRecipe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // Update Recipe
            .addCase(updateRecipe.fulfilled, (state, action) => {
                const updatedRecipe = action.payload;

                // Update in my recipes
                const myRecipeIndex = state.myRecipes.findIndex(
                    (recipe) => recipe.id === updatedRecipe.id
                );
                if (myRecipeIndex !== -1) {
                    state.myRecipes[myRecipeIndex] = updatedRecipe;
                }

                // Update in all recipes
                const recipeIndex = state.recipes.findIndex(
                    (recipe) => recipe.id === updatedRecipe.id
                );
                if (recipeIndex !== -1) {
                    state.recipes[recipeIndex] = updatedRecipe;
                }

                // Update current recipe if it's the same one
                if (state.currentRecipe?.id === updatedRecipe.id) {
                    state.currentRecipe = updatedRecipe;
                }
            })

            // Delete Recipe
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.myRecipes = state.myRecipes.filter(
                    (recipe) => recipe.id !== deletedId
                );
                state.recipes = state.recipes.filter(
                    (recipe) => recipe.id !== deletedId
                );

                if (state.currentRecipe?.id === deletedId) {
                    state.currentRecipe = null;
                }
            })

            // Rate Recipe
            .addCase(rateRecipe.fulfilled, (state, action) => {
                const { recipeId, averageRating, ratingsCount } =
                    action.payload;

                const updateRecipeRating = (recipe: Recipe) => {
                    if (recipe.id === recipeId) {
                        recipe.averageRating = averageRating;
                        recipe.ratingsCount = ratingsCount;
                    }
                };

                state.recipes.forEach(updateRecipeRating);
                state.myRecipes.forEach(updateRecipeRating);

                if (
                    state.currentRecipe &&
                    state.currentRecipe.id === recipeId
                ) {
                    updateRecipeRating(state.currentRecipe);
                }
            });
    },
});

export const {
    clearError,
    setSearchQuery,
    setFilters,
    clearFilters,
    setView,
    setSorting,
    clearCurrentRecipe,
    resetPagination,
} = recipesSlice.actions;

export default recipesSlice.reducer;
