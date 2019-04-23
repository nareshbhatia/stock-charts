import React, { Suspense } from 'react';
import { ErrorBoundary, Loading } from './components';
import { HomePage } from './pages';

export const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <HomePage />
            </Suspense>
        </ErrorBoundary>
    );
};
