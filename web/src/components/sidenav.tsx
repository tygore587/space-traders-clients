import React from "react";

export const SideNav = () =>
{

    return (
        <div className="flex flex-col justify-between bg-slate-600 text-zinc-50 h-fill w-[15em] border-r-[0.1em] border-indigo-900/50">
            <nav className="top-0 md:top-16 pl-[1em]">
                <ul className="list-disc list-inside py-2 flex flex-col gap-2">
                    <li>Universe</li>
                    <li>Ships</li>
                    <li>Contracts</li>
                    <li>Factions</li>
                </ul>
            </nav>
        </div>
    )
}