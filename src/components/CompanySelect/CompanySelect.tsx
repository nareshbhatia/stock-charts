import React, { CSSProperties, useState, useEffect } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { ValueType } from 'react-select/lib/types';
import { Company } from '../../models';
import { CompanyService } from '../../services';

export const CompanySelect = () => {
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

    // TODO: How to style this component?
    const selectStyles = {
        input: (base: CSSProperties) => ({
            ...base,
            // color: theme.palette.text.primary,
            width: 200,
            '& input': {
                font: 'inherit'
            }
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
        <React.Fragment>
            <AsyncSelect
                value={selectedCompany}
                loadOptions={loadOptions}
                getOptionValue={option => option.ticker}
                getOptionLabel={option => `${option.ticker} - ${option.name}`}
                isClearable={true}
                isSearchable={true}
                styles={selectStyles}
                onChange={handleChange}
            />
        </React.Fragment>
    );
};
