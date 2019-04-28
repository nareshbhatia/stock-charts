export interface StockPrice {
    date: Date;
    close: number;
}

export interface PriceHistory {
    ticker: string;
    prices: Array<StockPrice>;
}
