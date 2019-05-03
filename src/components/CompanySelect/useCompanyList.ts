import { useState, useEffect } from 'react';
import { Company } from '../../models';
import { CompanyService } from '../../services';

export const useCompanyList = (): {
    loading: boolean;
    companies: Array<Company>;
} => {
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState<Array<Company>>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const companies = await CompanyService.fetchCompanies();

                // Sort by ticker
                companies.sort((a, b) => {
                    if (a.ticker < b.ticker) return -1;
                    if (a.ticker > b.ticker) return 1;
                    return 0;
                });
                setCompanies(companies);
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, []);

    // Allow ErrorBoundary to handle errors
    if (error) {
        throw error;
    }

    return { loading, companies };
};
