import React from 'react';
import { Company } from '../models';

export const CompanyContext = React.createContext<Company | undefined>({
    ticker: 'AAPL',
    name: 'Apple Inc.'
});

type SetCompany = (company: Company) => void;

export const SetCompanyContext = React.createContext<SetCompany>(() => {});
