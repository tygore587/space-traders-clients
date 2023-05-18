import { ShipModel } from "@/models/Ship"

export async function GetShipListAsync(page: number = 1, limit: number = 20)
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        return null;
    }

    const param: string = `?page=${page}&limit=${limit}`
    const url = 'https://api.spacetraders.io/v2/my/ships' + param;
	const options = {
		method: 'GET',
		headers: {
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		}
	};

    try {

        let response: any = await fetch(url, options);

        let result = await response.json();

        let data: ShipModel[] = result.data;
        
        return data;

    } catch (error) {
        return null;
    }
}