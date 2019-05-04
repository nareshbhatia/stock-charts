import { useState, useEffect } from 'react';
import { CompanyProfile } from '../../models';
import { CompanyService } from '../../services';

export const useCompanyProfile = (
    ticker?: string
): {
    loading: boolean;
    profile: CompanyProfile | undefined;
} => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<CompanyProfile>();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!ticker) {
                    return null;
                }

                setLoading(true);
                const profile = await CompanyService.fetchCompanyProfile(
                    ticker
                );
                setProfile(profile);
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, [ticker]);

    // Allow ErrorBoundary to handle errors
    if (error) {
        throw error;
    }

    return { loading, profile };
};
