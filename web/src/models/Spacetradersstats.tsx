export interface SpaceTradersStats {
    status:       string;
    stats:        Stats;
    leaderboards: Leaderboards;
}

export interface Leaderboards {
    mostCredits:         MostCredit[];
    mostSubmittedCharts: MostSubmittedChart[];
}

export interface MostCredit {
    agentSymbol: string;
    credits:     number;
}

export interface MostSubmittedChart {
    agentSymbol: string;
    chartCount:  number;
}

export interface Stats {
    agents:    number;
    ships:     number;
    systems:   number;
    waypoints: number;
}