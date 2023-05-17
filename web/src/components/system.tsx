import React, { useState, useEffect } from "react";
import { GetSystemAsync, GetWaypointsAsync } from '../pages/api/SystemService'
import {System} from "../models/System"
import { Waypoint } from "@/models/Waypoint";


// component 
export const SystemMap = () => 
{
    const [waypoint, setWaypoint] = useState<Waypoint[]>();
    const [systemSymbol, setSystemSymbol] = useState<string>();
    const [symbol, setSymbol] = useState<string>();
    const [systemViewbox, setSystemViewbox] = useState<string>();

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
            data?.forEach(wp => coords=Math.max(coords, Math.abs(wp.x), Math.abs(wp.y)));

            coords *= 2.2;

            setSystemViewbox(`-${Math.ceil(coords/2)} -${Math.ceil(coords/2)} ${coords} ${coords}`);

            setWaypoint(data);
        }
    };

    /*useEffect(() => 
    {
        fetchSystems();
    }, []);*/

    const onClick = (event: any) => 
    {
        console.log(event.target.id);
    }
// <form onSubmit={fetchSystems}>
    return (
        <div id="box" className="bg-slate-900 w-fit">
            <div id="input" className="w-fit">
                <input name="symbol" id="symbol" type="text" placeholder='system Symbol' onChange={e => setSymbol(e.target.value)}></input>
                <button className='text-zinc-800 bg-white mt-2 ml-[0.2em]' type="submit" value="Go" onClick={fetchSystems}>go to System</button>
            </div>
        
            <p>{systemSymbol}</p>
            <svg id="svg" viewBox=/*"-100 -100 200 200"*/{systemViewbox} className="bg-slate-900 border-t-[0.1em] border-indigo-900/50 w-fit">
                {waypoint?.map((wp) => (
                    <g key={wp.symbol}>
                        <text 
                            key={wp.symbol+"_"+wp.x+"_"+wp.y+"_name"} 
                            x={wp.x-wp.symbol.length} 
                            y={wp.y-3} 
                            className="text-[0.2em] fill-white select-none"
                        >
                            {wp.type.toLocaleLowerCase()} ({wp.symbol.replace(wp.systemSymbol + "-", "")})
                        </text>

                        <circle id={wp.symbol} key={wp.symbol+"_"+wp.x+"_"+wp.y} r="2" cx={wp.x} cy={wp.y} className="fill-white" onClick={onClick}/>
                    </g>
                ))}
            </svg>
        </div>
    );
};