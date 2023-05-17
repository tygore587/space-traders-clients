import React, { useState, useEffect } from "react";
import {Ship} from "@/components/ship";
import { ShipModel } from "@/models/Ship";
import { GetShipListAsync } from "@/pages/api/ShipService";

export const ShipList = () =>
{
    const [ships, setShips] = useState<ShipModel[]>();

    const fetchShips = async () => 
    {
        const response: any = await GetShipListAsync();

        let data: ShipModel[] = response;

        setShips(data);
    };

    useEffect(() => 
    {
        fetchShips();
    }, []);

    return (
        <div className="flex bg-slate-700 p-[0.5em] w-max">
            {ships?.map((ship) => (
                <Ship key={ship.symbol} ship={ship}/>
            ))}
        </div>
    )
}