export interface CompanyProfile {
    ticker: string;
    name: string;
    beta: number;
    ceo: string;
    description: string;
    exchange: string;
    image: string;
    industry: string;
    lastDividend: number;
    marketCap: number;
    price: number;
    priceChange: number;
    // received format is (-0.15%) or (+0.15%)
    priceChangePercent: string;
    priceRange52Week: string;
    sector: string;
    volumeAverage: number;
    website: string;
}
