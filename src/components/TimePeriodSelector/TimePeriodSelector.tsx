import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { TimePeriods } from '../../utils';

const useStyles = makeStyles({
    button: {
        height: 32
    }
});

export interface TimePeriodSelectorProps {
    value: string;
    onChange: (event: React.MouseEvent<HTMLElement>, value: any) => void;
}

export const TimePeriodSelector = ({
    value,
    onChange
}: TimePeriodSelectorProps) => {
    const classes = useStyles();

    return (
        <ToggleButtonGroup value={value} exclusive onChange={onChange}>
            {Object.keys(TimePeriods).map(key => (
                <ToggleButton
                    className={classes.button}
                    key={TimePeriods[key].id}
                    value={TimePeriods[key].id}
                >
                    {TimePeriods[key].name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};
