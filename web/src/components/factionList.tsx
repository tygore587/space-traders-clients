import React from "react";
import { Faction } from "./faction";
import { useFaction } from "@/data/commonContext";

export const FactionList = () =>
{
    const {factions} = useFaction();


    return (
        <div className="flex flex-row flex-wrap overflow-y-auto gap-[1em] bg-slate-900 p-[0.5em] h-full">
            {factions?.map((faction) => (
                <Faction key={faction.symbol} factionData={faction}/>
            ))}
        </div>
    )
}