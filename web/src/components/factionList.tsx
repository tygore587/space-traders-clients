import React, { useState, useEffect } from "react";
import { GetFactionListAsync } from "@/pages/api/FactionService";
import { Faction as FactionModel } from "@/models/Faction";
import { Faction } from "./faction";

export const FactionList = () =>
{
    const [factions, setFactions] = useState<FactionModel[]>();

    const fetchFactions= async () => 
    {
        const response: any = await GetFactionListAsync();

        let data: FactionModel[] = response;

        setFactions(data);
    };

    useEffect(() => 
    {
        fetchFactions();
    }, []);

    return (
        <div className="flex flex-row flex-wrap overflow-y-auto gap-[1em] bg-slate-900 p-[0.5em] h-full">
            {factions?.map((faction) => (
                <Faction key={faction.symbol} factionData={faction}/>
            ))}
        </div>
    )
}