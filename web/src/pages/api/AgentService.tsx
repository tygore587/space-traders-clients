import { Agent } from "../../models/Agent"

export async function GetAgentAsync()
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        let data: Agent = new Agent();

        data.accountId = "";
        data.symbol = "Token not found!";

        return data;
    }

    const axios = require('axios').default;

    const options = {
        method: 'GET',
        url: 'https://api.spacetraders.io/v2/my/agent',
        headers: {Accept: 'application/json', Authorization: 'Bearer ' + token}
    };

    try {

        let response: any = await axios.request(options);
        let data: Agent = response.data.data;
        return data;

    } catch (error) {

        let data: Agent = new Agent();

        data.accountId = "";
        data.symbol = String(error);

        return data;
    }
}