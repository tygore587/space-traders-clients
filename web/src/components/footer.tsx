import React from "react";
import { useAgent } from "@/data/commonContext";


export const Footer = () => 
{
    const {agentState} = useAgent();


    return (
        <div className="flex flex-row justify-between items-center bg-slate-800 h-full w-full px-[0.5em]">
            <div><b>Headquarter:</b> {agentState?.headquarters}</div>
        </div>
    )
}