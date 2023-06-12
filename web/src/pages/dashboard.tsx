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
import { useAgent, useContract, useFaction, useShip, useToken, useUniverse } from "@/data/commonContext";
import { IContract } from "@/models/Contract";
import { GetContractsAsync } from "./api/ContractService";
import { GetSystemsAsJSONAsync } from "./api/SystemService";
import { ISystem } from "@/models/System";
import { GetFactionListAsync } from "./api/FactionService";
import { IFaction } from "@/models/Faction";

export default function Dashboard() 
{
    const {token} = useToken();
    const {agent, agentDispatch} = useAgent();
    const {universeDispatch} = useUniverse();
    const {ships, shipDispatch} = useShip();
    const {contractDispatch} = useContract();
    const {factions, factionDispatch} = useFaction();

    const [visability, setVisablity] = useState<number>(0);
    const [system, setSystem] = useState<string>(agent?.headquarters.split("-")[1] ?? "");

    function SetComponentVisabilty(visabilityState: number)
    {
        setVisablity(visabilityState);
    }

    function SetGlobalData(agent?: Agent, ship?: IShip){

        if (agent)
        {
            agentDispatch({agent: agent});
        }

        if (ship)
        {          
            shipDispatch({type: "update", ship: ship});
        }
    }

    function SetSystem(system: string)
    {
        setSystem(system);
        setVisablity(1);
    }

    const fetchAgent= async () => 
    {
        let data: Agent = await GetAgentAsync(token);

        agentDispatch({agent: data});

        setSystem(data.headquarters.split("-")[1]);
    };

    const fetchUniverse = async () => 
    {
        const response: any = await GetSystemsAsJSONAsync();

        let data: ISystem[] = response;

        universeDispatch({type: "add", system: data});
    };

    const fetchShips = async () => 
    {
        const response: any = await GetShipListAsync(token);

        let data: IShip[] = response;

        shipDispatch({type: "add", ship: data});
    };

    const fetchContracts= async () => 
    {
        const response: any = await GetContractsAsync(token);

        let data: IContract[] = response;

        contractDispatch({type: "add", contract: data});
    };

    const fetchFactions= async () => 
    {
        const response: any = await GetFactionListAsync();

        let data: IFaction[] = response;

        factionDispatch({type: "add", faction: data});
    };

    useEffect(() => 
    {
        fetchAgent();
        fetchUniverse();
        fetchShips();
        fetchContracts();

        if (factions.length === 0){
            fetchFactions();
        }
    }, []);

    return (
            <div className="grid grid-cols-[10%_90%] grid-rows-[6%_90%_4%] h-screen">
                <div className="col-start-1 col-span-2 row-start-1"><Header/></div>
                <div className="col-start-1 row-start-2"><SideNav handleCallback={SetComponentVisabilty}/></div>
                <div className="col-start-2 row-start-2">
                    {visability === 0 && <UniverseMap callback={SetSystem}/>}
                    {visability === 1 && <SystemMap presetSystemSymbol={system}/>}
                    {visability === 2 && <ShipList systemCallback={SetSystem}/>}
                    {visability === 3 && <ContractList globalDataFunction={SetGlobalData}/>}
                    {visability === 4 && <FactionList/>}
                </div>
                <div className="col-start-1 col-span-2 row-start-3"><Footer/></div>
            </div>
    )
}
  