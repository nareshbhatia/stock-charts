import React, { useContext, useState } from 'react';
import Box from '@material-ui/core/Box';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer
} from 'recharts';
import { TimePeriodSelector } from '..';
import { CompanyContext } from '../../contexts';
import { StockPrice } from '../../models';
import { formatTimeUtc, getDateRange, TimePeriods } from '../../utils';
import { usePriceHistory } from './usePriceHstory';

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
            {formatTimeUtc(payload.value)}
        </text>
    </g>
);

export const PriceHistoryChart = () => {
    const company = useContext(CompanyContext);

    // Price history
    const { priceHistory } = usePriceHistory(
        company ? company.ticker : undefined
    );
    const [period, setPeriod] = useState(TimePeriods.oneMonth.id);

    if (!priceHistory) {
        return null;
    }

    const filterPrices = (prices: Array<StockPrice>, period: string) => {
        const range = getDateRange(new Date(), period);
        if (!range) {
            return prices;
        }

        const start = range.startDate.getTime();
        const end = range.endDate.getTime();
        return prices.filter(price => price.time >= start && price.time <= end);
    };

    const prices = filterPrices(priceHistory.prices, period);

    return (
        <React.Fragment>
            <Box display="flex" justifyContent="center">
                <TimePeriodSelector
                    value={period}
                    onChange={(event, value) => {
                        setPeriod(value);
                    }}
                />
            </Box>
            <ResponsiveContainer>
                <LineChart
                    data={prices}
                    margin={{
                        top: 32,
                        right: 16,
                        bottom: 32,
                        left: 16
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
