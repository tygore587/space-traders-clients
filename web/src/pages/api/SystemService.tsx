import { System } from "@/models/System";
import { Waypoint } from "@/models/Waypoint";

export async function GetSystemsAsJSONAsync() 
{
    const axios = require('axios').default;

    const options = {
        method: 'GET',
        url: 'https://api.spacetraders.io/v2/systems.json',
        headers: {Accept: 'application/json'}
    };

    try {

        let response: any = await axios.request(options);

        let data: System[] = response.data;

        return data;

    } catch (error) {
        return error;
    }    
}

export async function GetSystemAsync(systemSymbol: string)
{
    const axios = require('axios').default;

    const options = {
        method: 'GET',
        url: 'https://api.spacetraders.io/v2/systems/' + systemSymbol,
        headers: {Accept: 'application/json'}
    };

    try {

        let response: any = await axios.request(options);
        let data: System = response.data.data;
        return data;

    } catch (error) {
        return error;
    }
}

export async function GetWaypointsAsync(systemSymbol: string, pageSize: number = 20)
{
    const axios = require('axios').default;

    const options = {
        method: 'GET',
        url: 'https://api.spacetraders.io/v2/systems/' + systemSymbol + '/waypoints?limit=' + pageSize,
        headers: {Accept: 'application/json'}
    };

    try {

        let response: any = await axios.request(options);
        let data: Waypoint[] = response.data.data;
        return data;

    } catch (error) {
        return error;
    }
}