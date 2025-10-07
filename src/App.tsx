import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from './store/actions';
import type { RootState, AppDispatch } from './store';

import { Layout } from './layout';
import { Loading } from './components/ui';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Recipes } from './pages/Recipes';
import { CreateRecipe } from './pages/CreateRecipe';
import { RecipeDetail } from './pages/RecipeDetail';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to='/login'
            replace
        />
    );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    return !isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate
            to='/dashboard'
            replace
        />
    );
};

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, token, isLoading } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        if (token && !user && !isLoading) {
            dispatch(fetchProfile());
        }
    }, [dispatch, token, user, isLoading]);

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-gray-50'>
                <Loading
                    size='lg'
                    text='Initializing...'
                />
            </div>
        );
    }

    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path='/login'
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path='/register'
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* Protected Routes */}
            <Route
                path='/'
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route
                    index
                    element={
                        <Navigate
                            to='/recipes'
                            replace
                        />
                    }
                />
                <Route
                    path='recipes'
                    element={<Recipes />}
                />
                <Route
                    path='recipes/new'
                    element={<CreateRecipe />}
                />
                <Route
                    path='recipes/:id'
                    element={<RecipeDetail />}
                />
            </Route>

            <Route
                path='*'
                element={
                    <Navigate
                        to={isAuthenticated ? '/recipes' : '/login'}
                        replace
                    />
                }
            />
        </Routes>
    );
}

export default App;
