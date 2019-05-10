import axios from 'axios';
import { CompanyService } from './CompanyService';
import { PriceHistory } from "../models";

jest.mock('axios');

describe('CompanyService', () => {
    test('fetches companies', async () => {
        const companies = [
            {
                Ticker: 'AAPL',
                companyName: 'Apple Inc.'
            },
            {
                Ticker: 'GOOG',
                companyName: 'Alphabet Inc.'
            }
        ];

        const domainCompanies = [
            {
                ticker: 'AAPL',
                name: 'Apple Inc.'
            },
            {
                ticker: 'GOOG',
                name: 'Alphabet Inc.'
            }
        ];

        const response = { data: companies };
        axios.get.mockResolvedValue(response);

        const data = await CompanyService.fetchCompanies();
        expect(data).toEqual(domainCompanies);
    });

    test('fetches company profile', async () => {
        const companyProfile = {
            AAPL: {
                companyName: 'Apple Inc.',
                Beta: '1.139593',
                CEO: 'Timothy D. Cook',
                description: 'Apple Inc is...',
                exchange: 'Nasdaq Global Select',
                image:
                    'https://financialmodelingprep.com/images-New-jpg/AAPL.jpg',
                industry: 'Computer Hardware',
                LastDiv: '2.92',
                MktCap: '937727733600',
                Price: 197.26,
                Changes: 0.05,
                ChangesPerc: '(+0.03%)',
                Range: '142-233.47',
                sector: 'Technology',
                VolAvg: '36724977',
                website: 'http://www.apple.com'
            }
        };

        const domainCompanyProfile = {
            ticker: 'AAPL',
            name: 'Apple Inc.',
            beta: 1.139593,
            ceo: 'Timothy D. Cook',
            description: 'Apple Inc is...',
            exchange: 'Nasdaq Global Select',
            image: 'https://financialmodelingprep.com/images-New-jpg/AAPL.jpg',
            industry: 'Computer Hardware',
            lastDividend: 2.92,
            marketCap: 937727733600,
            price: 197.26,
            priceChange: 0.05,
            priceChangePercent: '(+0.03%)',
            priceRange52Week: '142-233.47',
            sector: 'Technology',
            volumeAverage: 36724977,
            website: 'http://www.apple.com'
        };

        const response = { data: companyProfile };
        axios.get.mockResolvedValue(response);

        const data = await CompanyService.fetchCompanyProfile('AAPL');
        expect(data).toEqual(domainCompanyProfile);
    });

    test('fetches price history', async () => {
        const priceHistory = {
            symbol: 'AAPL',
            historical: [
                {
                    date: 'Wed 05 17 2013 16:04:20 GMT+0100 (CEST)',
                    close: 56.4979
                },
                {
                    date: 'Wed 05 20 2013 16:04:20 GMT+0100 (CEST)',
                    close: 57.7589
                }
            ]
        };

        const domainPriceHistory = {
            ticker: 'AAPL',
            prices: [
                {
                    time: 1368803060000,
                    close: 56.4979
                },
                {
                    time: 1369062260000,
                    close: 57.7589
                },
            ]
        };

        const response = { data: priceHistory };
        axios.get.mockResolvedValue(response);

        const data = await CompanyService.fetchPriceHistory('AAPL');
        expect(data).toEqual(domainPriceHistory);
    });
});
