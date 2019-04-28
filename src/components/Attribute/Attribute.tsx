import React, { ReactNode } from 'react';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    attribute: {
        marginBottom: theme.spacing(1),
        fontSize: '0.8rem'
    }
}));

export interface AttributeProps {
    label: string;
    value: ReactNode;
}

/**
 * Displays a label and a value
 */
export const Attribute = ({ label, value }: AttributeProps) => {
    const classes = useStyles();

    return (
        <Typography className={classes.attribute}>
            <strong>{label}:</strong> {value}
        </Typography>
    );
};
