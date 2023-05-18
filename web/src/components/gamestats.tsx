import React, { useState, useEffect, use } from "react";
import { GetStatsAsync } from '../pages/api/SpaceTradersStatsService'
import {SpaceTradersStats} from "../models/Spacetradersstats"

export const GameStats = () => 
{
    const [stats, setStats] = useState<SpaceTradersStats>();
    const [resetDate, setResetDate] = useState<string>();

    const fetchStats = async () => 
    {
        const response: any = await GetStatsAsync();

        let data: SpaceTradersStats = response;

        let dateString: string = data?.serverResets?.next?.toString();

        setResetDate(dateString != "" ? new Date(dateString).toLocaleString("de-DE") : "-");

        setStats(data);
    };

    useEffect(() => 
    {
        fetchStats();
    }, []);

    return (
        <>
        <div className="ml-5">
            <div className="text-sky-600"><b>Next Server Reset - {resetDate}</b></div>
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