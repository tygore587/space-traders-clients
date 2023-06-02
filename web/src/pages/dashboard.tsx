import React, { useState, useContext, useEffect } from "react";
import {SideNav} from "@/components/sidenav";
import {UniverseMap} from "@/components/universe";
import {Header} from "@/components/header";
import { ShipList } from "@/components/shipList";
import { SystemMap } from "@/components/system";
import { FactionList } from "@/components/factionList";
import { Footer } from "@/components/footer";
import { GetShipListAsync } from "./api/ShipService";
import { IShip } from "@/models/Ship";
import { Agent } from "@/models/Agent";
import { GetAgentAsync } from "./api/AgentService";
import { ContractList } from "@/components/contractList";
import { DataProvider, useAgent, useShip } from "@/data/commonContext";

export default function Dashboard() 
{
    //const [agent, setAgent] = useState<Agent>();
    //const [ships, setShips] = useState<IShip[]>();

    const {agentState, agentDispatch} = useAgent();
    const {shipState, shipDispatch} = useShip();

    const [visability, setVisablity] = useState<number>(0);
    const [system, setSystem] = useState<string>(agentState?.headquarters.split("-")[1] ?? "");

    function SetComponentVisabilty(visabilityState: number)
    {
        setVisablity(visabilityState);
    }

    function SetGlobalData(agent?: Agent, ship?: IShip){

        /*if (agent)
        {
            //setAgent(agent);
        }

        if (ship)
        {
            let shiplist: IShip[] = ships ?? [];

            if (shiplist.findIndex((s) => s.symbol === ship.symbol) >= 0)
            {
                shiplist[shiplist.findIndex((s) => s.symbol === ship.symbol)] = ship;
            }
            else
            {
                shiplist.push(ship);
            }
            
            setShips(shiplist);
        }*/
    }

    function SetSystem(system: string)
    {
        setSystem(system);
        setVisablity(1);
    }

    const fetchAgent= async () => 
    {
        let data: Agent = await GetAgentAsync();

        agentDispatch({agent: data});

        setSystem(data.headquarters.split("-")[1]);
    };

    const fetchShips = async () => 
    {
        const response: any = await GetShipListAsync();

        let data: IShip[] = response;

        shipDispatch({type: "add", ship: data});
    };

    useEffect(() => 
    {
        fetchShips();
        fetchAgent();
    }, []);

    return (
            <div className="grid grid-cols-[10%_90%] grid-rows-[6%_90%_4%] h-screen">
                <div className="col-start-1 col-span-2 row-start-1"><Header/></div>
                <div className="col-start-1 row-start-2"><SideNav handleCallback={SetComponentVisabilty}/></div>
                <div className="col-start-2 row-start-2">
                    {visability === 0 && <UniverseMap callback={SetSystem}/>}
                    {visability === 1 && <SystemMap agent={agentState} shiplist={shipState} presetSystemSymbol={system} globalDataFunction={SetGlobalData}/>}
                    {visability === 2 && <ShipList shiplist={shipState}/>}
                    {visability === 3 && <ContractList globalDataFunction={SetGlobalData}/>}
                    {visability === 4 && <FactionList/>}
                </div>
                <div className="col-start-1 col-span-2 row-start-3"><Footer/></div>
            </div>
    )
}
  