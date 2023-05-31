import React, { useEffect, useState } from "react";
import { IShip, ShipModuleSymbol, ShipMountSymbol } from "@/models/Ship";
import { ShipActionPanel } from "./shipActionPanel";

interface ISimpleModule {
    symbol: ShipModuleSymbol
    count: number
}

interface ISimpleMount {
    symbol: ShipMountSymbol
    count: number
}

export const ShipDetails = ({shipData}:any) =>
{
    let ship: IShip = shipData;

    let moduleMap: Map<ShipModuleSymbol, number> = new Map<ShipModuleSymbol, number>();
    let mountMap: Map<ShipMountSymbol, number> = new Map<ShipMountSymbol, number>();

    let simpleModuleList: ISimpleModule[] = [];
    let simpleMountList: ISimpleMount[] = [];
    
    let powerConsumption = 0;
    let usedModuleSlots = 0;

    powerConsumption += ship?.engine.requirements.power;
    powerConsumption += ship?.frame.requirements.power;

    ship?.modules.forEach(module => {
        usedModuleSlots += module.requirements.slots; 
        powerConsumption += module.requirements.power;

        let val: number = moduleMap.get(module.symbol) ?? 0;
        moduleMap = moduleMap.set(module.symbol, val+1);
    });

    ship?.mounts.forEach(mount => {
        powerConsumption += mount.requirements.power;

        let val: number = mountMap.get(mount.symbol) ?? 0;
        mountMap.set(mount.symbol, val+1)
    });

    moduleMap.forEach((c,s) => {
        let simpleModule: ISimpleModule = {
            symbol: s,
            count: c
        }
        simpleModuleList.push(simpleModule);
    });
    
    mountMap.forEach((c,s) => {
        let simpleMount: ISimpleMount = {
            symbol: s,
            count: c
        }
        simpleMountList.push(simpleMount);
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
                            {simpleModuleList.map((module) => 
                                <li key={module?.symbol + counter++}>
                                    {module.count > 1 ? module.count + "x " : "" }{ship?.modules.find((m) => m.symbol === module.symbol)?.name}
                                    <p className="text-xs ml-[2em]">{ship?.modules.find((m) => m.symbol === module.symbol)?.capacity ? "Capacity: "+ ship?.modules.find((m) => m.symbol === module.symbol)?.capacity : ""}</p>
                                    <p className="text-xs ml-[2em]">{ship?.modules.find((m) => m.symbol === module.symbol)?.range ? "Range: "+ ship?.modules.find((m) => m.symbol === module.symbol)?.range : ""}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <p className="text-orange-500 font-bold">Mounts: {ship?.mounts.length} / {ship?.frame.mountingPoints}</p>
                        <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                            {simpleMountList.map((mount) => 
                                <li key={mount?.symbol + counter++}>
                                    {mount.count > 1 ? mount.count + "x " : "" }{ship?.mounts.find((m) => m.symbol === mount.symbol)?.name}
                                    <p className="text-xs ml-[2em]">{(ship?.mounts.find((m) => m.symbol === mount.symbol)?.strength ? "Strength: " + ship?.mounts.find((m) => m.symbol === mount.symbol)?.strength : "")}</p>
                                </li>
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