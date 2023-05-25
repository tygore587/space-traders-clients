import React, { useEffect, useState } from "react";
import { ShipModel } from "@/models/Ship";
import { ShipActionPanel } from "./shipActionPanel";

export const ShipDetails = ({shipData}:any) =>
{
    let ship: ShipModel = shipData;

    let powerConsumption = 0;
    let usedModuleSlots = 0;

    powerConsumption += ship?.engine.requirements.power;
    powerConsumption += ship?.frame.requirements.power;

    ship?.modules.forEach(module => {
        usedModuleSlots += module.requirements.slots; 
        powerConsumption += module.requirements.power;
    });
    ship?.mounts.forEach(mount => {
        powerConsumption += mount.requirements.power;
    });

    let counter: number = 0;

    return (
        <div className="flex flex-col justify-start gap-[1em] w-[35em]">
            <ShipActionPanel shipData={ship} callback={null}/>

            <div className="
                flex flex-col justify-start 
                bg-slate-800 
                px-[1em] pt-[0.2em] pb-[0.5em] 
                border-[0.15em] rounded-md border-indigo-500/50 
                h-fit w-fit" 
            >
                <p className="text-orange-500 font-bold">{ship?.symbol} ({ship?.registration.role} {ship?.frame.name.replace("Frame ", "")})</p>
                <p className="text-orange-500 font-bold text-xs">{ship?.frame.description}</p>
                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <p><i>-{ship?.nav.status}-</i> {ship?.nav.route.destination.symbol}</p>
                <p>Fuel: {ship?.fuel.current} / {ship?.fuel.capacity}</p>
                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <div className="grid grid-cols-2 gap-x-[0.5em]">
                    <div className="px-[0.3em] py-[0.2em] border border-none rounded-lg hover:outline-[0.1em] hover:outline-solid hover:outline-offset-0 hover:outline hover:outline-sky-500">
                        <p className="text-orange-500 font-bold">{ship?.reactor.name} <i>({ship?.reactor.condition}%)</i></p>
                        <p>Usage: {powerConsumption} / {ship?.reactor.powerOutput}</p>
                    </div>
                    <div className="px-[0.3em] py-[0.2em] border border-none rounded-lg hover:outline-[0.1em] hover:outline-solid hover:outline-offset-0 hover:outline hover:outline-sky-500">
                        <p className="text-orange-500 font-bold">{ship?.engine.name} <i>({ship?.engine.condition}%)</i></p>
                        <p>max. Speed: {ship?.engine.speed}</p>
                        <p>Power Consumption: {ship?.engine.requirements.power}</p>
                    </div>
                    <hr className="col-span-2 border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <div>
                        <p className="text-orange-500 font-bold">Modules: {usedModuleSlots} / {ship?.frame.moduleSlots}</p>
                        <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                            {ship?.modules.map((module) => 
                                <li key={module?.symbol + counter++}>{module?.name}
                                    <p className="text-xs ml-[2em]">{module?.capacity ? "Capacity: "+ module?.capacity : ""}</p>
                                    <p className="text-xs ml-[2em]">{module?.range ? "Range: "+ module?.range : ""}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <p className="text-orange-500 font-bold">Mounts: {ship?.mounts.length} / {ship?.frame.mountingPoints}</p>
                        <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                            {ship?.mounts.map((mount) => 
                                <li key={mount?.symbol + counter++}>{mount?.name}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <p className="text-orange-500 font-bold">Cargo: {ship?.cargo.units} / {ship?.cargo.capacity}</p>
                <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                    {ship?.cargo.inventory.map((cargoItem) => 
                        <li key={cargoItem.symbol}>{cargoItem.name} - {cargoItem.units}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}