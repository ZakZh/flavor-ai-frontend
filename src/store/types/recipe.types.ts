import type {
    BaseEntity,
    LoadingState,
    PaginatedResponse,
} from './common.types';
import type { User } from './auth.types';

export interface Ingredient extends BaseEntity {
    name: string;
}

export interface RecipeIngredient {
    id: number;
    quantity: number;
    unit: string;
    ingredient: Ingredient;
}

export interface Rating extends BaseEntity {
    rating: number;
    userId: number;
    recipeId: number;
}

export interface RecipeNote extends BaseEntity {
    content: string;
    userId: number;
    recipeId: number;
}

export interface Recipe extends BaseEntity {
    title: string;
    description?: string;
    instructions: string[];
    cookTime?: number;
    imageUrl?: string;
    authorId: number;
    author: Pick<User, 'id' | 'username'>;
    ingredients: RecipeIngredient[];
    ratings: Rating[];
    notes?: RecipeNote[];
    averageRating?: number;
    ratingsCount?: number;
}

export interface RecipeFilters {
    cuisine?: string;
    cookTime?: {
        min?: number;
        max?: number;
    };
    difficulty?: 'easy' | 'medium' | 'hard';
    ingredients?: string[];
}

export interface RecipeSearchParams {
    page?: number;
    limit?: number;
    search?: string;
    filters?: RecipeFilters;
}

export interface RecipesState extends LoadingState {
    // Recipe collections
    recipes: Recipe[];
    myRecipes: Recipe[];
    favoriteRecipes: Recipe[];
    recentRecipes: Recipe[];

    // Current recipe
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
}

export interface CreateRecipeData {
    title: string;
    description?: string;
    instructions: string[];
    cookTime?: number;
    imageUrl?: string;
    ingredients: {
        ingredientName: string;
        quantity: number;
        unit: string;
    }[];
}

export interface UpdateRecipeData extends Partial<CreateRecipeData> {
    id: number;
}
