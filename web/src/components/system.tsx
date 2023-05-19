import React, { useState, useEffect } from "react";
import { GetSystemAsync, GetWaypointsAsync } from '../pages/api/SystemService'
import {System} from "../models/System"
import { Waypoint } from "@/models/Waypoint";
import { List } from "postcss/lib/list";


// component 
export const SystemMap = () => 
{
    const [waypoint, setWaypoint] = useState<Waypoint[]>();
    const [systemSymbol, setSystemSymbol] = useState<string>();
    const [symbol, setSymbol] = useState<string>();
    const [systemViewbox, setSystemViewbox] = useState<string>();

    let orbitList: string[] = [];

    const fetchSystems = async () => 
    {
        let systemSymbol: string = symbol?.trim().toLocaleUpperCase() ?? "";

        systemSymbol = systemSymbol.startsWith("X1-") ? systemSymbol : "X1-" + systemSymbol;

        setSystemSymbol(systemSymbol);
        const response: any = await GetWaypointsAsync(systemSymbol);

        if(response == null) return;

        let data: Waypoint[] = response;

        let coords: number = 0;

        if (data != null && data.length > 0)
        {
            data?.forEach(wp => {
                coords=Math.max(coords, Math.abs(wp.x), Math.abs(wp.y));
                if (wp.orbitals.length > 0){
                    wp.orbitals.forEach( orbital => orbitList.push(orbital.symbol))
                }
            });

            orbitList.forEach(o => data.splice(data.findIndex(x => x.symbol == o), 1))

            coords = Math.ceil(coords * 2.2);

            setSystemViewbox(`-${Math.ceil(coords/2)} -${Math.ceil(coords/2)} ${coords} ${coords}`);

            setWaypoint(data);
        }
    };

    const onClick = (event: any) => 
    {
        console.log(event.target.cx.animVal.value);
        console.log(event.target.cy);
        console.log(event.target.r);
        console.log(event.target);
        console.log(event.target.className);
    }
// <form onSubmit={fetchSystems}>
    return (
        <div id="systemBox" className="bg-slate-900 h-full w-full">
            <div id="input" className="w-fit">
                <input name="symbol" id="symbol" type="text" placeholder='system Symbol' onChange={e => setSymbol(e.target.value)}></input>
                <button className='text-zinc-800 bg-white mt-2 ml-[0.2em] px-[0.4em] py-[0.1em] border-[0.2em] border-solid rounded-lg border-sky-600 hover:border-sky-500' 
                    type="submit" value="Go" onClick={fetchSystems}>go to System</button>
            </div>
        
            <p>{systemSymbol}</p>
            <svg id="systemSvg" viewBox={systemViewbox} className="bg-slate-900 border-t-[0.1em] border-indigo-900/50 h-full w-full">

                <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" className="stroke-[0.5px] stroke-indigo-500/50"/>
                    </pattern>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <rect width="80" height="80" fill="url(#smallGrid)"/>
                        <path d="M 80 0 L 0 0 0 80" fill="none" className="stroke-[1px] stroke-orange-900/50"/>
                    </pattern>
                </defs>
                    
                <rect width="100%" height="100%" x={systemViewbox?.split(" ")[0]} y={systemViewbox?.split(" ")[0]} fill="url(#grid)" />

                <circle id={systemSymbol+"Sun2"} key={systemSymbol + "2"} r="2.5" cx="0" cy="0" className="fill-orange-600/25"/>
                <circle id={systemSymbol+"Sun1"} key={systemSymbol + "1"} r="1.7" cx="0" cy="0" className="fill-orange-600/50"/>
                <circle id={systemSymbol+"Sun0"} key={systemSymbol + "0"} r="1" cx="0" cy="0" className="fill-orange-600"/>
                {waypoint?.map((wp) => 
                    
                    <g key={wp.symbol}>
                        
                        <circle id={wp.symbol + "Orbit"} key={wp.symbol+"Orbit"+"_"+wp.x+"_"+wp.y} r={Math.sqrt(wp.x*wp.x + wp.y*wp.y)} cx="0" cy="0"
                        className="fill-none stroke-indigo-900/50 stroke-[0.2px]"/>

                        <text 
                            key={wp.symbol+"_"+wp.x+"_"+wp.y+"_name"} 
                            x={wp.x-1} 
                            y={wp.y-2} 
                            className="text-[0.15em] fill-white select-none"
                        >
                            {wp.type.toLocaleLowerCase()} - {wp.symbol.replace(wp.systemSymbol + "-", "")}
                        </text>

                        <circle id={wp.symbol} key={wp.symbol+"_"+wp.x+"_"+wp.y} r="1" cx={wp.x} cy={wp.y} 
                        className="fill-white hover:stroke-blue-500 hover:stroke-[0.45px]" 
                        onClick={onClick}/>
                    </g>
                )}
            </svg>
        </div>
    );
};