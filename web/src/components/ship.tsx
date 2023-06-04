import React, { useState } from "react";
import { IShip } from "@/models/Ship";
import { shortCargoSymbol, shortFuelSymbol } from "@/data/commonData";

interface IShipData
{
    shipData: IShip
    active?: boolean
    callback: any
}

const shipdiv: string = "flex flex-col justify-start bg-slate-800 pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] border-[0.15em] rounded-md h-fit select-none"

export const Ship = ({shipData, active, callback}:IShipData) =>
{
    let ship: IShip = shipData;

    return (
        <div className={shipdiv + (active ? " border-orange-500" : " border-indigo-500/50 hover:border-indigo-500")}
            onClick={() => callback(ship)} 
        >
            <p className="text-orange-500 font-bold">{ship.symbol} ({ship?.registration.role} {ship.frame.name.replace("Frame ", "")})</p>
            <p className="text-orange-500 font-bold text-xs"><i>-{ship.nav.status}-</i> {ship.nav.route.destination.symbol}</p>
            {(ship.fuel.capacity > 0 || ship.cargo.capacity > 0) && <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>}
            {ship.fuel.capacity > 0 && <p>{shortFuelSymbol} {ship.fuel.current} / {ship.fuel.capacity}</p>}
            {ship.cargo.capacity > 0 && <p>{shortCargoSymbol} {ship.cargo.units} / {ship.cargo.capacity}</p>}
            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                {ship.cargo.inventory.map((cargoItem) => 
                    <li key={cargoItem.symbol}>{cargoItem.name} - {cargoItem.units}</li>
                )}
            </ul>
        </div>
    )
}