import React from 'react';
import { fireEvent, render, waitForElement } from 'test-utils';
import { CompanySelect } from './CompanySelect';

jest.mock('./useCompanyList', () => {
    return {
        useCompanyList: () => {
            return {
                loading: false,
                error: undefined,
                companies: [
                    {
                        ticker: 'AAPL',
                        name: 'Apple Inc.'
                    },
                    {
                        ticker: 'AMZN',
                        name: 'Amazon.com Inc.'
                    },
                    {
                        ticker: 'GOOG',
                        name: 'Alphabet Inc.'
                    },
                    {
                        ticker: 'GOOGL',
                        name: 'Alphabet Inc.'
                    },
                    {
                        ticker: 'MSFT',
                        name: 'Microsoft Corporation'
                    }
                ]
            };
        }
    };
});

describe('<CompanySelect />', () => {
    it('allows user to select a company', async () => {
        const { container, getByText } = render(<CompanySelect />);

        const targetCompany = 'GOOG - Alphabet Inc.';

        // Type a 'g' into the input element to show options
        // (simulate using a change event - focus and keyboard events don't work well)
        let selectInput: any;
        await waitForElement(
            () =>
                (selectInput = container.querySelector(
                    '.react-select__input input'
                ))
        );
        fireEvent.change(selectInput, { target: { value: 'g' } });

        // Click on the GOOG option
        let selectMenu: any;
        await waitForElement(
            () => (selectMenu = container.querySelector('.react-select__menu'))
        );
        const option = getByText(targetCompany);
        fireEvent.click(option);

        // Assert that GOOG option has been selected
        let singleValue: any;
        await waitForElement(
            () =>
                (singleValue = container.querySelector(
                    '.react-select__single-value'
                ))
        );
        expect(singleValue).toHaveTextContent(targetCompany);
    });
});
