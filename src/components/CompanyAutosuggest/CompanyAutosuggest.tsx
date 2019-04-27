import React, { useState, useEffect } from 'react';
import {
    ChangeEvent,
    SuggestionsFetchRequestedParams,
    SuggestionSelectedEventData
} from 'react-autosuggest';
import { Autosuggest } from '..';
import { Company } from '../../models';
import { CompanyService } from '../../services';

export const CompanyAutosuggest = () => {
    // Current value of the text field
    const [value, setValue] = useState('');

    // List of all companies
    const [companies, setCompanies] = useState<Company[]>([]);

    // List of suggestions based on user input
    const [suggestions, setSuggestions] = useState<Company[]>([]);

    // Get the list of all companies
    useEffect(() => {
        async function fetchData() {
            const companies = await CompanyService.getCompanies();
            setCompanies(companies);
        }

        fetchData();
    }, []);

    // Returns the display text for the supplied suggestion
    const getSuggestionText = (suggestion: Company) =>
        `${suggestion.ticker} | ${suggestion.name}`;

    // Returns the value of the supplied suggestion
    const getSuggestionValue = (suggestion: Company) => suggestion.ticker;

    // Called whenever the value of the text field changes
    const handleChange = (event: React.FormEvent<any>, params: ChangeEvent) => {
        setValue(params.newValue);
    };

    // Teach Autosuggest how to calculate suggestions for any given input value
    const getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : companies.filter(company => {
                  const keep =
                      count < 5 &&
                      (company.ticker.toLowerCase().indexOf(inputValue) >= 0 ||
                          company.name.toLowerCase().indexOf(inputValue) >= 0);

                  if (keep) {
                      count += 1;
                  }

                  return keep;
              });
    };

    // Called whenever Autosuggest wants to update suggestions
    const handleSuggestionsFetchRequested = ({
        value
    }: SuggestionsFetchRequestedParams) => {
        setSuggestions(getSuggestions(value));
    };

    // Called whenever Autosuggest wants to clear suggestions
    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    // Called when a suggestion is selected
    const handleSuggestionSelected = (
        event: React.FormEvent<any>,
        data: SuggestionSelectedEventData<Company>
    ) => {
        console.log(data.suggestion.ticker);
    };

    return (
        <Autosuggest<Company>
            getSuggestionText={getSuggestionText}
            getSuggestionValue={getSuggestionValue}
            onChange={handleChange}
            onSuggestionSelected={handleSuggestionSelected}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            suggestions={suggestions}
            value={value}
            extraInputProps={{
                label: 'Ticker',
                placeholder: 'Enter ticker or name'
            }}
        />
    );
};
