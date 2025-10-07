import { validationRules, type FormSchema } from '../validation';

// Recipe form validation schema
export const recipeSchema: FormSchema = {
    title: {
        rules: [
            validationRules.required('Recipe title is required'),
            validationRules.minLength(3, 'Title must be at least 3 characters'),
            validationRules.maxLength(
                100,
                'Title must be no more than 100 characters'
            ),
        ],
    },
    description: {
        rules: [
            validationRules.maxLength(
                500,
                'Description must be no more than 500 characters'
            ),
        ],
    },
    cookTime: {
        rules: [
            validationRules.numeric('Cook time must be a valid number'),
            validationRules.positiveNumber(
                'Cook time must be a positive number'
            ),
        ],
    },
    imageUrl: {
        rules: [validationRules.url('Please enter a valid image URL')],
    },
    instructions: {
        rules: [
            validationRules.custom((instructions: string[]) => {
                if (!instructions || !Array.isArray(instructions)) return false;
                const validInstructions = instructions.filter(
                    (inst) => inst.trim() !== ''
                );
                return validInstructions.length > 0;
            }, 'At least one instruction is required'),
        ],
    },
    ingredients: {
        rules: [
            validationRules.custom((ingredients: any[]) => {
                if (!ingredients || !Array.isArray(ingredients)) return false;
                const validIngredients = ingredients.filter(
                    (ing) =>
                        ing.ingredientName && ing.ingredientName.trim() !== ''
                );
                return validIngredients.length > 0;
            }, 'At least one ingredient is required'),
        ],
    },
};

// Individual ingredient validation
export const ingredientSchema: FormSchema = {
    ingredientName: {
        rules: [
            validationRules.required('Ingredient name is required'),
            validationRules.maxLength(
                100,
                'Ingredient name must be no more than 100 characters'
            ),
        ],
    },
    quantity: {
        rules: [
            validationRules.required('Quantity is required'),
            validationRules.positiveNumber(
                'Quantity must be a positive number'
            ),
        ],
    },
    unit: {
        rules: [
            validationRules.required('Unit is required'),
            validationRules.maxLength(
                20,
                'Unit must be no more than 20 characters'
            ),
        ],
    },
};

// Recipe rating validation
export const ratingSchema: FormSchema = {
    rating: {
        rules: [
            validationRules.required('Rating is required'),
            validationRules.custom(
                (value: number) => value >= 1 && value <= 5,
                'Rating must be between 1 and 5 stars'
            ),
        ],
    },
};

// Recipe note validation
export const noteSchema: FormSchema = {
    content: {
        rules: [
            validationRules.required('Note content is required'),
            validationRules.minLength(1, 'Note cannot be empty'),
            validationRules.maxLength(
                1000,
                'Note must be no more than 1000 characters'
            ),
        ],
    },
};
