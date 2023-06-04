import React from "react";
import { useAgent } from "@/data/commonContext";


export const Header = () => 
{
    const {agent} = useAgent();


    return (
        <div className="flex flex-row justify-between items-center bg-slate-900 h-full w-full px-[1em]">
            <div><b>User:</b> {agent?.symbol}</div>
            <div><b>Credits:</b> {agent?.credits?.toLocaleString('de-DE')}</div>
        </div>
    )
}