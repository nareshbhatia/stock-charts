import axios from 'axios';
import { Company, CompanyProfile, PriceHistory, StockPrice } from '../models';

const api = process.env.REACT_APP_API_URL;

/**
 * Map company received from server to domain
 * @param company
 */
const mapCompanyToDomain = (company: any): Company => {
    return {
        ticker: company.Ticker,
        name: company.companyName
    };
};

/**
 * Map profile received from server to domain
 * @param ticker
 * @param profile
 */
const mapProfileToDomain = (ticker: string, profile: any): CompanyProfile => {
    return {
        ticker,
        name: profile.companyName,
        beta: parseFloat(profile.Beta),
        ceo: profile.CEO,
        description: profile.description,
        exchange: profile.exchange,
        image: profile.image,
        industry: profile.industry,
        lastDividend: parseFloat(profile.LastDiv),
        marketCap: parseInt(profile.MktCap, 10),
        price: profile.Price,
        priceChange: parseFloat(profile.Changes),
        priceChangePercent: profile.ChangesPerc,
        priceRange52Week: profile.Range,
        sector: profile.sector,
        volumeAverage: parseInt(profile.VolAvg, 10),
        website: profile.website
    };
};

/**
 * Map prices received from server to domain
 * @param prices
 */
const mapPricesToDomain = (prices: Array<any>): Array<StockPrice> => {
    return prices.map(price => ({
        time: new Date(price.date).getTime(),
        close: price.close
    }));
};

async function fetchCompanies(): Promise<Array<Company>> {
    const resp = await axios.get(`${api}/stock/list/all?datatype=json`);
    const data = resp.data;

    // Convert to application domain and return
    return data.map((company: any) => mapCompanyToDomain(company));
}

async function fetchCompanyProfile(ticker: string): Promise<CompanyProfile> {
    const resp = await axios.get(
        `${api}/company/profile/${ticker}?datatype=json`
    );
    const data = resp.data;

    // Convert to application domain and return
    return mapProfileToDomain(ticker, data[ticker]);
}

async function fetchPriceHistory(ticker: string): Promise<PriceHistory> {
    const resp = await axios.get(
        `${api}/company/historical-price/${ticker}?datatype=json`
    );
    const data = resp.data;

    // Convert to application domain and return
    return {
        ticker: data.symbol,
        prices: mapPricesToDomain(data.historical)
    };
}

export const CompanyService = {
    fetchCompanies,
    fetchCompanyProfile,
    fetchPriceHistory
};
