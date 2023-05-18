import { Stats } from "../../models/Spacetradersstats"

export async function GetStatsAsync()
{
    const url = 'https://api.spacetraders.io/v2/';
	const options = {
		method: 'GET',
		headers: {
		    Accept: 'application/json'
		}
	};

    try {

        let response: any = await fetch(url, options);

        let result = await response.json();

        let data: Stats = result;

        return data;

    } catch (error) {
        return error;
    }
}
