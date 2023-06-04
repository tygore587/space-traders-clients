import React from "react";
import { useAgent } from "@/data/commonContext";


export const Footer = () => 
{
    const {agent} = useAgent();


    return (
        <div className="flex flex-row justify-between items-center bg-slate-800 h-full w-full px-[0.5em]">
            <div><b>Headquarter:</b> {agent?.headquarters}</div>
        </div>
    )
}