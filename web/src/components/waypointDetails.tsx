import React, { useEffect, useState } from "react";
import { IWaypoint } from "@/models/Waypoint";
import { IMarket } from "@/models/Market";
import { MarketDetails } from "./marketDetails";
import { IShipyard } from "@/models/Shipyard";
import { ShipyardDetails } from "./shipyardDetails";
import { Agent } from "@/models/Agent";
import { IShip } from "@/models/Ship";

const hrClass: string = 'border-orange-500 mx-[0.1em] my-[0.3em]';

interface IWaypointDetails {
    agent?: Agent
    shiplist: IShip[]
    waypointData: any
    marketData: any
    shipyardData: any
    globalDataFunction?: any
}


export const WaypointDetails = ({agent, shiplist, waypointData, marketData, shipyardData, globalDataFunction}: IWaypointDetails) =>
{
    const [showMarketDetails,setShowMarketDetails] = useState<boolean>(true);
    const [showShipyardDetails,setShowShipyardDetails] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    let waypoint: IWaypoint = waypointData;
    let market: IMarket = marketData;
    let shipyard: IShipyard = shipyardData;

    let shortMarketSymbol: string = "\u2696";
    let shortShipyardSymbol: string = "\u2693";
    let traitPreview: string = "  - " + (market ? shortMarketSymbol + "  " : "") + (shipyard ? shortShipyardSymbol : "");
    traitPreview = traitPreview.endsWith(" ") ? traitPreview.replace(" ", "") : traitPreview;


    return (
        <div className="grid grid-cols-1 grid-rows-auto gap-[1em] h-fit max-h-full w-full pr-[1em]">
            <div className="
                flex flex-col justify-start 
                bg-slate-800 
                px-[1em] pt-[0.2em] pb-[0.5em] 
                border-[0.15em] rounded-md border-indigo-500/50 
                hover:border-indigo-500 
                h-fit w-full" 
                onClick={() => setShowDetails(!showDetails)}
            >
                <p className="text-orange-500 font-bold text-lg">{waypoint?.symbol}{market || shipyard ? traitPreview : ""}</p>
                <p className="text-orange-500 font-bold text-xs">{waypoint?.type} ({waypoint?.x}, {waypoint?.y})</p>
                <p className="text-orange-500 font-bold text-xs">{waypoint?.faction?.symbol}</p>

                {waypoint?.orbitals.length > 0 && showDetails && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <p className="text-orange-500 font-bold">Orbitals</p>
                    <ul className="list-disc list-inside pl-[0.2em] gap-2 marker:text-orange-500">
                        {waypoint?.orbitals.map((orbital) => 
                            <li key={orbital?.symbol} className="text-xs">{orbital?.symbol}</li>
                        )}
                    </ul>
                </div>}
                {waypoint?.traits.length > 0 && showDetails && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <p className="text-orange-500 font-bold">Traits</p>
                    <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                        {waypoint?.traits.map((trait) => 
                            <li key={trait.symbol} className="text-sm break-words"><b>{trait.name}</b> - {trait.description}</li>
                        )}
                    </ul>
                </div>}
            </div>
            <div className="grid grid-cols-1 grid-rows-auto">
                {market && <div className="flex flex-col justify-start ">
                    <div>
                        <p className="text-orange-500 font-bold select-none hover:bg-slate-800 pl-[0.5em]" onClick={() => setShowMarketDetails(!showMarketDetails)} >Marketplace</p>
                        <hr className={hrClass}/>
                    </div>

                    {showMarketDetails && <MarketDetails marketData={market} globalDataFunction={globalDataFunction}/>}
                </div>}

                {shipyard && <div>
                    <div>
                        <p className="text-orange-500 font-bold select-none hover:bg-slate-800 pl-[0.5em]" onClick={() => setShowShipyardDetails(!showShipyardDetails)} >Shipyard</p>
                        <hr className={hrClass}/>
                    </div>

                    {showShipyardDetails && <div className="flex-1">
                        <ShipyardDetails agent={agent} shiplist={shiplist} shipyardData={shipyard} globalDataFunction={globalDataFunction}/>
                    </div>}
                </div>}
            </div>
        </div>
    )
}