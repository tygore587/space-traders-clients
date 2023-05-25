import { useState } from "react";
import React from "react";
import { Faction as FactionModel } from "@/models/Faction";

interface IFactionData
{
    factionData: FactionModel
}

export const Faction = ({factionData}:IFactionData) =>
{
    const [showTraits, setShowTraits] = useState<boolean>(false);
    let faction: FactionModel = factionData;

    return (
        <div className="
            flex flex-col justify-start 
            bg-slate-800 
            pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] 
            border-[0.1em] rounded-md border-indigo-500/50 
            hover:border-sky-600 
            max-h-fit w-fit max-w-lg" 
            onClick={() => setShowTraits(!showTraits)}
        >
            <p className="text-orange-500 font-bold break-words">{faction.name} - {faction.symbol}</p>
            {showTraits && <p className="text-orange-500 font-bold text-xs break-words">{faction.headquarters}</p>}
            <p className="italic break-words">{faction.description}</p>
            {showTraits && <hr className="border-orange-500 mx-[0.4em] my-[1em]"/>}
            {showTraits && <ul className="list-disc list-inside mt-[0.4em] pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                {faction.traits.map((trait) => 
                    <li key={trait.symbol} className="text-sm break-words"><b>{trait.name}</b> - {trait.description}</li>
                )}
            </ul>}
        </div>
    )
}