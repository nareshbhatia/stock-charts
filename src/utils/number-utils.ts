import numeral from 'numeral';

/**
 * Formats value as a comma-separated number with 2 decimal digits
 * Example: 1000 --> 1,000.00
 * @param value
 */
export function numberToMoney(value: number) {
    return numeral(value).format('0,0.00');
}

/**
 * Formats value as a comma-separated number with optional decimal digits
 * Examples:
 *     1000 --> 1,000
 *     1000.00 --> 1,000.00       <--- not working
 *     1000.01 --> 1,000.01
 *     1000.0000 --> 1,000.0000   <--- not working
 *     1000.0001 --> 1,000.0001
 * @param value
 */
export function formatWithCommas(value: number) {
    return numeral(value).format('0,0.[0000]');
}

/**
 * Formats value with plus of minus sign
 * Examples:
 *      1 --> '+1'
 *     -1 --> '-1'
 * @param value
 */
export function formatWithSign(value: number) {
    return numeral(value).format('+0.[0000]');
}

/**
 * Formats value as an abbreviation
 * Examples:
 *     100000 --> 100k
 * @param value
 */
export function formatWithAbbreviation(value: number) {
    return numeral(value).format('0a');
}

/**
 * Tries to convert strings in various formats to a number
 * Examples:
 *     '10,000.12'  --> 10000.12
 *     '23rd'       --> 23
 *     '$10,000.00' --> 10000
 *     '100B'       --> 100
 *     '3.467TB'    --> 3467000000000
 *     '-76%'       --> -0.76
 * @param value
 */
export function stringToNumber(value: string) {
    return numeral(value).value();
}
