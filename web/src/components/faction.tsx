import React from "react";
import { Faction as FactionModel } from "@/models/Faction";

interface IFactionData
{
    factionData: FactionModel
}

export const Faction = ({factionData}:IFactionData) =>
{
    let faction: FactionModel = factionData;

    return (
        <div className="
            flex flex-col justify-start 
            bg-slate-600 
            pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] 
            border-[0.1em] rounded-md border-indigo-500/50 
            h-fit w-fit" 
        >
            <p className="text-orange-500 font-bold">{faction.name} - {faction.symbol}</p>
            <p className="text-orange-500 font-bold text-xs">{faction.headquarters}</p>
            <p className="italic">{faction.description}</p>
            <hr className="border-orange-500 mx-[0.4em] my-[1em]"/>
            <ul className="list-disc list-inside mt-[0.4em] pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                {faction.traits.map((trait) => 
                    <li key={trait.symbol} className="text-sm"><b>{trait.name}</b> - {trait.description}</li>
                )}
            </ul>
        </div>
    )
}