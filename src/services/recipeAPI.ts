import api from './api';

export interface RecipeData {
    title: string;
    description?: string;
    instructions: string;
    cookTime?: number;
    imageUrl?: string;
    ingredients: string[];
}

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

export interface RecipesResponse {
    data: Recipe[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface RecipeParams {
    page?: number;
    limit?: number;
    search?: string;
    cuisine?: string;
}

export const recipeAPI = {
    async getRecipes(params: RecipeParams = {}): Promise<RecipesResponse> {
        const response = await api.get('/recipes', { params });
        return response.data;
    },

    async getMyRecipes(
        params: { page?: number; limit?: number; search?: string } = {}
    ): Promise<RecipesResponse> {
        const response = await api.get('/recipes/my-recipes', { params });
        return response.data;
    },

    async getRecipeById(id: number): Promise<Recipe> {
        const response = await api.get(`/recipes/${id}`);
        return response.data;
    },

    async createRecipe(recipeData: RecipeData): Promise<Recipe> {
        const response = await api.post('/recipes', recipeData);
        return response.data;
    },

    async updateRecipe(id: number, data: Partial<RecipeData>): Promise<Recipe> {
        const response = await api.patch(`/recipes/${id}`, data);
        return response.data;
    },

    async deleteRecipe(id: number): Promise<void> {
        await api.delete(`/recipes/${id}`);
    },

    async rateRecipe(
        id: number,
        rating: number
    ): Promise<{
        averageRating: number;
        ratingsCount: number;
    }> {
        const response = await api.post(`/recipes/${id}/rate`, {
            rating,
        });
        return response.data;
    },

    async addNote(
        id: number,
        content: string
    ): Promise<{
        id: number;
        content: string;
        recipeId: number;
        userId: number;
        createdAt: string;
    }> {
        const response = await api.post(`/recipes/${id}/notes`, { content });
        return response.data;
    },

    async getNotes(id: number): Promise<
        {
            id: number;
            content: string;
            recipeId: number;
            userId: number;
            createdAt: string;
        }[]
    > {
        const response = await api.get(`/recipes/${id}/notes`);
        return response.data;
    },
};
