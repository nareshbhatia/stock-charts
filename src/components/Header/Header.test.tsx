import React from 'react';
import { render } from 'test-utils';
import { Header } from './Header';

// Prevent network calls from CompanySelect
jest.mock('../CompanySelect/CompanySelect', () => {
    return {
        CompanySelect: () => null
    };
});

describe('<Header />', () => {
    it('renders the application header', () => {
        const { container } = render(<Header />);
        expect(container).toHaveTextContent('Stock Charts');
    });
});
