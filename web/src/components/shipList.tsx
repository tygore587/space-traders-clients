import React, { useState, useEffect } from "react";
import {Ship} from "@/components/ship";
import { ShipModel } from "@/models/Ship";
import { GetShipListAsync } from "@/pages/api/ShipService";
import { ShipDetails } from "./shipDetails";

export const ShipList = () =>
{
    const [ships, setShips] = useState<ShipModel[]>();
    const [selectedShip, setSelectedShip] = useState<ShipModel>();

    const fetchShips = async () => 
    {
        const response: any = await GetShipListAsync();

        let data: ShipModel[] = response;

        setSelectedShip(data[0]);

        setShips(data);
    };

    useEffect(() => 
    {
        fetchShips();
    }, []);

    function SelectShip(ship: ShipModel)
    {
        setSelectedShip(ship)
    }

    return (
        <div>
            <div className="flex bg-slate-700 p-[0.5em] w-max">
                {ships?.map((ship) => (
                    <Ship key={ship.symbol} shipData={ship} callback={SelectShip}/>
                ))}
            </div>
            {/*selectedShip ?? <ShipDetails shipData={selectedShip}/>*/}
        </div>
    )
}