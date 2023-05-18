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

    const url = 'https://api.spacetraders.io/v2/my/agent';
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

        let data: Agent = result.data;
        return data;

    } catch (error) {

        let data: Agent = new Agent();

        data.accountId = "";
        data.symbol = String(error);

        return data;
    }
}