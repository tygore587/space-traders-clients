import { Agent } from "@/models/Agent";
import React from "react";

interface IAgent {
    agent?: Agent
}

export const Footer = ({agent}:IAgent) => 
{
    return (
        <div className="flex flex-row justify-between items-center bg-slate-800 h-full w-full px-[0.5em]">
            <div><b>Headquarter:</b> {agent?.headquarters}</div>
        </div>
    )
}