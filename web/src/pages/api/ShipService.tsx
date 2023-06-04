import { IShip, IShipNav } from "@/models/Ship"
import { IShipPurchase, ShipTypeEnum } from "@/models/Shipyard";

export async function GetShipListAsync(token: string, page: number = 1, limit: number = 20)
{
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

        let data: IShip[] = result.data;
        
        return data;

    } catch (error) {
        return null;
    }
}

export async function PatchFlightMode(token: string, shipSymbol: string, flightMode: string)
{
    if (token === "" || shipSymbol === "" || flightMode === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/'+shipSymbol+'/nav';
	const options = {
		method: 'PATCH',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"flightMode":"' + flightMode + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IShipNav = result.data;
        
        return data;

    } catch (error) {
        return null;
    }
}

export async function PurchaseShipAsync(token: string, shipType: ShipTypeEnum, waypointSymbol: string)
{
    if (token === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"shipType":"' + shipType.toString() + '","waypointSymbol":"' + waypointSymbol + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IShipPurchase = result.data;
        
        return data;

    } catch (error) {
        return null;
    }
}