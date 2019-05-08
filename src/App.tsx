import React, { Suspense, useState } from 'react';
import { ErrorBoundary, Loading } from './components';
import { CompanyContext, SetCompanyContext } from './contexts';
import { Company } from './models';
import { HomePage } from './pages';

export const App: React.FC = () => {
    // The company in context
    const [company, setCompany] = useState<Company>({
        ticker: 'AAPL',
        name: 'Apple Inc.'
    });

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <CompanyContext.Provider value={company}>
                    <SetCompanyContext.Provider value={setCompany}>
                        <HomePage />
                    </SetCompanyContext.Provider>
                </CompanyContext.Provider>
            </Suspense>
        </ErrorBoundary>
    );
};
