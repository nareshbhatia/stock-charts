import { useState, useEffect } from 'react';
import { PriceHistory } from '../../models';
import { CompanyService } from '../../services';

export const usePriceHistory = (
    ticker?: string
): { loading: boolean; error: any; priceHistory?: PriceHistory } => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [priceHistory, setPriceHistory] = useState<PriceHistory>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!ticker) {
                    return null;
                }

                setLoading(true);
                const priceHistory = await CompanyService.fetchPriceHistory(
                    ticker
                );
                setPriceHistory(priceHistory);
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, [ticker]);

    return { loading, error, priceHistory };
};
