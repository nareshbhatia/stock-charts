import { useState, useEffect } from 'react';
import { Company } from '../../models';
import { CompanyService } from '../../services';

export const useCompanyList = (): {
    loading: boolean;
    error: any;
    companies: Array<Company>;
} => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [companies, setCompanies] = useState<Array<Company>>([]);

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

    return { loading, error, companies };
};
