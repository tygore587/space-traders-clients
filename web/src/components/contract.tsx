import { useToken } from "@/data/commonContext";
import { IContract } from "@/models/Contract";
import { AcceptContractAsync } from "@/pages/api/ContractService";
import { useState } from "react";
import React from "react";

interface IContractData
{
    contractData: IContract
    globalDataFunction?: any
}

const buttonClass: string = 'bg-slate-700 mt-[0.25em] px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.2em] border-solid rounded-lg border-sky-700 enabled:hover:bg-slate-600';

export const Contract = ({contractData, globalDataFunction}:IContractData) =>
{
    const {token} = useToken();
    const [showTraits, setShowTraits] = useState<boolean>(false);
    const [contract, setContract] = useState<IContract>(contractData);

    const GetAcceptedContract = async (contractId: string) => 
    {
        if (!contractId)
        {
            return;
        }

        const response: any = await AcceptContractAsync(token, contractId);

        globalDataFunction(response.agent);

        let contract: IContract = response.contract;

        setContract(contract);
    };

    const AcceptContract = () => 
    {
        GetAcceptedContract(contract.id);
    }

    return (
        <div className="
            flex flex-col justify-start 
            bg-slate-800 
            pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] 
            border-[0.1em] rounded-md border-indigo-500/50 
            hover:border-sky-600 
            h-fit w-fit max-w-lg" 
            onClick={() => setShowTraits(!showTraits)}
        >
            <p className="text-orange-500 font-bold break-words">{contract.type} - {contract.factionSymbol}</p>
            <p className="text-orange-500 font-bold text-xs break-words">{contract.id}</p>
            <p className="text-orange-500 font-bold text-xs break-words">Accept: 
                {contract?.deadlineToAccept != null ? new Date(contract?.deadlineToAccept?.toString()).toLocaleString("de-DE") :"-" } {contract.accepted ? "\u2714" : "\u2716"}
            </p>
            <p className="italic break-words">Deadline: {(contract?.terms?.deadline != null ? new Date(contract?.terms?.deadline?.toString()).toLocaleString("de-DE") : "-")}</p>
            <p className="italic break-words">Accept: {contract.terms.payment.onAccepted.toLocaleString("de-DE")} Cr.</p>
            <p className="italic break-words">Fulfilled: {contract.terms.payment.onFulfilled.toLocaleString("de-DE")} Cr.</p>
            <ul className="list-disc list-inside mt-[0.4em] pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                {contract.terms.deliver.map((deliver) => 
                    <li key={deliver.tradeSymbol} className="text-sm break-words"><b>{deliver.tradeSymbol}</b> - {deliver.unitsFulfilled} / {deliver.unitsRequired} ({deliver.destinationSymbol})</li>
                )}
            </ul>
            {!contract.accepted && <button className={buttonClass} onClick={AcceptContract}>accept Contract</button>}
        </div>
    )
}