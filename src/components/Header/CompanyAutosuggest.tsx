import React, { useState } from 'react';
import { Autosuggest } from '..';
import {
    ChangeEvent,
    SuggestionsFetchRequestedParams
} from 'react-autosuggest';

interface Country {
    name: string;
}

const countries = [
    { name: 'Afghanistan' },
    { name: 'Aland Islands' },
    { name: 'Albania' },
    { name: 'Algeria' },
    { name: 'American Samoa' },
    { name: 'Andorra' },
    { name: 'Angola' },
    { name: 'Anguilla' },
    { name: 'Antarctica' },
    { name: 'Antigua and Barbuda' },
    { name: 'Argentina' },
    { name: 'Armenia' },
    { name: 'Aruba' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Azerbaijan' },
    { name: 'Bahamas' },
    { name: 'Bahrain' },
    { name: 'Bangladesh' },
    { name: 'Barbados' },
    { name: 'Belarus' },
    { name: 'Belgium' },
    { name: 'Belize' },
    { name: 'Benin' },
    { name: 'Bermuda' },
    { name: 'Bhutan' },
    { name: 'Bolivia, Plurinational State of' },
    { name: 'Bonaire, Sint Eustatius and Saba' },
    { name: 'Bosnia and Herzegovina' },
    { name: 'Botswana' },
    { name: 'Bouvet Island' },
    { name: 'Brazil' },
    { name: 'British Indian Ocean Territory' },
    { name: 'Brunei Darussalam' }
];

export const CompanyAutosuggest = () => {
    const [name, setName] = useState('');
    const [suggestions, setSuggestions] = useState<Country[]>([]);

    // Returns the string value from the supplied suggestion
    const getSuggestionValue = (suggestion: Country) => suggestion.name;

    // Autosuggest will call this function whenever whenever the suggestion value changes
    const handleChange = (event: React.FormEvent<any>, params: ChangeEvent) => {
        setName(params.newValue);
    };

    // Teach Autosuggest how to calculate suggestions for any given input value
    const getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;

        return inputLength === 0
            ? []
            : countries.filter(country => {
                  const keep =
                      count < 5 &&
                      country.name.slice(0, inputLength).toLowerCase() ===
                          inputValue;

                  if (keep) {
                      count += 1;
                  }

                  return keep;
              });
    };

    // Autosuggest will call this function whenever it wants to update suggestions
    const handleSuggestionsFetchRequested = ({
        value
    }: SuggestionsFetchRequestedParams) => {
        setSuggestions(getSuggestions(value));
    };

    // Autosuggest will call this function whenever it wants to clear suggestions
    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    return (
        <Autosuggest<Country>
            getSuggestionValue={getSuggestionValue}
            onChange={handleChange}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            suggestions={suggestions}
            value={name}
        />
    );
};
