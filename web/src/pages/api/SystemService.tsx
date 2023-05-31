import { IMarket } from "@/models/Market";
import { IShipyard } from "@/models/Shipyard";
import { ISystem } from "@/models/System";
import { IWaypoint } from "@/models/Waypoint";

export async function GetSystemsAsJSONAsync() 
{
    const url = 'https://api.spacetraders.io/v2/systems.json';
	const options = {
		method: 'GET',
		headers: {
		    Accept: 'application/json',
		}
	};

    try {

        let response: any = await fetch(url, options);

        let data: ISystem[] = await response.json();

        return data;

    } catch (error) {
        return error;
    }    
}

export async function GetSystemAsync(systemSymbol: string)
{
    const url = 'https://api.spacetraders.io/v2/systems/' + systemSymbol;
	const options = {
		method: 'GET',
		headers: {
		    Accept: 'application/json'
		}
	};

    try {

        let response: any = await fetch(url, options);

        let result = await response.json();

        let data: ISystem = result.data;
        return data;

    } catch (error) {
        return error;
    }
}

export async function GetWaypointsAsync(systemSymbol: string, page: number = 1, limit: number = 20)
{
    const param: string = `?page=${page}&limit=${limit}`
    const url = 'https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints' + param;
	const options = {
		method: 'GET',
		headers: {
		    Accept: 'application/json'
		}
	};

    try {

        let response: any = await fetch(url, options);

        let result = await response.json();

        let data: IWaypoint[] = result.data;
        return data;

    } catch (error) {
        return error;
    }
}

export async function GetMarketAsync(systemSymbol: string, waypointSymbol: string) 
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/systems/'+ systemSymbol +'/waypoints/'+ waypointSymbol +'/market';
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

        let data: IMarket = result.data;

        return data;

    } catch (error) {
        return error;
    }
}

export async function GetShipyardAsync(systemSymbol: string, waypointSymbol: string) 
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/systems/'+ systemSymbol +'/waypoints/'+ waypointSymbol +'/shipyard';
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

        let data: IShipyard = result.data;

        return data;

    } catch (error) {
        return error;
    }
}