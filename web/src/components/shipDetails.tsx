import React, { useEffect, useState } from "react";
import { ShipModel } from "@/models/Ship";
import { ShipActionPanel } from "./shipActionPanel";

export const ShipDetails = ({shipData}:any) =>
{
    let ship: ShipModel = shipData;

    let counter: number = 0;

    return (
        <div className="flex flex-col justify-start gap-[1em] w-[35em]">
            <ShipActionPanel shipData={ship} callback={null}/>

            <div className="
                flex flex-col justify-start 
                bg-slate-600 
                px-[1em] pt-[0.2em] pb-[0.5em] 
                border-[0.15em] rounded-md border-indigo-500/50 
                h-fit w-fit" 
            >
                <p className="text-orange-500 font-bold">{ship?.symbol} ({ship?.registration.role} {ship?.frame.name.replace("Frame ", "")})</p>
                <p className="text-orange-500 font-bold text-xs">{ship?.frame.description}</p>
                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <p><i>-{ship?.nav.status}-</i> {ship?.nav.route.destination.symbol}</p>
                <p>{ship?.reactor.name}</p>
                <p>Output: {ship?.reactor.powerOutput}</p>
                <p>{ship?.engine.name}</p>
                <p>max. Speed: {ship?.engine.speed}</p>
                <p>Power Consumption: {ship?.engine.requirements.power}</p>
                <p>Fuel: {ship?.fuel.current} / {ship?.fuel.capacity}</p>
                <p>Modules: X / {ship?.frame.moduleSlots}</p>
                <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                    {ship?.modules.map((module) => 
                        <li key={module?.symbol + counter++}>{module?.name} - {module?.capacity ?? ""}{module?.range ?? ""}</li>
                    )}
                </ul>
                <p>Mounts: X / {ship?.frame.mountingPoints}</p>
                <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                    {ship?.mounts.map((mount) => 
                        <li key={mount?.symbol + counter++}>{mount?.name} - {mount?.strength ?? ""}</li>
                    )}
                </ul>
                <p>Cargo: {ship?.cargo.units} / {ship?.cargo.capacity}</p>
                <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                    {ship?.cargo.inventory.map((cargoItem) => 
                        <li key={cargoItem.symbol}>{cargoItem.name} - {cargoItem.units}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}