import { createAsyncThunk } from '@reduxjs/toolkit';
import { recipeAPI } from '../../services/recipeAPI';
import type {
    Recipe,
    RecipesResponse,
    RecipeData,
    RecipeParams,
} from '../../services/recipeAPI';

// Recipe action types
export const RECIPE_ACTION_TYPES = {
    FETCH_RECIPES: 'recipes/fetchRecipes',
    FETCH_MY_RECIPES: 'recipes/fetchMyRecipes',
    FETCH_RECIPE_BY_ID: 'recipes/fetchRecipeById',
    CREATE_RECIPE: 'recipes/createRecipe',
    UPDATE_RECIPE: 'recipes/updateRecipe',
    DELETE_RECIPE: 'recipes/deleteRecipe',
    RATE_RECIPE: 'recipes/rateRecipe',
    FETCH_FAVORITE_RECIPES: 'recipes/fetchFavoriteRecipes',
    TOGGLE_FAVORITE: 'recipes/toggleFavorite',
    ADD_NOTE: 'recipes/addNote',
    FETCH_NOTES: 'recipes/fetchNotes',
} as const;

// Fetch all recipes
export const fetchRecipes = createAsyncThunk<
    RecipesResponse,
    RecipeParams,
    { rejectValue: string }
>(
    RECIPE_ACTION_TYPES.FETCH_RECIPES,
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.getRecipes(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch recipes'
            );
        }
    }
);

// Fetch user's recipes
export const fetchMyRecipes = createAsyncThunk<
    RecipesResponse,
    { page?: number; limit?: number },
    { rejectValue: string }
>(
    RECIPE_ACTION_TYPES.FETCH_MY_RECIPES,
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.getMyRecipes(params);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch my recipes'
            );
        }
    }
);

// Fetch recipe by ID
export const fetchRecipeById = createAsyncThunk<
    Recipe,
    number,
    { rejectValue: string }
>(RECIPE_ACTION_TYPES.FETCH_RECIPE_BY_ID, async (id, { rejectWithValue }) => {
    try {
        const response = await recipeAPI.getRecipeById(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch recipe'
        );
    }
});

// Create recipe
export const createRecipe = createAsyncThunk<
    Recipe,
    RecipeData,
    { rejectValue: string }
>(
    RECIPE_ACTION_TYPES.CREATE_RECIPE,
    async (recipeData, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.createRecipe(recipeData);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to create recipe'
            );
        }
    }
);

// Update recipe
export const updateRecipe = createAsyncThunk<
    Recipe,
    { id: number; data: Partial<RecipeData> },
    { rejectValue: string }
>(
    RECIPE_ACTION_TYPES.UPDATE_RECIPE,
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.updateRecipe(id, data);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to update recipe'
            );
        }
    }
);

// Delete recipe
export const deleteRecipe = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(RECIPE_ACTION_TYPES.DELETE_RECIPE, async (id, { rejectWithValue }) => {
    try {
        await recipeAPI.deleteRecipe(id);
        return id;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to delete recipe'
        );
    }
});

// Rate recipe
export const rateRecipe = createAsyncThunk<
    { recipeId: number; averageRating: number; ratingsCount: number },
    { id: number; rating: number },
    { rejectValue: string }
>(
    RECIPE_ACTION_TYPES.RATE_RECIPE,
    async ({ id, rating }, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.rateRecipe(id, rating);
            return { recipeId: id, ...response };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to rate recipe'
            );
        }
    }
);

// Add recipe note
export const addRecipeNote = createAsyncThunk<
    {
        id: number;
        content: string;
        recipeId: number;
        userId: number;
        createdAt: string;
    },
    { id: number; content: string },
    { rejectValue: string }
>(
    RECIPE_ACTION_TYPES.ADD_NOTE,
    async ({ id, content }, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.addNote(id, content);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to add note'
            );
        }
    }
);

// Fetch recipe notes
export const fetchRecipeNotes = createAsyncThunk<
    {
        id: number;
        content: string;
        recipeId: number;
        userId: number;
        createdAt: string;
    }[],
    number,
    { rejectValue: string }
>(RECIPE_ACTION_TYPES.FETCH_NOTES, async (id, { rejectWithValue }) => {
    try {
        const response = await recipeAPI.getNotes(id);
        return response;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch notes'
        );
    }
});
