import React from 'react';
import { render } from 'test-utils';
import { ErrorBoundary } from './ErrorBoundary';

const goodBoyText = 'I am a good boy';
const badBoyText = 'I am a bad boy';

beforeEach(() => {
    // When an error is thrown a bunch of console.errors are called even though
    // the error boundary handles the error. This makes the test output noisy,
    // so we'll mock out console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
    console.error.mockRestore();
});

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

        // By mocking out console.error we may inadvertently miss out on
        // logs due to real errors. Let's reduce that likelihood by adding
        // an assertion for how frequently console.error should be called.
        expect(console.error).toHaveBeenCalledTimes(0);
    });

    it('renders the fallback UI when the child throws an error', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <BadBoy />
            </ErrorBoundary>
        );
        expect(getByText(badBoyText)).toBeInTheDocument();
        expect(console.error).toHaveBeenCalledTimes(2);
    });
});
