import React from 'react';
import { render } from 'react-testing-library';
import { withMui } from '..';
import { ErrorFallbackComponent } from './ErrorFallbackComponent';

describe('<ErrorFallbackComponent />', () => {
    it('renders error.message for Error objects', () => {
        const ComponentWithTheme = withMui(ErrorFallbackComponent);
        const errorMessage = 'Network Error';
        const { getByText } = render(
            <ComponentWithTheme error={new Error(errorMessage)} />
        );
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders strings as is', () => {
        const ComponentWithTheme = withMui(ErrorFallbackComponent);
        const errorMessage = 'Network Error';
        const { getByText } = render(
            <ComponentWithTheme error={errorMessage} />
        );
        expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it('renders "Something went wrong" for all other types', () => {
        const ComponentWithTheme = withMui(ErrorFallbackComponent);
        const errorMessage = 'Something went wrong';
        const { getByText } = render(
            <ComponentWithTheme error={{ code: 404, message: 'Not Found' }} />
        );
        expect(getByText(errorMessage)).toBeInTheDocument();
    });
});
