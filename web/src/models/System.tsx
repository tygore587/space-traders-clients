export interface System {
    symbol: string
    sectorSymbol: string
    type: string
    x: number
    y: number
    waypoints: SystemWaypoint[]
    factions: SystemFaction[]
}
  
interface SystemWaypoint {
    symbol: string
    type: string
    x: number
    y: number
}
  
interface SystemFaction {
    symbol: string
}