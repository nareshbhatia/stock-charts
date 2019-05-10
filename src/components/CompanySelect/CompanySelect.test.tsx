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
        const { debug, container, getByText } = render(<CompanySelect />);

        // Focus on the input element
        let selectInput: any;
        await waitForElement(
            () =>
                (selectInput = container.querySelector(
                    '.react-select__input input'
                ))
        );
        fireEvent.focus(selectInput);

        // Mouse down on select control to open the menu
        // The menu simply shows the no-options notice: "Enter ticker or name"
        let selectControl: any;
        await waitForElement(
            () =>
                (selectControl = container.querySelector(
                    '.react-select__control'
                ))
        );
        fireEvent.mouseDown(selectControl);

        // Type into the input to start showing options
        fireEvent.keyDown(selectInput, { key: 'g', code: 71, charCode: 71 });
        debug();

        // --------------------------------------------------------------------
        // Expected menu options don't show up at this point, getByText() fails
        // --------------------------------------------------------------------
        let selectMenu: any;
        await waitForElement(
            () =>
                (selectMenu = container.querySelector(
                    '.react-select__menu'
                ))
        );
        const option = getByText('GOOG - Alphabet Inc.');
        fireEvent.click(option);

        // TODO: How to mock handleOnChange? It is not exposed by the component.
        // expect(handleOnChange).toHaveBeenCalledTimes(1);
    });
});
