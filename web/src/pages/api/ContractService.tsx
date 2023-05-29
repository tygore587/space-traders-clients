import { IContract, IContractAccepted } from "@/models/Contract";

export async function GetContractsAsync(page: number = 1, limit: number = 20)
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        return null;
    }

    const param: string = `?page=${page}&limit=${limit}`
    const url = 'https://api.spacetraders.io/v2/my/contracts' + param;
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

        let data: IContract[] = result.data;

        return data;

    } catch (error) {
        return error;
    }
}

export async function AcceptContractAsync(contractId: string)
{
    let token: string = localStorage.getItem('token') ?? "";

    if (token === "")
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/contracts/' + contractId + '/accept';
	const options = {
		method: 'POST',
		headers: {
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		}
	};

    try {

        let response: any = await fetch(url, options);

        let result = await response.json();

        console.log(result);

        let data: IContractAccepted = result.data;

        return data;

    } catch (error) {
        return error;
    }
}