import { IStats } from "../../models/Spacetradersstats"

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

        let data: IStats = result;

        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}
