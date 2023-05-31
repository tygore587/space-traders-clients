import React, { useState, useEffect } from "react";
import { GetMarketAsync, GetShipyardAsync, GetWaypointsAsync } from '../pages/api/SystemService'
import { IWaypoint, IWaypointTrait, WaypointTraitSymbol } from "@/models/Waypoint";
import { WaypointDetails } from "./waypointDetails";
import { IMarket } from "@/models/Market";
import { IShipyard } from "@/models/Shipyard";
import { IShip } from "@/models/Ship";
import { SystemShipList } from "./systemShiplist";
import { Agent } from "@/models/Agent";

interface IViewBox {
    x: number
    y: number
    h: number
    w: number
}

interface ISystem {
    agent?: Agent
    shiplist?: any
    presetSystemSymbol?: string
    globalDataFunction?: any
}


// component 
export const SystemMap = ({agent, presetSystemSymbol, shiplist, globalDataFunction}: ISystem) => 
{
    let viewbox: IViewBox = {
        x: -75,
        y: -75, 
        w: 150,
        h: 150
    }

    const [symbol, setSymbol] = useState<string>(presetSystemSymbol ?? "");
    const [shipList, setShipList] = useState<IShip[]>(shiplist);

    const [waypoint, setWaypoint] = useState<IWaypoint[]>();
    const [systemSymbol, setSystemSymbol] = useState<string>();
    
    const [systemViewbox, setSystemViewbox] = useState<IViewBox>(viewbox);
    const [waypointMap, setWaypointMap] = useState<Map<string, IWaypoint>>();
    const [selectedWaypoint, setSelectedWaypoint] = useState<IWaypoint>();
    const [marketData, setMarketData] = useState<IMarket>();
    const [shipyardData, setShipyardData] = useState<IShipyard>();

    let orbitList: string[] = [];
    let waypointDict: Map<string, IWaypoint> = new Map<string, IWaypoint>();

    let shortMarketSymbol: string = "\u2696";
    let shortShipyardSymbol: string = "\u2693";
    let shortShipSymbol: string = "\uD83D\uDE80";

    const fetchWaypoints= async () => 
    {
        let systemSymbol: string = symbol?.trim().toLocaleUpperCase() ?? "";

        systemSymbol = systemSymbol.startsWith("X1-") ? systemSymbol : "X1-" + systemSymbol;

        setSystemSymbol(systemSymbol);
        const response: any = await GetWaypointsAsync(systemSymbol);

        if(response == null) return;

        let data: IWaypoint[] = response;

        let coords: number = 0;

        let x: number = 0;
        let y: number = 0;
        let w: number = 0;
        let h: number = 0;

        if (data != null && data.length > 0)
        {
            data?.forEach(wp => {
                waypointDict.set(wp.symbol, wp);
                x = Math.min(x, wp.x);
                y = Math.min(y, wp.y);
                w = Math.max(w, wp.x);
                h = Math.max(h, wp.y);
                coords=Math.max(coords, Math.ceil(Math.sqrt(wp.x*wp.x + wp.y*wp.y)));
                if (wp.orbitals.length > 0){
                    wp.orbitals.forEach( orbital => orbitList.push(orbital.symbol))
                }
            });

            orbitList.forEach(o => data.splice(data.findIndex(x => x.symbol == o), 1))

            coords = Math.ceil(coords * 2.1);

            let systemViewbox: IViewBox = {
                x: x-5,
                y: y-5, 
                w: Math.ceil((w + Math.abs(x)) * 1.2),
                h: Math.ceil((h + Math.abs(y)) * 1.2)
            }

            setSystemViewbox(systemViewbox);

            setWaypoint(data);

            setWaypointMap(waypointDict);
            setSelectedWaypoint(undefined);
        }
    };

    const fetchMarket = async (waypoint?: IWaypoint) => 
    {
        if (!waypoint)
        {
            setMarketData(waypoint);
            return;
        }

        let waypointTraits: IWaypointTrait[] = waypoint?.traits ?? [];
        let systemSymbol: string = waypoint?.systemSymbol ?? "";
        let symbol: string = waypoint?.symbol ?? "";
        let hasMarket: boolean = waypointTraits.findIndex(trait => trait.symbol.toString() === WaypointTraitSymbol[WaypointTraitSymbol.MARKETPLACE]) >= 0;

        if (waypointTraits.length <= 0 || systemSymbol === "" || symbol === "" || !hasMarket)
        {
            setMarketData(undefined);
            return;
        } 

        const response: any = await GetMarketAsync(systemSymbol, symbol);

        setMarketData(response);
    };

    const fetchShipyard= async (waypoint?: IWaypoint) => 
    {
        if (!waypoint)
        {
            setShipyardData(undefined);
            return;
        }

        let waypointTraits: IWaypointTrait[] = waypoint?.traits ?? [];
        let systemSymbol: string = waypoint?.systemSymbol ?? "";
        let symbol: string = waypoint?.symbol ?? "";
        let hasShipyard: boolean = waypointTraits.findIndex(trait => trait.symbol.toString() === WaypointTraitSymbol[WaypointTraitSymbol.SHIPYARD]) >= 0;

        if (waypointTraits.length <= 0 || systemSymbol === "" || symbol === "" || !hasShipyard)
        {
            setShipyardData(undefined);
            return;
        } 

        const response: any = await GetShipyardAsync(systemSymbol, symbol);

        setShipyardData(response);
    };

    useEffect(() => 
    {
        if (presetSystemSymbol != null && presetSystemSymbol != "")
        {
            fetchWaypoints();
        }
    }, []);

    const onClick = (event: any) => 
    {
        setMarketData(undefined);
        fetchMarket(waypointMap?.get(event.target.id));

        setShipyardData(undefined);
        fetchShipyard(waypointMap?.get(event.target.id));

        setSelectedWaypoint(waypointMap?.get(event.target.id));
    }

    function CalculateOrbitalCoord(type: string, baseCoord: number, orbitalCount: number, orbitalPosition: number, offset: number): number
    {
        let angle: number = (2 * Math.PI)/(orbitalCount)* orbitalPosition;

        return (type === "x" ? Math.cos(angle) * offset : Math.sin(angle) * offset) + baseCoord;
    }

    return (
        <div id="systemBox" className="grid grid-cols-[30%_50%_20%] grid-rows-[6%_35%_59%] bg-slate-900 px-[0.5em] mb-[0.25em] gab-x-[0.5em] h-full w-full">
            <div id="input" className="w-fit col-start-1 col-span-2 row-start-1">
                <input name="symbol" id="symbol" type="text" placeholder='system Symbol' onChange={e => setSymbol(e.target.value)}></input>
                <button className='text-zinc-800 bg-white mt-2 ml-[0.2em] px-[0.4em] py-[0.1em] border-[0.2em] border-solid rounded-lg border-sky-600 hover:border-sky-500' 
                    type="submit" value="Go" onClick={fetchWaypoints}>go to System</button>
            </div>

            <svg id="systemSvg" className="col-start-1 row-start-2 bg-slate-900 h-full w-full" viewBox={`${systemViewbox.x}, ${systemViewbox.y}, ${systemViewbox.w}, ${systemViewbox.h}`}>

                <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" className="stroke-[0.5px] stroke-indigo-500/50"/>
                    </pattern>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <rect width="80" height="80" fill="url(#smallGrid)"/>
                        <path d="M 80 0 L 0 0 0 80" fill="none" className="stroke-[1px] stroke-orange-900/50"/>
                    </pattern>
                </defs>
                    
                <rect width="100%" height="100%" x={systemViewbox.x} y={systemViewbox.y} fill="url(#grid)" />

                <text key={systemSymbol} x={systemViewbox.x + 3} y={systemViewbox.y + 6} className="text-[0.3em] fill-orange-500 font-bold select-none">{systemSymbol}</text>

                <circle id={systemSymbol+"Sun2"} key={systemSymbol + "2"} r="2.5" cx="0" cy="0" className="fill-orange-600/25"/>
                <circle id={systemSymbol+"Sun1"} key={systemSymbol + "1"} r="1.7" cx="0" cy="0" className="fill-orange-600/50"/>
                <circle id={systemSymbol+"Sun0"} key={systemSymbol + "0"} r="1" cx="0" cy="0" className="fill-orange-600"/>
                {waypoint?.map((wp) => 
                    
                    <g key={wp.symbol}>
                        
                        <circle id={wp.symbol + "Orbit"} key={wp.symbol+"Orbit"+"_"+wp.x+"_"+wp.y} r={Math.sqrt(wp.x*wp.x + wp.y*wp.y)} cx="0" cy="0" strokeDasharray={"1,1"}
                        className="fill-none stroke-indigo-900/50 stroke-[0.2px]"/>

                        <circle id={wp.symbol} key={wp.symbol+"_"+wp.x+"_"+wp.y} r="1" cx={wp.x} cy={wp.y} 
                            className="fill-white hover:stroke-blue-500 hover:stroke-[0.45px]" 
                            onClick={onClick}
                        />

                        {wp.orbitals.map((orbital) =>
                            <circle id={orbital.symbol} key={orbital.symbol+"_"+wp.x+"_"+wp.y} 
                                r="0.7" 
                                cx={CalculateOrbitalCoord("x", wp.x, wp.orbitals.length, wp.orbitals.indexOf(orbital), 3)} 
                                cy={CalculateOrbitalCoord("y", wp.y, wp.orbitals.length, wp.orbitals.indexOf(orbital), 3)} 
                                className="fill-slate-900 stroke-white stroke-[0.4px] hover:stroke-blue-500" 
                                onClick={onClick}
                            />
                        )}

                        <text 
                            key={wp.symbol+"_"+wp.x+"_"+wp.y+"_name"} 
                            x={wp.x-1} 
                            y={wp.y-2} 
                            className="text-[0.12em] fill-sky-500 select-none"
                        >
                            <tspan x={wp.x-1} dy="-1em">{wp.type.toLocaleLowerCase()}</tspan>
                            <tspan x={wp.x-1} dy="1em">{wp.symbol.replace(wp.systemSymbol + "-", "")}</tspan>
                        </text>
                    </g>
                )}
            </svg>

            <div id="waypointList" className="flex flex-col col-start-1 row-start-3 h-fit w-full">
                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                {waypoint?.map((wp) => 
                    <div key={wp.symbol} className="select-none w-full">
                        <div id={wp.symbol} className={"flex flex-row justify-between w-full px-[0.5em] border border-none rounded-lg hover:bg-slate-800 " + (selectedWaypoint?.symbol === wp.symbol ? "bg-slate-800" : "") }
                            key={wp.symbol + "_list"} onClick={onClick}
                        >
                            <div id={wp.symbol} className="text-orange-500 font-bold">{wp.symbol}</div>
                            <div id={wp.symbol}>{wp.type}</div>
                            <div id={wp.symbol}>{wp.x}, {wp.y}</div>
                            <div id={wp.symbol}>
                                {shipList?.find((s) => s.nav.route.departure.symbol == wp.symbol) ? shortShipSymbol : ""}
                                {wp.traits.find((trait) => trait.symbol.toString() === "MARKETPLACE") ? shortMarketSymbol : ""} 
                                {wp.traits.find((trait) => trait.symbol.toString() === "SHIPYARD") ? shortShipyardSymbol : ""}
                            </div>
                        </div>
                        {wp.orbitals?.map((orbital) =>
                            <div id={orbital.symbol} className={"flex flex-row justify-between px-[0.5em] pl-[3em] border border-none rounded-lg hover:bg-slate-800 " + (selectedWaypoint?.symbol === orbital.symbol ? "bg-slate-800" : "")}
                            key={orbital.symbol + "_list_orbital"} onClick={onClick}>
                                <div id={orbital.symbol} className="text-orange-500 text-xs">{orbital.symbol}</div>
                                <div id={orbital.symbol} className="text-xs">{waypointMap?.get(orbital.symbol)?.type}</div>
                                <div id={orbital.symbol} className="text-xs">
                                    {shipList?.find((s) => s.nav.route.departure.symbol == orbital.symbol) ? shortShipSymbol : ""}
                                    {waypointMap?.get(orbital.symbol)?.traits.find((trait) => trait.symbol.toString() === "MARKETPLACE") ? shortMarketSymbol : ""} 
                                    {waypointMap?.get(orbital.symbol)?.traits.find((trait) => trait.symbol.toString() === "SHIPYARD") ? shortShipyardSymbol : ""}
                                </div>
                            </div>
                        )}
                        <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    </div>
                )}
            </div>

            <div className="col-start-2 row-start-1 row-span-3 w-full">
                {selectedWaypoint && <WaypointDetails 
                    agent={agent} 
                    shiplist={shipList} 
                    waypointData={selectedWaypoint} 
                    marketData={marketData} 
                    shipyardData={shipyardData} 
                    globalDataFunction={globalDataFunction}
                />}
            </div>

            <div className="col-start-3 row-start-1 row-span-3">
                <SystemShipList shiplist={shipList.filter((s) => s.nav.systemSymbol === systemSymbol)}/>
            </div>
        </div>
    );
};