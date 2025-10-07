import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRecipes, fetchMyRecipes } from '../store/slices/recipeSlice';
import { Button, Input, Card, CardContent, Loading } from '../components/ui';
import { RecipeCard } from '../components/RecipeCard/RecipeCard';
import type { RootState, AppDispatch } from '../store';

type TabType = 'all' | 'my';

export const Recipes: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { recipes, myRecipes, isLoading, pagination } = useSelector(
        (state: RootState) => state.recipes
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<TabType>('all');

    const displayedRecipes = activeTab === 'my' ? myRecipes : recipes;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        dispatch(fetchRecipes({ page: 1, limit: 12 }));
        dispatch(fetchMyRecipes({ page: 1, limit: 12 }));
    }, [dispatch]);

    useEffect(() => {
        if (activeTab === 'all') {
            dispatch(
                fetchRecipes({
                    page: currentPage,
                    limit: 12,
                    search: debouncedSearchTerm || undefined,
                })
            );
        } else {
            dispatch(
                fetchMyRecipes({
                    page: currentPage,
                    limit: 12,
                    search: debouncedSearchTerm || undefined,
                })
            );
        }
    }, [dispatch, currentPage, debouncedSearchTerm, activeTab]);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setSearchTerm('');
        setDebouncedSearchTerm('');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='space-y-8'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        {activeTab === 'all' ? 'All Recipes' : 'My Recipes'}
                    </h1>
                    <p className='text-gray-600 mt-1'>
                        {activeTab === 'all'
                            ? 'Discover amazing recipes from our community'
                            : 'Your personal recipe collection'}
                    </p>
                </div>
                <Link to='/recipes/new'>
                    <Button>
                        <svg
                            className='w-4 h-4 mr-2'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 4v16m8-8H4'
                            />
                        </svg>
                        Create Recipe
                    </Button>
                </Link>
            </div>

            <div className='border-b border-gray-200'>
                <nav className='-mb-px flex space-x-8'>
                    <button
                        onClick={() => handleTabChange('all')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'all'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        All Recipes
                        <span className='ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium'>
                            {recipes.length}
                        </span>
                    </button>
                    <button
                        onClick={() => handleTabChange('my')}
                        className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeTab === 'my'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        My Recipes
                        <span className='ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium'>
                            {myRecipes.length}
                        </span>
                    </button>
                </nav>
            </div>

            <Card>
                <CardContent className='p-6'>
                    <form
                        onSubmit={handleSearch}
                        className='flex gap-4'
                    >
                        <Input
                            placeholder='Search recipes...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='flex-1'
                        />
                        <Button type='submit'>
                            <svg
                                className='w-4 h-4 mr-2'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {isLoading ? (
                <div className='flex justify-center py-12'>
                    <Loading
                        size='lg'
                        text='Loading recipes...'
                    />
                </div>
            ) : displayedRecipes.length > 0 ? (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {displayedRecipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                            />
                        ))}
                    </div>

                    {pagination && pagination.totalPages > 1 && (
                        <div className='flex justify-center items-center gap-2'>
                            <Button
                                variant='outline'
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>

                            <div className='flex gap-1'>
                                {Array.from(
                                    {
                                        length: Math.min(
                                            5,
                                            pagination.totalPages
                                        ),
                                    },
                                    (_, i) => {
                                        const page = i + 1;
                                        return (
                                            <Button
                                                key={page}
                                                variant={
                                                    currentPage === page
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                onClick={() =>
                                                    handlePageChange(page)
                                                }
                                                size='sm'
                                            >
                                                {page}
                                            </Button>
                                        );
                                    }
                                )}
                            </div>

                            <Button
                                variant='outline'
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === pagination.totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <Card>
                    <CardContent className='p-12 text-center'>
                        <div className='text-6xl mb-4'>🔍</div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                            {searchTerm ? 'No recipes found' : 'No recipes yet'}
                        </h3>
                        <p className='text-gray-600 mb-6'>
                            {searchTerm
                                ? `No recipes match "${searchTerm}". Try a different search term.`
                                : 'Be the first to add a recipe to our community!'}
                        </p>
                        {!searchTerm && (
                            <Link to='/recipes/new'>
                                <Button>Create Your First Recipe</Button>
                            </Link>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
