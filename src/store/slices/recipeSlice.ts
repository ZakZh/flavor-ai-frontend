import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { recipeAPI } from '../../services/recipeAPI';

export interface Recipe {
    id: number;
    title: string;
    description?: string;
    instructions: string;
    cookTime?: number;
    imageUrl?: string;
    ingredients: string[];
    authorId: number;
    author: {
        id: number;
        username: string;
    };
    ratings: {
        id: number;
        rating: number;
        userId: number;
    }[];
    averageRating?: number;
    ratingsCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface RecipeState {
    recipes: Recipe[];
    myRecipes: Recipe[];
    currentRecipe: Recipe | null;
    isLoading: boolean;
    error: string | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    searchQuery: string;
    filters: {
        cuisine?: string;
    };
}

const initialState: RecipeState = {
    recipes: [],
    myRecipes: [],
    currentRecipe: null,
    isLoading: false,
    error: null,
    pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
    searchQuery: '',
    filters: {},
};

// Async thunks
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async (
        params: {
            page?: number;
            limit?: number;
            search?: string;
            cuisine?: string;
        } = {},
        { rejectWithValue }
    ) => {
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

export const fetchMyRecipes = createAsyncThunk(
    'recipes/fetchMyRecipes',
    async (
        params: { page?: number; limit?: number; search?: string } = {},
        { rejectWithValue }
    ) => {
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

export const fetchRecipeById = createAsyncThunk(
    'recipes/fetchRecipeById',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await recipeAPI.getRecipeById(id);
            return response;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch recipe'
            );
        }
    }
);

export const createRecipe = createAsyncThunk(
    'recipes/createRecipe',
    async (
        recipeData: {
            title: string;
            description?: string;
            instructions: string;
            cookTime?: number;
            imageUrl?: string;
            ingredients: string[];
        },
        { rejectWithValue }
    ) => {
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

export const updateRecipe = createAsyncThunk(
    'recipes/updateRecipe',
    async (
        {
            id,
            data,
        }: {
            id: number;
            data: {
                title?: string;
                description?: string;
                instructions?: string;
                cookTime?: number;
                imageUrl?: string;
                ingredients?: string[];
            };
        },
        { rejectWithValue }
    ) => {
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

export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (id: number, { rejectWithValue }) => {
        try {
            await recipeAPI.deleteRecipe(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to delete recipe'
            );
        }
    }
);

export const rateRecipe = createAsyncThunk(
    'recipes/rateRecipe',
    async (
        { id, rating }: { id: number; rating: number },
        { rejectWithValue }
    ) => {
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

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setFilters: (state, action: PayloadAction<{ cuisine?: string }>) => {
            state.filters = action.payload;
        },
        clearCurrentRecipe: (state) => {
            state.currentRecipe = null;
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
                state.recipes = action.payload.data;
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
                state.myRecipes = action.payload.data;
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
            })
            .addCase(createRecipe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Update Recipe
            .addCase(updateRecipe.fulfilled, (state, action) => {
                const index = state.myRecipes.findIndex(
                    (recipe) => recipe.id === action.payload.id
                );
                if (index !== -1) {
                    state.myRecipes[index] = action.payload;
                }
                if (state.currentRecipe?.id === action.payload.id) {
                    state.currentRecipe = action.payload;
                }
            })
            // Delete Recipe
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.myRecipes = state.myRecipes.filter(
                    (recipe) => recipe.id !== action.payload
                );
                state.recipes = state.recipes.filter(
                    (recipe) => recipe.id !== action.payload
                );
            })
            // Rate Recipe
            .addCase(rateRecipe.fulfilled, (state, action) => {
                const recipeId = action.payload.recipeId;
                const updateRecipe = (recipe: Recipe) => {
                    if (recipe.id === recipeId) {
                        recipe.averageRating = action.payload.averageRating;
                        recipe.ratingsCount = action.payload.ratingsCount;
                    }
                };

                state.recipes.forEach(updateRecipe);
                state.myRecipes.forEach(updateRecipe);
                if (
                    state.currentRecipe &&
                    state.currentRecipe.id === recipeId
                ) {
                    updateRecipe(state.currentRecipe);
                }
            });
    },
});

export const { clearError, setSearchQuery, setFilters, clearCurrentRecipe } =
    recipeSlice.actions;
export default recipeSlice.reducer;
