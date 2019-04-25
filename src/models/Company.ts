export interface Company {
    ticker: string;
    name: string;
}

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
    priceChangePercent: number;
    priceRange52Week: number;
    sector: string;
    volumeAverage: number;
    website: string;
}
