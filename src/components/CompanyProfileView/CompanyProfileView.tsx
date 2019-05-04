import React, { useContext } from 'react';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Attribute } from '..';
import { CompanyContext } from '../../contexts';
import { formatWithAbbreviation, formatWithSign } from '../../utils';
import { useCompanyProfile } from './useCompanyProfile';

const useStyles = makeStyles((theme: Theme) => ({
    subtitle: {
        marginBottom: theme.spacing(2)
    },
    description: {
        marginBottom: theme.spacing(2)
    }
}));

export const CompanyProfileView = () => {
    const classes = useStyles();
    const company = useContext(CompanyContext);

    // Company profile
    const { profile } = useCompanyProfile(company ? company.ticker : undefined);

    if (!profile) {
        return null;
    }

    const {
        ticker,
        name,
        beta,
        ceo,
        description,
        exchange,
        industry,
        lastDividend,
        marketCap,
        price,
        priceChange,
        priceChangePercent,
        priceRange52Week,
        sector,
        volumeAverage,
        website
    } = profile;

    return (
        <React.Fragment>
            <Typography component="h1" variant="h6">
                {name} ({ticker})
            </Typography>
            <Typography className={classes.subtitle} color="textSecondary">
                {sector} - {industry}
            </Typography>
            <Typography className={classes.description}>
                {description}
            </Typography>
            <Attribute label="CEO" value={ceo} />
            <Attribute label="Exchange" value={exchange} />
            <Attribute
                label="Market cap"
                value={formatWithAbbreviation(marketCap)}
            />
            <Attribute
                label="Price"
                value={`${price}⠀${formatWithSign(
                    priceChange
                )} ${priceChangePercent}`}
            />
            <Attribute label="Beta" value={beta} />
            <Attribute label="52 week range" value={priceRange52Week} />
            <Attribute
                label="Avg. volume"
                value={formatWithAbbreviation(volumeAverage)}
            />
            <Attribute label="Last Dividend" value={lastDividend} />
            <Attribute
                label="Website"
                value={<Link href={website}>{website}</Link>}
            />
        </React.Fragment>
    );
};
