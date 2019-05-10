import React, { CSSProperties, useContext } from 'react';
import { Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import AsyncSelect from 'react-select/lib/Async';
import { ValueType } from 'react-select/lib/types';
import { CompanyContext, SetCompanyContext } from '../../contexts';
import { Company } from '../../models';
import { useCompanyList } from './useCompanyList';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 300,
        fontFamily: theme.typography.fontFamily,
        marginLeft: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        }
    }
}));

export const CompanySelect = () => {
    const classes = useStyles();
    const company = useContext(CompanyContext);
    const setCompany = useContext(SetCompanyContext);

    // List of all companies
    const { loading, error, companies } = useCompanyList();

    // Allow ErrorBoundary to handle errors
    if (error) {
        throw error;
    }

    if (loading) {
        return null;
    }

    const customStyles = {
        control: (provided: CSSProperties) => ({
            ...provided,
            background: 'none',
            border: 'none',
            minHeight: '34px'
        }),
        input: (provided: CSSProperties) => ({
            ...provided,
            color: 'inherit',
            fontSize: '16px'
        }),
        placeholder: (provided: CSSProperties) => ({
            ...provided,
            color: 'rgba(255, 255, 255, .5)',
            fontSize: '16px'
        }),
        singleValue: (provided: CSSProperties) => ({
            ...provided,
            color: 'inherit',
            fontSize: '16px'
        }),
        clearIndicator: (provided: CSSProperties) => ({
            ...provided,
            color: 'inherit'
        }),
        option: (
            provided: CSSProperties,
            { isDisabled, isFocused, isSelected }: any
        ) => ({
            ...provided,
            color: isFocused ? 'white' : isSelected ? 'white' : 'black',
            backgroundColor: isFocused
                ? '#408eeb'
                : isSelected
                ? '#28a745'
                : 'white',
            '&:hover': {
                color: 'white',
                backgroundColor: '#408eeb'
            },
            fontSize: '16px'
        })
    };

    const filterCompanies = (inputValue: string) => {
        const input = inputValue.trim().toLowerCase();

        // If the input is blank, return zero matches
        if (input.length === 0) {
            return [];
        }

        // Compute upto 5 matches
        // Note that a for loop is more efficient in this case compared to
        // forEach() or filter() because we have the ability to break.
        let matches = [];
        for (let i = 0; i < companies.length; i++) {
            const company = companies[i];
            const ticker = company.ticker.toLowerCase();
            const name = company.name.toLowerCase();
            if (ticker.includes(input) || name.includes(input)) {
                matches.push(company);
                if (matches.length === 5) break;
            }
        }

        return matches;
    };

    const loadOptions = (inputValue: string) =>
        Promise.resolve(filterCompanies(inputValue));

    // Called whenever selection changes
    const handleChange = (value: ValueType<Company>) => {
        setCompany(value as Company);
    };

    return (
        <div className={classes.root}>
            <AsyncSelect
                value={company}
                loadOptions={loadOptions}
                getOptionValue={option => option.ticker}
                getOptionLabel={option => `${option.ticker} - ${option.name}`}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null
                }}
                isClearable={true}
                isSearchable={true}
                noOptionsMessage={() => 'Enter ticker or name'}
                placeholder="Enter ticker or name"
                styles={customStyles}
                onChange={handleChange}
            />
        </div>
    );
};
