import React, { useState } from "react";
import {Ship} from "@/components/ship";
import { IShip } from "@/models/Ship";
import { ShipDetails } from "./shipDetails";
import { useShip } from "@/data/commonContext";

interface Args {
    systemCallback?: Function
}

export const ShipList = ({systemCallback}: Args) =>
{

    const {ships} = useShip();
    
    //const [shipList] = useState<IShip[]>(ships);
    const [selectedShip, setSelectedShip] = useState<IShip>(ships[0]);

    function SelectShip(ship: IShip)
    {
        setSelectedShip(ship);
    }

    function ShowSystem(systemSymbol: string)
    {
        if (systemCallback === undefined) return;
        
        systemCallback(systemSymbol);
    }

    return (
        <div className="flex flex-row grow justify-between pt-[0.5em] px-[0.5em] h-full w-full bg-slate-900">
            <div className="flex flex-col gap-[1em] w-max overflow-y-auto ">
                {ships?.map((ship) => (
                    <Ship key={ship.symbol} shipData={ship} active={selectedShip?.symbol === ship?.symbol} callback={SelectShip} systemCallback={ShowSystem}/>
                ))}
            </div>
            {selectedShip && <ShipDetails shipData={selectedShip}/>}
        </div>
    )
}