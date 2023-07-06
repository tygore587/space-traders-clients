import { IMarketTradeGood } from "@/models/Market";
import { ICargoTransaction, IExtractionResult, IJump, INavigate, IRefuel, IShip, IShipNav, ISurvey, ShipNavStatus } from "@/models/Ship"
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
        console.log(error);
        return null;
    }
}

export async function NavigateShipAsync(token: string, shipSymbol: string, waypointSymbol: string)
{
    if (token === "" || shipSymbol === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/'+shipSymbol+'/navigate';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"waypointSymbol":"' + waypointSymbol + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: INavigate = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function PatchFlightModeAsync(token: string, shipSymbol: string, flightMode: string)
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
        console.log(error);
        return null;
    }
}

export async function DockShipAsync(token: string, shipSymbol: string)
{
    if (token === "" || shipSymbol === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/'+shipSymbol+'/dock';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IShipNav = result.data.nav;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function OrbitShipAsync(token: string, shipSymbol: string)
{
    if (token === "" || shipSymbol === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/'+shipSymbol+'/orbit';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IShipNav = result.data.nav;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function RefuelShipAsync(token: string, shipSymbol: string)
{
    if (token === "" || shipSymbol === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/'+shipSymbol+'/refuel';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IRefuel = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function ExtractRessourcesAsync(token: string, shipSymbol: string, survey?: ISurvey)
{
    if (token === "" || shipSymbol === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/'+shipSymbol+'/extract';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: ''
	};

    if (survey)
    {
        options.body = '{"survey":"' + survey + '"}'
    }

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IExtractionResult = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function SellCargoAsync(token: string, ship: IShip, tradeGood: IMarketTradeGood, itemCount: number)
{
    if (token === "" || ship.cargo.inventory.find((c) => c.symbol === tradeGood.symbol) === undefined || ship.nav.status != ShipNavStatus.DOCKED)
    {
        return null;
    }

    itemCount = Math.min(itemCount, ship.cargo.inventory.find((c) => c.symbol === tradeGood.symbol)?.units!);
    itemCount = Math.min(itemCount, tradeGood.tradeVolume);

    const url = 'https://api.spacetraders.io/v2/my/ships/' + ship.symbol.toString() + '/sell';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"symbol":"' + tradeGood.symbol + '","units":"' + itemCount + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: ICargoTransaction = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function PurchaseCargoAsync(token: string, ship: IShip, tradeGood: IMarketTradeGood, itemCount: number)
{
    if (token === "" || ship.nav.status != ShipNavStatus.DOCKED)
    {
        return null;
    }

    itemCount = Math.min(itemCount, ship.cargo.capacity - ship.cargo.units);
    itemCount = Math.min(itemCount, tradeGood.tradeVolume);

    const url = 'https://api.spacetraders.io/v2/my/ships/' + ship.symbol.toString() + '/purchase';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"symbol":"' + tradeGood.symbol + '","units":"' + itemCount + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: ICargoTransaction = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function JumpShipAsync(token: string, ship: IShip, systemSymbol: string) 
{
    if (token === "" || ship.nav.systemSymbol === systemSymbol || systemSymbol === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/ships/' + ship.symbol.toString() + '/jump';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"systemSymbol":"' + systemSymbol + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            console.log(response);
            return null;
        }

        let result = await response.json();

        let data: IJump = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
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
        console.log(error);
        return null;
    }
}