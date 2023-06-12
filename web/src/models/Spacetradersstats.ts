export interface ISpaceTradersStats {
    status:       string;
    stats:        IStats;
    leaderboards: ILeaderboards;
    serverResets: IServerReset;
}

export interface ILeaderboards {
    mostCredits:         IMostCredit[];
    mostSubmittedCharts: IMostSubmittedChart[];
}

export interface IMostCredit {
    agentSymbol: string;
    credits:     number;
}

export interface IMostSubmittedChart {
    agentSymbol: string;
    chartCount:  number;
}

export interface IStats {
    agents:    number;
    ships:     number;
    systems:   number;
    waypoints: number;
}

export interface IServerReset {
    frequency: string;
    next: Date;
}