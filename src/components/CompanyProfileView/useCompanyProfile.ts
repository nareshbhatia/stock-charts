import { useState, useEffect } from 'react';
import { CompanyProfile } from '../../models';
import { CompanyService } from '../../services';

export const useCompanyProfile = (
    ticker?: string
): { loading: boolean; error: any; profile?: CompanyProfile } => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [profile, setProfile] = useState<CompanyProfile>();

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
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, [ticker]);

    return { loading, error, profile };
};
