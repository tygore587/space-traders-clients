export interface ISystem {
    symbol: string
    sectorSymbol: string
    type: string
    x: number
    y: number
    waypoints: ISystemWaypoint[]
    factions: ISystemFaction[]
}
  
interface ISystemWaypoint {
    symbol: string
    type: string
    x: number
    y: number
}
  
interface ISystemFaction {
    symbol: string
}