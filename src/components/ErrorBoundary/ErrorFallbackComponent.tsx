import React from 'react';
import Typography from '@material-ui/core/Typography';
import { PageCenteredContainer } from '..';
import { errorToString } from '../../utils';

export interface ErrorFallbackComponentProps {
    error: any;
}

export const ErrorFallbackComponent = ({
    error
}: ErrorFallbackComponentProps) => (
    <PageCenteredContainer data-testid="error-fallback-ui" dark={true}>
        <Typography component="h1" variant="h3">
            {errorToString(error)}
        </Typography>
    </PageCenteredContainer>
);
