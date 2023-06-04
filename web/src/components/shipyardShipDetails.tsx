import React, { useState } from "react";
import { IShipyardShip } from "@/models/Shipyard";
import { ShipModuleSymbol, ShipMountSymbol } from "@/models/Ship";
import { PurchaseShipAsync } from "@/pages/api/ShipService";
import { useToken } from "@/data/commonContext";

interface IShipData {
    shiyardWaypointSymbol: string
    shipData: any
    globalDataFunction?: any
}

interface ISimpleModule {
    symbol: ShipModuleSymbol
    count: number
}

interface ISimpleMount {
    symbol: ShipMountSymbol
    count: number
}

const buttonClass: string = 'bg-slate-700 mt-[0.25em] px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.2em] border-solid rounded-lg border-sky-700 enabled:hover:bg-slate-600';

export const ShipyardShipDetails = ({shiyardWaypointSymbol, shipData, globalDataFunction}:IShipData) =>
{
    const {token} = useToken();
    const [showDetails, setShowDetails] = useState<boolean>(false);

    let ship: IShipyardShip = shipData;

    let moduleMap: Map<ShipModuleSymbol, number> = new Map<ShipModuleSymbol, number>();
    let mountMap: Map<ShipMountSymbol, number> = new Map<ShipMountSymbol, number>();

    let simpleModuleList: ISimpleModule[] = [];
    let simpleMountList: ISimpleMount[] = [];

    let usedModuleSlots = 0;

    ship.modules.forEach((module) => {
        usedModuleSlots += module.requirements.slots;

        let val: number = moduleMap.get(module.symbol) ?? 0;
        moduleMap = moduleMap.set(module.symbol, val+1);
    });

    moduleMap.forEach((c,s) => {
        let simpleModule: ISimpleModule = {
            symbol: s,
            count: c
        }
        simpleModuleList.push(simpleModule);
    });

    ship.mounts.forEach((mount) => {
        let val: number = mountMap.get(mount.symbol) ?? 0;
        mountMap.set(mount.symbol, val+1)
    });

    mountMap.forEach((c,s) => {
        let simpleMount: ISimpleMount = {
            symbol: s,
            count: c
        }
        simpleMountList.push(simpleMount);
    });

    let counter: number = 0;


    const GetPurchasedShip = async (waypointSymbol: string) => 
    {
        if (!waypointSymbol)
        {
            return;
        }

        const response: any = await PurchaseShipAsync(token, ship.type, waypointSymbol);

        if (!response)
        {
            alert("Error on Shippurchase.");
        }
        else
        {
            globalDataFunction(response.agent, response.ship);
        }
    };

    const PurchaseShip = () => 
    {
        GetPurchasedShip(shiyardWaypointSymbol);
    }

    return (
        <div className="
            flex flex-col justify-start 
            bg-slate-800 
            px-[1em] pt-[0.2em] pb-[0.5em] 
            border-[0.15em] rounded-md border-indigo-500/50 
            hover:border-indigo-500 
            h-fit select-none" 
        >
            <div onClick={() => setShowDetails(!showDetails)}>
                <p className="text-orange-500 font-bold">{ship?.name} ({ship?.frame.name.replace("Frame ", "")})</p>
                <p className="font-bold">{ship?.purchasePrice.toLocaleString('de-DE')} Cr.</p>
                <p className="text-orange-500 font-bold text-xs"><i>{ship?.description}</i></p>

                {showDetails && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>

                    <p>Fuelcapacity: {ship?.frame.fuelCapacity > 0 ? ship?.frame.fuelCapacity : "none"}</p>

                    <hr className="col-span-2 border-orange-500 mx-[0.1em] my-[0.3em]"/>

                    <div className="grid grid-cols-2 gap-x-[0.5em]">
                        <div className="px-[0.3em] py-[0.2em]">
                            <p className="text-orange-500 font-bold">{ship?.reactor.name} <i>(Output: {ship?.reactor.powerOutput})</i></p>
                        </div>
                        <div className="px-[0.3em] py-[0.2em]">
                            <p className="text-orange-500 font-bold">{ship?.engine.name} <i>(Speed: {ship?.engine.speed})</i></p>
                        </div>
                        <hr className="col-span-2 border-orange-500 mx-[0.1em] my-[0.3em]"/>
                        <div>
                            <p className="text-orange-500 font-bold">Modules: { ship?.frame.moduleSlots > 0 ? usedModuleSlots + " / " + ship?.frame.moduleSlots : "none"}</p>
                            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                                {simpleModuleList.map((module) => 
                                    <li key={module?.symbol + counter++}>
                                        {module.count > 1 ? module.count + "x " : "" }{ship?.modules.find((m) => m.symbol === module.symbol)?.name}
                                        <p className="text-xs ml-[2em]">{ship?.modules.find((m) => m.symbol === module.symbol)?.capacity ? "Capacity: "+ ship?.modules.find((m) => m.symbol === module.symbol)?.capacity : ""}</p>
                                        <p className="text-xs ml-[2em]">{ship?.modules.find((m) => m.symbol === module.symbol)?.range ? "Range: "+ ship?.modules.find((m) => m.symbol === module.symbol)?.range : ""}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <p className="text-orange-500 font-bold">Mounts: {ship?.frame.mountingPoints > 0 ? ship?.mounts.length + " / " + ship?.frame.mountingPoints : "none"}</p>
                            <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                                {simpleMountList.map((mount) => 
                                    <li key={mount?.symbol + counter++}>
                                        {mount.count > 1 ? mount.count + "x " : "" }{ship?.mounts.find((m) => m.symbol === mount.symbol)?.name}
                                        <p className="text-xs ml-[2em]">{(ship?.mounts.find((m) => m.symbol === mount.symbol)?.strength ? "Strength: " + ship?.mounts.find((m) => m.symbol === mount.symbol)?.strength : "")}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>}
            </div>

            <button className={buttonClass} onClick={PurchaseShip}>purchase Ship</button>
        </div>
    )
}