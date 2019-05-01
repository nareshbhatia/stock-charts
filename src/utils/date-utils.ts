import moment from 'moment';

/**
 * Formats a Date object as YYYY-MM-DD in UTC
 * Example: 2019-04-15T00:00:00Z will be formatted as 2019-04-15
 * @param date
 */
export function formatDateUtc(date: Date) {
    return moment(date)
        .utc()
        .format('YYYY-MM-DD');
}

/**
 * Formats time in millis since Unix Epoch as YYYY-MM-DD in UTC
 * Example: millis equivalent to 2019-04-15T00:00:00Z will be formatted as 2019-04-15
 * @param time
 */
export function formatTimeUtc(time: number) {
    return moment(time)
        .utc()
        .format('YYYY-MM-DD');
}

/**
 * TimePeriods: An enumeration defining useful time periods
 */
export interface TimePeriodMap {
    [param: string]: {
        id: string;
        name: string;
    };
}

export const TimePeriods: TimePeriodMap = {
    oneMonth: {
        id: 'oneMonth',
        name: '1 month'
    },
    sixMonths: {
        id: 'sixMonths',
        name: '6 months'
    },
    ytd: {
        id: 'ytd',
        name: 'YTD'
    },
    oneYear: {
        id: 'oneYear',
        name: '1 year'
    },
    max: {
        id: 'max',
        name: 'Max'
    }
};

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

/**
 * Returns start and end dates based on the specified reference date and
 * time period.
 *
 * Example:
 *   refDate = 2019-04-15
 *
 *   then return values will be as follows:
 *
 *   timePeriod     return value
 *   ----------     ------------
 *   oneMonth       2019-03-15 - 2019-04-15
 *   sixMonths      2018-10-15 - 2019-04-15
 *   ytd            2019-01-01 - 2019-04-15
 *   oneYear        2018-04-15 - 2019-04-15
 *   max            undefined  - undefined
 *
 * @param refDate
 * @param timePeriod
 */
export function getDateRange(
    refDate: Date,
    timePeriod: string
): DateRange | null {
    let startDate;
    const refMoment = moment(refDate);

    switch (timePeriod) {
        case TimePeriods.oneMonth.id:
            startDate = refMoment.subtract(1, 'months').toDate();
            break;

        case TimePeriods.sixMonths.id:
            startDate = refMoment.subtract(6, 'months').toDate();
            break;

        case TimePeriods.ytd.id:
            startDate = refMoment.startOf('year').toDate();
            break;

        case TimePeriods.oneYear.id:
            startDate = refMoment.subtract(1, 'years').toDate();
            break;

        default:
            return null;
    }

    return {
        startDate,
        endDate: refDate
    };
}
