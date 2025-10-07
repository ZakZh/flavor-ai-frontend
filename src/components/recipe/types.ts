import type { Recipe as StoreRecipe } from '../../store/types/recipe.types';
import type { Recipe as APIRecipe } from '../../services/recipeAPI';
import type { User } from '../../store/types/auth.types';

type Recipe = StoreRecipe | APIRecipe;

export interface RecipeHeaderProps {
    onGoBack: () => void;
}

export interface RecipeImageProps {
    recipe: Recipe;
}

export interface RecipeMetadataProps {
    recipe: Recipe;
    formatDate: (dateString: string) => string;
}

export interface RecipeIngredientsProps {
    ingredients:
        | string[]
        | { ingredient: { name: string }; quantity: number; unit: string }[];
}

export interface RecipeInstructionsProps {
    instructions: string | string[];
}

export interface RecipeRatingProps {
    recipe: Recipe;
    user: User | null;
    userRating: number;
    isSubmittingRating: boolean;
    onRatingChange: (rating: number) => void;
    isOwner: boolean;
}

export interface RecipeStatsProps {
    recipe: Recipe;
    formatDate: (dateString: string) => string;
}

export interface RecipeShareProps {
    recipe: Recipe;
}
