export interface StockPrice {
    // millis since Unix Epoch
    time: number;
    close: number;
}

export interface PriceHistory {
    ticker: string;
    prices: Array<StockPrice>;
}
