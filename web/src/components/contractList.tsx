import React, { useState, useEffect } from "react";
import { IContract } from "@/models/Contract";
import { GetContractsAsync } from "@/pages/api/ContractService";
import { Contract } from "./contract";
import { Agent } from "@/models/Agent";

interface IAgent {
    globalDataFunction?: any
}

export const ContractList = ({globalDataFunction}:IAgent) =>
{
    const [contracts, setContracts] = useState<IContract[]>();

    const fetchFactions= async () => 
    {
        const response: any = await GetContractsAsync();

        let data: IContract[] = response;

        setContracts(data);
    };

    useEffect(() => 
    {
        fetchFactions();
    }, []);

    return (
        <div className="flex flex-row flex-wrap overflow-y-auto gap-[1em] bg-slate-900 p-[0.5em] h-full">
            {contracts?.map((contract) => (
                <Contract key={contract.id} contractData={contract} globalDataFunction={globalDataFunction}/>
            ))}
        </div>
    )
}