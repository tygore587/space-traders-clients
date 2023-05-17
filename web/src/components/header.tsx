import React, { useState, useEffect } from "react";
import * as AgentApi from "../pages/api/AgentService";
import { Agent } from "../models/Agent";

export const Header = () => 
{
    const [agent, setAgent] = useState<Agent>();

    const fetchAgent= async () => 
    {
        let data: Agent = await AgentApi.GetAgentAsync();
        
        setAgent(data);
    };

    useEffect(() => 
    {
        fetchAgent();
    }, []);
    return (
        <div className="flex flex-row justify-between align-center bg-slate-700 h-fit w-fill p-[1em] border-b-[0.1em] border-indigo-900/50">
            <div><b>User:</b> {agent?.symbol}</div>
            <div><b>Headquarter:</b> {agent?.headquarters}</div>
            <div><b>Credits:</b> {agent?.credits.toLocaleString('de-DE')}</div>
        </div>
    )
}