import React, { useState, useContext, useEffect } from "react";
import {SideNav} from "@/components/sidenav";
import {UniverseMap} from "@/components/universe";
import {Header} from "@/components/header";
import { ShipList } from "@/components/shipList";
import { SystemMap } from "@/components/system";
import { FactionList } from "@/components/factionList";
import { Footer } from "@/components/footer";
import { GetShipListAsync } from "./api/ShipService";
import { ShipModel } from "@/models/Ship";
import { Agent } from "@/models/Agent";
import { GetAgentAsync } from "./api/AgentService";

export default function Dashboard() 
{
    const [agent, setAgent] = useState<Agent>();
    const [ships, setShips] = useState<ShipModel[]>();
    const [visability, setVisablity] = useState<number>(0);
    const [system, setSystem] = useState<string>("TU96");

    function SetComponentVisabilty(visabilityState: number)
    {
        setVisablity(visabilityState);
    }

    function SetSystem(system: string)
    {
        setSystem(system);
        setVisablity(1);
    }

    const fetchAgent= async () => 
    {
        let data: Agent = await GetAgentAsync();
        
        setAgent(data);
    };

    const fetchShips = async () => 
    {
        const response: any = await GetShipListAsync();

        let data: ShipModel[] = response;

        setShips(data);
    };

    useEffect(() => 
    {
        fetchShips();
        fetchAgent();
    }, []);

    return (
        <div className="grid grid-cols-[10%_90%] grid-rows-[6%_90%_4%] h-screen">
            <div className="col-start-1 col-span-2 row-start-1"><Header agent={agent}/></div>
            <div className="col-start-1 row-start-2"><SideNav handleCallback={SetComponentVisabilty}/></div>
            <div className="col-start-2 row-start-2">
                {visability === 0 && <UniverseMap callback={SetSystem}/>}
                {visability === 1 && <SystemMap presetSystemSymbol={system}/>}
                {visability === 2 && <ShipList shiplist={ships}/>}
                {visability === 4 && <FactionList/>}
            </div>
            <div className="col-start-1 col-span-2 row-start-3"><Footer agent={agent}/></div>
        </div>
    )
}
  