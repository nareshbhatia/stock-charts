import React from 'react';
import Typography from '@material-ui/core/Typography';
import { PageCenteredContainer } from '..';

export const ErrorMessage: React.FC = ({ children }) => {
    return (
        <PageCenteredContainer dark={true}>
            <Typography component="h1" variant="h3">
                {children}
            </Typography>
        </PageCenteredContainer>
    );
};
