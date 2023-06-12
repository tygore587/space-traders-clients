import { IContract, IContractAccepted, IContractDelivery, IContractFulfillment } from "@/models/Contract";
import { IShip } from "@/models/Ship";

export async function GetContractsAsync(token: string, page: number = 1, limit: number = 20)
{
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
        console.log(error);
        return error;
    }
}

export async function AcceptContractAsync(token: string, contractId: string)
{
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
        console.log(error);
        return error;
    }
}

export async function DeliverContractAsync(token: string, ship: IShip, tradeSymbol: string, contract: IContract)
{
    if (token === "" || ship === undefined || tradeSymbol === "" || contract === undefined || contract.fulfilled ||
        ship.cargo.inventory.filter((item) => item.symbol === tradeSymbol).length <= 0 || 
        contract.terms.deliver.filter((d) => d.tradeSymbol === tradeSymbol).length <= 0 ||
        contract.terms.deliver.find((d) => d.tradeSymbol === tradeSymbol)?.unitsFulfilled === contract.terms.deliver.find((d) => d.tradeSymbol === tradeSymbol)?.unitsRequired)
    {
        return null;
    }

    let units: number = ship?.cargo?.inventory.find((item) => item.symbol === tradeSymbol)?.units!;

    let unitsFulfilled: number = contract.terms.deliver.find((d) => d.tradeSymbol === tradeSymbol)?.unitsFulfilled!;
    let unitsRequired: number = contract.terms.deliver.find((d) => d.tradeSymbol === tradeSymbol)?.unitsRequired!;

    units = Math.min(units, unitsRequired - unitsFulfilled);

    const url = 'https://api.spacetraders.io/v2/my/contracts/'+ contract.id +'/deliver';
	const options = {
		method: 'POST',
		headers: {
            'Content-Type': 'application/json',
		    Accept: 'application/json',
            Authorization: 'Bearer ' + token
		},
        body: '{"shipSymbol":"' + ship.symbol + '","tradeSymbol":"' + tradeSymbol + '","units":"' + units + '"}'
	};

    try {

        let response: Response = await fetch(url, options);

        if (!response.ok)
        {
            return null;
        }

        let result = await response.json();

        let data: IContractDelivery = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function FulfillContractAsync(token: string, contract: IContract)
{
    if (token === "" || contract === undefined || contract.fulfilled || contract.terms.deliver.find((d) => d.unitsFulfilled < d.unitsRequired))
    {
        return null;
    }

    const url = 'https://api.spacetraders.io/v2/my/contracts/'+ contract.id +'/fulfill';
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

        let data: IContractFulfillment = result.data;
        
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}