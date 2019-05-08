import React from 'react';
import { render } from 'test-utils';
import { ErrorBoundary } from './ErrorBoundary';

const goodBoyText = 'I am a good boy';
const badBoyText = 'I am a bad boy';

const GoodBoy = () => {
    return <div>{goodBoyText}</div>;
};

const BadBoy = () => {
    throw new Error(badBoyText);
};

describe('<ErrorBoundary />', () => {
    it('renders its child when there is no error', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <GoodBoy />
            </ErrorBoundary>
        );
        expect(getByText(goodBoyText)).toBeInTheDocument();
    });

    it('renders the fallback UI when the child throws an error', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <BadBoy />
            </ErrorBoundary>
        );
        expect(getByText(badBoyText)).toBeInTheDocument();
    });
});
