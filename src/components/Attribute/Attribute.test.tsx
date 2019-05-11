import React from 'react';
import { render } from 'test-utils';
import { Attribute } from './Attribute';

describe('<Attribute />', () => {
    it('renders attribute label and value', () => {
        const { container } = render(
            <Attribute label="CEO" value="John Smith" />
        );
        const textRoot = container.querySelector('.MuiTypography-root');
        expect(textRoot).toHaveTextContent('CEO: John Smith');
    });
});
