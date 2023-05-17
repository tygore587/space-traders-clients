import { Stats } from "../../models/Spacetradersstats"

export async function GetStatsAsync()
{
    const axios = require('axios').default;

    const options = {
        method: 'GET',
        url: 'https://api.spacetraders.io/v2/',
        headers: {Accept: 'application/json'}
    };

    try {

        let data: Stats = await axios.request(options);
        return data;

    } catch (error) {
        return error;
    }
}
