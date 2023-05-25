import React from "react";
import { ShipModel } from "@/models/Ship";

interface IShipData
{
    shipData: ShipModel
    callback: any
}

export const Ship = ({shipData, callback}:IShipData) =>
{
    let ship: ShipModel = shipData;

    return (
        <div className="
            flex flex-col justify-start 
            bg-slate-800 
            pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] 
            border-[0.15em] rounded-md border-indigo-500/50 
            hover:border-indigo-500 
            h-fit w-fit" 
            onClick={() => callback(ship)} 
        >
            <p className="text-orange-500 font-bold">{ship.symbol} ({ship?.registration.role} {ship.frame.name.replace("Frame ", "")})</p>
            <p className="text-orange-500 font-bold text-xs"><i>-{ship.nav.status}-</i> {ship.nav.route.destination.symbol}</p>
            <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
            <p>Fuel: {ship.fuel.current} / {ship.fuel.capacity}</p>
            <p>Cargo: {ship.cargo.units} / {ship.cargo.capacity}</p>
            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                {ship.cargo.inventory.map((cargoItem) => 
                    <li key={cargoItem.symbol}>{cargoItem.name} - {cargoItem.units}</li>
                )}
            </ul>
        </div>
    )
}