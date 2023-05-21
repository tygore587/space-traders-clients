import React, { useEffect, useState } from "react";
import { Waypoint } from "@/models/Waypoint";


export const WaypointDetails = ({waypointData}: any) =>
{
    let waypoint: Waypoint = waypointData;

    return (
        <div className="flex flex-col justify-start gap-[1em] w-full  pr-[1em]">
            <div className="
                flex flex-col justify-start 
                bg-slate-600 
                px-[1em] pt-[0.2em] pb-[0.5em] 
                border-[0.15em] rounded-md border-indigo-500/50 
                h-fit w-full" 
            >
                <p className="text-orange-500 font-bold">{waypoint?.symbol}</p>
                <p className="text-orange-500 font-bold text-xs">{waypoint?.type} ({waypoint?.x}, {waypoint?.y})</p>
                <p className="text-orange-500 font-bold text-xs">{waypoint?.faction.symbol}</p>
                {waypoint?.orbitals.length > 0 && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <p>Orbitals:</p>
                    <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                        {waypoint?.orbitals.map((orbital) => 
                            <li key={orbital?.symbol}>{orbital?.symbol}</li>
                        )}
                    </ul>
                </div>}
                {waypoint?.traits.length > 0 && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <p>Traits:</p>
                    <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                        {waypoint?.traits.map((trait) => 
                            <li key={trait.symbol} className="text-sm break-words"><b>{trait.name}</b> - {trait.description}</li>
                        )}
                    </ul>
                </div>}
            </div>
        </div>
    )
}