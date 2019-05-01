import {
    formatDateUtc,
    formatTimeUtc,
    getDateRange,
    TimePeriods
} from './date-utils';

const refDate = new Date('2019-04-15');

describe('Formatting dates and times', () => {
    test('formatDateUtc() formats a Date object as YYYY-MM-DD in UTC', () => {
        expect(formatDateUtc(refDate)).toBe('2019-04-15');
    });

    test('formatTimeUtc() formats time in millis as YYYY-MM-DD in UTC', () => {
        expect(formatTimeUtc(refDate.getTime())).toBe('2019-04-15');
    });
});

describe('getDateRange()', () => {
    test('oneMonth returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.oneMonth.id);
        if (range === null) {
            throw new Error('Expected range, actual null');
        }
        expect(formatDateUtc(range.startDate)).toBe('2019-03-15');
        expect(formatDateUtc(range.endDate)).toBe('2019-04-15');
    });

    test('sixMonths returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.sixMonths.id);
        if (range === null) {
            throw new Error('Expected range, actual null');
        }
        expect(formatDateUtc(range.startDate)).toBe('2018-10-15');
        expect(formatDateUtc(range.endDate)).toBe('2019-04-15');
    });

    test('ytd returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.ytd.id);
        if (range === null) {
            throw new Error('Expected range, actual null');
        }
        expect(formatDateUtc(range.startDate)).toBe('2019-01-01');
        expect(formatDateUtc(range.endDate)).toBe('2019-04-15');
    });

    test('oneYear returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.oneYear.id);
        if (range === null) {
            throw new Error('Expected range, actual null');
        }
        expect(formatDateUtc(range.startDate)).toBe('2018-04-15');
        expect(formatDateUtc(range.endDate)).toBe('2019-04-15');
    });

    test('max returns the expected range', () => {
        const range = getDateRange(refDate, TimePeriods.max.id);
        expect(range).toBeNull();
    });
});
