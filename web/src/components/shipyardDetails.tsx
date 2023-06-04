import React from "react";
import {  ShipTypeEnum, IShipyard } from "@/models/Shipyard";
import { ShipyardShipDetails } from "./shipyardShipDetails";
import { Agent } from "@/models/Agent";
import { IShip } from "@/models/Ship";
import { PurchaseShipAsync } from "@/pages/api/ShipService";
import { useToken } from "@/data/commonContext";

const buttonClass: string = 'bg-slate-700 mt-[0.25em] px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.2em] border-solid rounded-lg border-sky-700 enabled:hover:bg-slate-600';

interface IShipyardData {
    agent?: Agent
    shiplist: IShip[]
    shipyardData: any
    globalDataFunction?: any
}


export const ShipyardDetails = ({agent, shiplist, shipyardData, globalDataFunction}: IShipyardData) =>
{
    const {token} = useToken();
    let shipyard: IShipyard = shipyardData;

    return (
        <div id="shipyardDetailsId" className="flex flex-col flex-1 justify-start gap-x-[0.5em] overflow-y-auto pb-[1em] pl-[1em]">
            {shipyard && !shipyard.ships && <div>
                <p className="text-orange-500 select-none">Ships</p>
                {shipyard?.shipTypes.map((ship) =>
                    <div key={ship.type + "_type"} className="flex flex-row justify-between">
                        <p>{ship.type}</p>
                    </div>
                )}
            </div>}

            {shipyard?.ships && <div className="flex-1 flex flex-col gap-[1em] overflow-y-auto ">
                {shipyard?.ships?.map((ship) => (
                    <ShipyardShipDetails key={ship.name} shiyardWaypointSymbol={shipyard.symbol} shipData={ship} globalDataFunction={globalDataFunction}/>
                ))}
            </div>}
        </div>
    )
}