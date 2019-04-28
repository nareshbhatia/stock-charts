import React, { useContext, useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { Attribute } from '../../components';
import { CompanyContext } from '../../contexts';
import { CompanyProfile } from '../../models';
import { CompanyService } from '../../services';
import { formatWithAbbreviation, formatWithSign } from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
    subtitle: {
        marginBottom: theme.spacing(2)
    },
    description: {
        marginBottom: theme.spacing(2)
    },
    attribute: {
        marginBottom: theme.spacing(2),
        fontSize: '0.8rem'
    }
}));

export const CompanyProfileView = () => {
    const classes = useStyles();
    const company = useContext(CompanyContext);

    // List of all companies
    const [profile, setProfile] = useState<CompanyProfile>();

    // Get the company profile
    useEffect(() => {
        async function fetchData() {
            if (!company) {
                return null;
            }

            const profile = await CompanyService.fetchCompanyProfile(
                company.ticker
            );
            setProfile(profile);
        }

        fetchData();
    }, [company]);

    if (!profile) {
        return null;
    }

    const {
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
                {name}
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
