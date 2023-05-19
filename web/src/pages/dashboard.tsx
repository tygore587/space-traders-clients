import React, { useState, useContext } from "react";
import * as AgentApi from "./api/AgentService";
import { Agent } from "../models/Agent";
import {SideNav} from "@/components/sidenav";
import {UniverseMap} from "@/components/universe";
import {Header} from "@/components/header";
import { ShipList } from "@/components/shipList";
import { SystemMap } from "@/components/system";
import { FactionList } from "@/components/factionList";

export default function Dashboard() 
{
    const [visability, setVisablity] = useState<number>(0);

    function SetComponentVisabilty(visabilityState: number)
    {
        setVisablity(visabilityState);
    }

    return (
        <main className="h-screen bg-slate-700">
            <Header/>
            <div className="flex flex-row justify-start h-full">
                <SideNav  handleCallback={SetComponentVisabilty}/>
                <div className="flex flex-row justify-start gap-[1em] h-full w-full"/*"grid grid-cols-3 grid-rows-1 h-auto"*/>
                    {visability === 0 && <UniverseMap/>}
                    {visability=== 1 && <SystemMap/>}
                    {visability === 2 && <ShipList/>}
                    {visability === 4 && <FactionList/>}
                </div>
            </div>
        </main>
    )
}
  