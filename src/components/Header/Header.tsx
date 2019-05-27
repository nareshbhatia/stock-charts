import React from 'react';
import { Header as BaseHeader, HeaderTitle } from '@nareshbhatia/react-force';
import { CompanySelect } from '..';

export const Header = () => {
    return (
        <BaseHeader>
            <HeaderTitle>Stock Charts</HeaderTitle>
            <CompanySelect />
        </BaseHeader>
    );
};
