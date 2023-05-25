import React, { useState, useEffect } from "react";
import {Ship} from "@/components/ship";
import { ShipModel } from "@/models/Ship";
import { GetShipListAsync } from "@/pages/api/ShipService";
import { ShipDetails } from "./shipDetails";


export const ShipList = ({shiplist}:any) =>
{
    const [ships] = useState<ShipModel[]>(shiplist);
    const [selectedShip, setSelectedShip] = useState<ShipModel>(shiplist[0]);

    /*const fetchShips = async () => 
    {
        const response: any = await GetShipListAsync();

        let data: ShipModel[] = response;

        setSelectedShip(data[0]);

        setShips(data);
    };

    useEffect(() => 
    {
        fetchShips();
    }, []);*/

    function SelectShip(ship: ShipModel)
    {
        setSelectedShip(ship);
    }

    return (
        <div className="flex flex-row grow justify-between pt-[0.5em] px-[0.5em] h-full w-full bg-slate-900">
            <div className="flex flex-col gap-[1em] w-max overflow-y-auto ">
                {ships?.map((ship) => (
                    <Ship key={ship.symbol} shipData={ship} callback={SelectShip}/>
                ))}
            </div>
            {selectedShip && <ShipDetails shipData={selectedShip}/>}
        </div>
    )
}