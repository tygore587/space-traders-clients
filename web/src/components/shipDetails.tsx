import React, { useState } from "react";
import { ShipModel } from "@/models/Ship";

interface IShipDetails
{
    shipData: ShipModel,
}

export const ShipDetails = ({shipData}:IShipDetails) =>
{
    const [ship] = useState<ShipModel>(shipData);

    return (
        <div className="
            flex flex-col justify-start 
            bg-slate-600 
            pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] 
            border-[0.1em] rounded-md border-indigo-500/50 
            hover:border-indigo-500 
            h-fit w-fit" 
        >
            <p>{ship.symbol} ({ship.registration.role} {ship.frame.name.replace("Frame ", "")})</p>
            <p>{ship.frame.description}</p>
            <p><i>-{ship.nav.status}-</i> {ship.nav.route.destination.symbol}</p>
            <p>{ship.reactor.name}</p>
            <p>Output: {ship.reactor.powerOutput}</p>
            <p>{ship.engine.name}</p>
            <p>max. Speed: {ship.engine.speed}</p>
            <p>Power Consumption: {ship.engine.requirements.power}</p>
            <p>Fuel: {ship.fuel.current} / {ship.fuel.capacity}</p>
            <p>Modules:</p>
            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-sky-600">
                {ship.modules.map((module) => 
                    <li key={module.symbol}>{module.name} - {module.capacity ?? ""}{module.range ?? ""}</li>
                )}
            </ul>
            <p>Mounts:</p>
            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-sky-600">
                {ship.mounts.map((mount) => 
                    <li key={mount.symbol}>{mount.name} - {mount.deposits ?? ""}{mount.strength ?? ""}</li>
                )}
            </ul>
            <p>Cargo: {ship.cargo.units} / {ship.cargo.capacity}</p>
            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-sky-600">
                {ship.cargo.inventory.map((cargoItem) => 
                    <li key={cargoItem.symbol}>{cargoItem.name} - {cargoItem.units}</li>
                )}
            </ul>
        </div>
    )
}