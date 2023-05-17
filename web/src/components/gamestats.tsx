import React, { useState, useEffect } from "react";
import { GetStatsAsync } from '../pages/api/SpaceTradersStatsService'
import {SpaceTradersStats} from "../models/Spacetradersstats"


// component used to archive the asset record locally in our database
export const GameStats = () => 
{
    const [stats, setStats] = useState<SpaceTradersStats>();

    const fetchStats = async () => 
    {
        const response: any = await GetStatsAsync();

        let data: SpaceTradersStats = response.data;

        setStats(data);
    };

    useEffect(() => 
    {
        fetchStats();
    }, []);

    return (
        <>
        <div className="ml-5">
            <div><b>Status:</b> {stats?.status}</div>
            <div><b>active Agents:</b> {stats?.stats.agents}</div>
            <div><b>active Ships:</b> {stats?.stats.ships}</div>
            <div><b>System count:</b> {stats?.stats.systems}</div>
            <div><b>waypoint count:</b> {stats?.stats.waypoints}</div>
            <div><b>Leaderboard:</b></div>
            <ul className="ml-5">
                {stats?.leaderboards.mostCredits.map((user) => (
                    <li key={user.agentSymbol}>
                        <a>
                            {user.agentSymbol} - {user.credits.toLocaleString('de-DE')}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};