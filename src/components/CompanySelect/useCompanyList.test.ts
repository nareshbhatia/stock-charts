import { renderHook } from 'react-hooks-testing-library';
import { useCompanyList } from './useCompanyList';

const companiesSorted = [
    {
        ticker: 'AAPL',
        name: 'Apple Inc.'
    },
    {
        ticker: 'AMZN',
        name: 'Amazon.com Inc.'
    },
    {
        ticker: 'GOOG',
        name: 'Alphabet Inc.'
    },
    {
        ticker: 'GOOGL',
        name: 'Alphabet Inc.'
    },
    {
        ticker: 'MSFT',
        name: 'Microsoft Corporation'
    }
];

jest.mock('../../services/CompanyService', () => {
    const companiesUnsorted = [
        {
            ticker: 'MSFT',
            name: 'Microsoft Corporation'
        },
        {
            ticker: 'AMZN',
            name: 'Amazon.com Inc.'
        },
        {
            ticker: 'GOOG',
            name: 'Alphabet Inc.'
        },
        {
            ticker: 'AAPL',
            name: 'Apple Inc.'
        },
        {
            ticker: 'GOOGL',
            name: 'Alphabet Inc.'
        }
    ];

    return {
        fetchCompanies: () => companiesUnsorted
    };
});

describe('useCompanyList', () => {
    it('returns a sorted list of companies', () => {
        const { result } = renderHook(() => useCompanyList());

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeUndefined();
        expect(result.current.companies).toEqual(companiesSorted);
    });
});
