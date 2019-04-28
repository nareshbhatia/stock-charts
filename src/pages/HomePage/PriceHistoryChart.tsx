import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
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

const CustomTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={0}
            y={0}
            dy={16}
            textAnchor="end"
            fill="#666"
            transform="rotate(-35)"
        >
            {moment(payload.value).format('YYYY-MM-DD')}
        </text>
    </g>
);

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
                        bottom: 32,
                        left: 24
                    }}
                >
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="time"
                        tick={<CustomTick />}
                    />
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
                        stroke="#1277eb"
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};
