import React from "react";
import { useAgent } from "@/data/commonContext";


export const Header = () => 
{
    const {agentState} = useAgent();


    return (
        <div className="flex flex-row justify-between items-center bg-slate-900 h-full w-full px-[1em]">
            <div><b>User:</b> {agentState?.symbol}</div>
            <div><b>Credits:</b> {agentState?.credits?.toLocaleString('de-DE')}</div>
        </div>
    )
}