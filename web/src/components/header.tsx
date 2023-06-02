import React, { useState, useEffect } from "react";
import * as AgentApi from "../pages/api/AgentService";
import { Agent } from "../models/Agent";
import { useAgent } from "@/data/commonContext";


export const Header = () => 
{
    const {agentState, agentDispatch} = useAgent();

    /*const [agent, setAgent] = useState<Agent>();

    const fetchAgent= async () => 
    {
        let data: Agent = await AgentApi.GetAgentAsync();
        
        setAgent(data);
    };

    useEffect(() => 
    {
        fetchAgent();
    }, []);*/

    return (
        <div className="flex flex-row justify-between items-center bg-slate-900 h-full w-full px-[1em]">
            <div><b>User:</b> {agentState?.symbol}</div>
            <div><b>Credits:</b> {agentState?.credits?.toLocaleString('de-DE')}</div>
        </div>
    )
}