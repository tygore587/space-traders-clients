import { useToken } from "@/data/commonContext";
import { Agent } from "../../models/Agent"

interface IRegisterData
{
    token: string
}

class ReturnValue
{
    status:boolean = false
    value: string = ""
}

export async function RegisterNewAgent(callname: string, faction:string, email: string = ""): Promise<ReturnValue>
{
    let returnValue: ReturnValue = new ReturnValue;
    returnValue.status = false;
    returnValue.value = "ERROR: unknown";

    if (callname === "" || faction === "")
    { 
        returnValue.value = "ERROR: Callname or Faction empty!";
        return returnValue;
    }

    const url = 'https://api.spacetraders.io/v2/register';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json'
		},
        body: `{"faction":"${faction.toUpperCase()}","symbol":"${callname}"}`
	};

    try {

        let response: Response = await fetch(url, options);

        if( response.ok)
        {
            let result = await response.json();

            let data: IRegisterData = result.data;

            returnValue.status = true;
            returnValue.value = data.token;
        }
        else
        {
            returnValue.value = await response.text();
        }

        return returnValue;

    } catch (error) {
        console.log(error);
        returnValue.value = JSON.stringify(error);
        return returnValue;
    }
}

export async function GetAgentAsync(token: string)
{
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
        console.log(error);

        let data: Agent = new Agent();

        data.accountId = "";
        data.symbol = String(error);

        return data;
    }
}