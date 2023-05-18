import React, { useState, useContext } from "react";

// probs übergibt eine funktion
export const SideNav = (props:any) =>
{

    return (
        <div className="flex flex-col justify-between bg-slate-600 text-zinc-50 h-fill w-[15em] border-r-[0.1em] border-indigo-900/50">
            <nav className="top-0 md:top-16 pl-[1em]">
                <ul className="list-disc list-inside py-2 flex flex-col gap-2 marker:text-sky-600">
                    <li onClick={() => props.handleCallback(0)} className="select-none hover:font-bold cursor-pointer">Universe</li>
                    <li onClick={() => props.handleCallback(1)} className="select-none hover:font-bold cursor-pointer">System</li>
                    <li onClick={() => props.handleCallback(2)} className="select-none hover:font-bold cursor-pointer">Ships</li>
                    <li onClick={() => props.handleCallback(3)} className="select-none hover:font-bold cursor-pointer">Contracts</li>
                    <li onClick={() => props.handleCallback(4)} className="select-none hover:font-bold cursor-pointer">Factions</li>
                </ul>
            </nav>
        </div>
    )
}