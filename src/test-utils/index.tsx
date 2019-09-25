import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { render } from '@testing-library/react';
import { theme } from '../components';
import { CompanyContext, SetCompanyContext } from '../contexts';
import { Company } from '../models';

const TestWrapper: React.FC = ({ children }) => {
    // The company in context
    const [company, setCompany] = useState<Company>({
        ticker: 'AAPL',
        name: 'Apple Inc.'
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <CompanyContext.Provider value={company}>
                <SetCompanyContext.Provider value={setCompany}>
                    {children}
                </SetCompanyContext.Provider>
            </CompanyContext.Provider>
        </ThemeProvider>
    );
};

const customRender = (ui: React.ReactElement<any>, options?: any) =>
    render(ui, { wrapper: TestWrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
