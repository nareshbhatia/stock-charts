import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { FullHeightContainer, Header } from '../../components';
import { CompanyProfile } from './CompanyProfile';
import { PriceHistory } from './PriceHistory';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 300
    }
}));

export const HomePage = () => {
    const classes = useStyles();
    return (
        <FullHeightContainer>
            <Header />

            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <Paper className={classes.paper}>
                            <CompanyProfile />
                        </Paper>
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={classes.paper}>
                            <PriceHistory />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </FullHeightContainer>
    );
};
