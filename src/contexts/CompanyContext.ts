import React from 'react';
import { Company } from '../models';

export const CompanyContext = React.createContext<Company | undefined>({
    ticker: 'AAPL',
    name: 'Apple, Inc.'
});
