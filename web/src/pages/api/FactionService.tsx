import { Faction } from "@/models/Faction"

export async function GetFactionListAsync(page: number = 1, limit: number = 20)
{
    const param: string = `?page=${page}&limit=${limit}`
    const url = 'https://api.spacetraders.io/v2/factions' + param;
	const options = {
		method: 'GET',
		headers: {
		    Accept: 'application/json',
		}
	};

    try {

        let response: any = await fetch(url, options);

        let result = await response.json();

        let data: Faction[] = result.data;
        
        return data;

    } catch (error) {
        return null;
    }
}