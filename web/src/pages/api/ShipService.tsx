import { ShipModel } from "@/models/Ship"

export async function GetShipListAsync()
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        return null;
    }

    const axios = require('axios').default;

    const options = {
        method: 'GET',
        url: 'https://api.spacetraders.io/v2/my/ships',
        params: {page: '1', limit: '20'},
        headers: {Accept: 'application/json', Authorization: 'Bearer ' + token}
    };

    try {

        let response: any = await axios.request(options);
        let data: ShipModel[] = response.data.data;
        return data;

    } catch (error) {
        return null;
    }
}