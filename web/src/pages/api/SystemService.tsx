import { Faction } from "@/components/faction";
import { System } from "@/models/System";
import { Waypoint } from "@/models/Waypoint";

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

        let data: System[] = await response.json();

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

        let data: System = result.data;
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

        let data: Waypoint[] = result.data;
        return data;

    } catch (error) {
        return error;
    }
}