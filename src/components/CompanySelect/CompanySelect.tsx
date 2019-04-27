import React, { CSSProperties, useState, useEffect } from 'react';
import { Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';
import AsyncSelect from 'react-select/lib/Async';
import { ValueType } from 'react-select/lib/types';
import { Company } from '../../models';
import { CompanyService } from '../../services';

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

    // Selected company
    const [selectedCompany, setSelectedCompany] = useState<Company>();

    // List of all companies
    const [companies, setCompanies] = useState<Company[]>([]);

    // Get the list of all companies
    useEffect(() => {
        async function fetchData() {
            const companies = await CompanyService.getCompanies();

            // Sort by ticker
            companies.sort((a, b) => {
                if (a.ticker < b.ticker) return -1;
                if (a.ticker > b.ticker) return 1;
                return 0;
            });
            setCompanies(companies);
        }

        fetchData();
    }, []);

    // Called whenever selection changes
    const handleChange = (value: ValueType<Company>) => {
        setSelectedCompany(value as Company);
    };

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

    return (
        <div className={classes.root}>
            <AsyncSelect
                value={selectedCompany}
                loadOptions={loadOptions}
                getOptionValue={option => option.ticker}
                getOptionLabel={option => `${option.ticker} - ${option.name}`}
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null
                }}
                isClearable={true}
                isSearchable={true}
                noOptionsMessage={() => ''}
                placeholder="Enter ticker or name"
                styles={customStyles}
                onChange={handleChange}
            />
        </div>
    );
};
