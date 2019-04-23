import React from 'react';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { FullHeightContainer, Header, Title } from '../../components';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        padding: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    }
}));

export const HomePage = () => {
    const classes = useStyles();
    return (
        <FullHeightContainer>
            <Header />
            <Title>Market Summary</Title>
            <div className={classes.content}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Primary
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                >
                    Secondary
                </Button>
            </div>
        </FullHeightContainer>
    );
};
