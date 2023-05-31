import React from "react";
import { IShip, ShipNavStatus, ShipNavWaypointType, ShipModuleSymbol } from "@/models/Ship";

interface IShipData
{
    shipData: IShip
    callback: any
}

const buttonClass: string = 'text-zinc-800 bg-white px-[0.4em] py-[0.1em] border-[0.2em] border-solid rounded-lg border-sky-600 enabled:hover:border-sky-500 disabled:opacity-75';

export const ShipActionPanel = ({shipData, callback}:IShipData) =>
{
    let ship: IShip = shipData;
    
    return (
        <div className="
            flex flex-row flex-wrap gap-[0.5em] justify-start align-center
            bg-slate-800 
            px-[1em] py-[0.5em]
            border-[0.15em] rounded-md border-indigo-500/50 
            h-fit" 
        >
            <button className={buttonClass} disabled={ship?.nav.status.toString() === ShipNavStatus[ShipNavStatus.IN_TRANSIT]}>
                {ship?.nav.status.toString() === ShipNavStatus[ShipNavStatus.IN_ORBIT] ? "Dock" : "Orbit"}
            </button>
            <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus[ShipNavStatus.IN_ORBIT]}>Survey</button>
            <button className={buttonClass} disabled={
                ship?.nav.status.toString() != ShipNavStatus[ShipNavStatus.IN_ORBIT] || 
                ship?.nav.route.destination.type.toString() != ShipNavWaypointType[ShipNavWaypointType.ASTEROID_FIELD] ||
                ship?.cargo.units === ship?.cargo.capacity ||
                ship?.modules.findIndex(m => m.symbol.toString() === ShipModuleSymbol[ShipModuleSymbol.MODULE_MINERAL_PROCESSOR_I]) === -1
            }>Extract Resources - optinal Survey body</button>
            <button className={buttonClass}>Refuel Ship</button>
            <button className={buttonClass}>get Cooldown</button>
            <button className={buttonClass}>Scan System</button>
            <button className={buttonClass}>Scan Waypoint</button>
            <button className={buttonClass}>Scan Ships</button>
            <button className={buttonClass}>create Chart</button>
            {/*<button>set flight mode - needs body</button>
            <button>Fly to - needs body</button>
            <button>Jump - needs body</button>
            <button>Warp - needs body</button>
            <button>Refine Ore - needs body</button>
            <button>eject Cargo - needs body</button>
            <button>sell Cargo - needs body</button>
            <button>purchase Cargo - needs body</button>
    <button>transfer Cargo - needs body</button>*/}
        </div>
    )
}