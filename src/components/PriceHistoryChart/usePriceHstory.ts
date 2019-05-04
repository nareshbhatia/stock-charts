import { useState, useEffect } from 'react';
import { PriceHistory } from '../../models';
import { CompanyService } from '../../services';

export const usePriceHistory = (
    ticker?: string
): {
    loading: boolean;
    priceHistory: PriceHistory | undefined;
} => {
    const [loading, setLoading] = useState(true);
    const [priceHistory, setPriceHistory] = useState<PriceHistory>();
    const [error, setError] = useState(null);

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

    return { loading, priceHistory };
};
