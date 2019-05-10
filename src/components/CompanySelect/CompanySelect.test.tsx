import React from 'react';
import { render } from 'test-utils';
import { CompanySelect } from './CompanySelect';

describe('<CompanySelect />', () => {
    it('allows user to select a company', () => {
        const { getByText, debug } = render(<CompanySelect />);
        debug();
    });
});
