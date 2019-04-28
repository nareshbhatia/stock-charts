import React, { useContext, useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer
} from 'recharts';
import { CompanyContext } from '../../contexts';
import { PriceHistory } from '../../models';
import { CompanyService } from '../../services';

export const PriceHistoryChart = () => {
    const company = useContext(CompanyContext);

    // Price history
    const [priceHistory, setPriceHistory] = useState<PriceHistory>();

    // Get the price history
    useEffect(() => {
        async function fetchData() {
            if (!company) {
                return null;
            }

            const priceHistory = await CompanyService.fetchPriceHistory(
                company.ticker
            );
            setPriceHistory(priceHistory);
        }

        fetchData();
    }, [company]);

    if (!priceHistory) {
        return null;
    }

    return (
        <React.Fragment>
            <ResponsiveContainer>
                <LineChart
                    data={priceHistory.prices}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24
                    }}
                >
                    <XAxis dataKey="date" />
                    <YAxis>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle' }}
                        >
                            Price
                        </Label>
                    </YAxis>
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#556CD6"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};
