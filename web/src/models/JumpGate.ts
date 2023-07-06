export interface IJumpGate {
    jumpRange: number
    factionSymbol: string
    connectedSystems: IConnectedSystem[]
}

export interface IConnectedSystem {
    symbol: string
    sectorSymbol: string
    type: string
    factionSymbol: string
    x: number
    y: number
    distance: number
}