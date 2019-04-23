import axios from 'axios';
import { Company } from '../models';

const api = process.env.REACT_APP_API_URL;

/**
 * Map company received from server to domain
 * @param company
 */
const mapToDomain = (company: any): Company => {
    return {
        ticker: company.Ticker,
        name: company.companyName
    };
};

async function getCompanies(): Promise<Array<Company>> {
    const resp = await axios.get(`${api}/stock/list/all?datatype=json`);
    const data = resp.data;

    // Convert to application domain and return
    return data.map((company: any) => mapToDomain(company));
}

export const CompanyService = {
    getCompanies
};
