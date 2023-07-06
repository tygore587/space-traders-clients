import React, { useState, useEffect } from "react";
import {Ship} from "@/components/ship";
import { IShip } from "@/models/Ship";


export const SystemShipList = ({shiplist, currentSystemWaypoints, globalDataFunction}:any) =>
{
    const [activeShip, setActiveShip] = useState<string>("");

    let systemShips: IShip[] = shiplist;

    function SelectShip(ship: IShip)
    {
        setActiveShip(ship.symbol != activeShip ? ship.symbol : "");
        //setSelectedShip(ship);
    }

    return (
        <div id="systemShipList" className="flex flex-row justify-between h-full bg-slate-900">
            <div className="flex flex-col gap-[1em] w-max overflow-y-auto ">
                {systemShips?.map((ship) => (
                    <Ship key={ship.symbol} shipData={ship} active={activeShip === ship.symbol} showActions={true} currentSystemWaypoints={currentSystemWaypoints} callback={SelectShip}/>
                ))}
            </div>
        </div>
    )
}