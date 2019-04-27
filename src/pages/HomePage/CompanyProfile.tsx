import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Title } from '../../components';
import { CompanyContext } from '../../contexts';

const useStyles = makeStyles({
    depositContext: {
        flex: 1
    }
});

export const CompanyProfile = () => {
    const classes = useStyles();
    const company = useContext(CompanyContext);

    if (!company) {
        return null;
    }

    return (
        <React.Fragment>
            <Title>{company.name}</Title>
            <Typography component="p" variant="h4">
                $3,024.00
            </Typography>
            <Typography
                color="textSecondary"
                className={classes.depositContext}
            >
                on 15 March, 2019
            </Typography>
        </React.Fragment>
    );
};
