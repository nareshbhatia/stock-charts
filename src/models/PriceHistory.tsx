import { LocalDate } from 'js-joda';

export interface StockPrice {
    date: LocalDate;
    close: number;
}

export interface PriceHistory {
    ticker: string;
    prices: Array<StockPrice>;
}
