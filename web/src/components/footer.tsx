import { useAgent } from "@/data/commonContext";
import { Agent } from "@/models/Agent";
import React from "react";

export const Footer = () => 
{
    const {agentState, agentDispatch} = useAgent();


    return (
        <div className="flex flex-row justify-between items-center bg-slate-800 h-full w-full px-[0.5em]">
            <div><b>Headquarter:</b> {agentState?.headquarters}</div>
        </div>
    )
}