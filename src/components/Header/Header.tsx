import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CompanyAutosuggest } from './CompanyAutosuggest';

const useStyles = makeStyles({
    title: {
        flex: 1
    }
});

export const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                >
                    Stock Charts
                </Typography>
                <CompanyAutosuggest />
            </Toolbar>
        </AppBar>
    );
};
