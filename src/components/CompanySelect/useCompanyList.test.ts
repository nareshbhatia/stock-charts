import { renderHook } from '@testing-library/react-hooks';
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
        ticker: 'GOOG',
        name: 'Google Inc.'
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
        // Test for duplicate tickers
        // Not realistic, just to make sure app doesn't break
        {
            ticker: 'GOOG',
            name: 'Google Inc.'
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
        CompanyService: {
            fetchCompanies: () => companiesUnsorted
        }
    };
});

describe('useCompanyList', () => {
    // See the following StackOverflow question for an explanation of this test
    // https://stackoverflow.com/questions/56085458/testing-custom-hook-with-react-hooks-testing-library-throws-an-error
    it('returns a sorted list of companies', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useCompanyList()
        );

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeUndefined();
        expect(result.current.companies).toEqual([]);

        // Wait for the next hook update
        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeUndefined();
        expect(result.current.companies).toEqual(companiesSorted);
    });
});
