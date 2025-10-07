# Modular Redux Store Architecture

This directory contains a modular Redux store structure that promotes maintainability, testability, and scalability.

## Structure

```
store/
├── actions/           # Async thunks and action creators
│   ├── auth.actions.ts
│   ├── recipe.actions.ts
│   └── index.ts
├── middleware/        # Custom middleware
│   ├── auth.middleware.ts
│   ├── recipe.middleware.ts
│   └── index.ts
├── selectors/         # Memoized selectors
│   ├── auth.selectors.ts
│   ├── recipe.selectors.ts
│   └── index.ts
├── slices/           # Redux slices
│   ├── auth.slice.ts
│   ├── recipes.slice.ts
│   └── index.ts
├── types/            # TypeScript types
│   ├── auth.types.ts
│   ├── recipe.types.ts
│   ├── common.types.ts
│   └── index.ts
├── hooks.ts          # Typed hooks and utilities
└── index.ts          # Store configuration
```

## Key Features

### 1. **Modular Actions**

-   Actions are organized by feature domain
-   Type-safe async thunks with proper error handling
-   Consistent naming conventions with action type constants

### 2. **Reusable Selectors**

-   Memoized selectors using `createSelector`
-   Derived data computation
-   Performance optimized state access

### 3. **Custom Middleware**

-   Feature-specific side effects
-   Cross-cutting concerns (logging, analytics)
-   Complex business logic orchestration

### 4. **Type Safety**

-   Centralized type definitions
-   Proper TypeScript integration
-   Type-safe hooks and selectors

### 5. **Enhanced Developer Experience**

-   Redux DevTools integration
-   Hot reloading support
-   Clear separation of concerns

## Usage Examples

### Basic Usage

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser } from '../store/actions';
import { selectUser, selectAuthLoading } from '../store/selectors';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectAuthLoading);

  const handleLogin = async () => {
    await dispatch(loginUser({ email, password }));
  };

  return (
    // Component JSX
  );
};
```

### Advanced Selectors

```typescript
import { useAppSelector } from '../store/hooks';
import { selectFilteredRecipes, selectRecipesStats } from '../store/selectors';

const RecipesList = () => {
  const filteredRecipes = useAppSelector(selectFilteredRecipes);
  const stats = useAppSelector(selectRecipesStats);

  return (
    // Component JSX
  );
};
```

### Custom Hooks

```typescript
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchRecipes, setSearchQuery } from '../store/actions';

export const useRecipeSearch = () => {
    const dispatch = useAppDispatch();
    const { searchQuery, recipes, isLoading } = useAppSelector(
        (state) => state.recipes
    );

    const search = useCallback(
        (query: string) => {
            dispatch(setSearchQuery(query));
            dispatch(fetchRecipes({ search: query, page: 1 }));
        },
        [dispatch]
    );

    return { searchQuery, recipes, isLoading, search };
};
```

## Benefits

1. **Maintainability**: Clear separation of concerns makes code easier to maintain
2. **Testability**: Individual pieces can be tested in isolation
3. **Scalability**: Easy to add new features without affecting existing code
4. **Performance**: Memoized selectors prevent unnecessary re-renders
5. **Developer Experience**: Better IDE support and debugging capabilities

## Best Practices

1. **Keep Actions Pure**: Actions should only handle API calls and data transformation
2. **Use Selectors**: Always access state through selectors, never directly
3. **Normalize State**: Keep state flat and normalized for better performance
4. **Handle Loading States**: Always provide loading and error states
5. **Type Everything**: Use TypeScript for all store-related code
6. **Consistent Naming**: Follow consistent naming conventions across the store

## Adding New Features

1. **Create Types**: Define interfaces in `types/feature.types.ts`
2. **Create Actions**: Add async thunks in `actions/feature.actions.ts`
3. **Create Selectors**: Add memoized selectors in `selectors/feature.selectors.ts`
4. **Create Slice**: Add reducer logic in `slices/feature.slice.ts`
5. **Add Middleware**: Create feature-specific middleware if needed
6. **Update Store**: Register the new slice in the store configuration
