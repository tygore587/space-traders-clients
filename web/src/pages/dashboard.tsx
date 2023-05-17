import React, { useState, useEffect } from "react";
import * as AgentApi from "./api/AgentService";
import { Agent } from "../models/Agent";
import {SideNav} from "@/components/sidenav";
import {UniverseMap} from "@/components/universe";
import {Header} from "@/components/header";
import { ShipList } from "@/components/shipList";
import { SystemMap } from "@/components/system";

export default function Dashboard() 
{
    return (
        <main className="h-screen bg-slate-700">
            <Header/>
            <div className="flex flex-row justify-start h-full">
                <SideNav/>
                <div className="flex flex-row justify-start gap-[1em] h-full w-full"/*"grid grid-cols-3 grid-rows-1 h-auto"*/>
                    <ShipList/>
                    <SystemMap/>
                    <UniverseMap/>
                </div>
            </div>
        </main>
    )
}
  