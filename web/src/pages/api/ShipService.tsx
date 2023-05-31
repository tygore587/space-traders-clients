import { IShip } from "@/models/Ship"
import { IShipPurchase, ShipTypeEnum } from "@/models/Shipyard";

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

        let data: IShip[] = result.data;
        
        return data;

    } catch (error) {
        return null;
    }
}

export async function PurchaseShipAsync(shipType: ShipTypeEnum, waypointSymbol: string)
{
    let token: string = localStorage.getItem('token') ?? "";

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