import { ShipEngine, ShipFrame, ShipModule, ShipMount, ShipReactor } from "./Ship"

export interface Shipyard {
    symbol: string
    shipTypes: ShipType[]
    transactions: Transaction[]
    ships: ShipyardShip[]
  }
  
  export enum ShipType {
    "SHIP_PROBE",
    "SHIP_MINING_DRONE",
    "SHIP_INTERCEPTOR",
    "SHIP_LIGHT_HAULER",
    "SHIP_COMMAND_FRIGATE",
    "SHIP_EXPLORER",
    "SHIP_HEAVY_FREIGHTER",
    "SHIP_LIGHT_SHUTTLE",
    "SHIP_ORE_HOUND",
    "SHIP_REFINING_FREIGHTER"
  }
  
  export interface Transaction {
    waypointSymbol: string
    shipSymbol: string
    price: number
    agentSymbol: string
    timestamp: Date
  }

  export interface ShipyardShip {
    type: ShipType
    name: string
    description: string
    purchasePrice: number
    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine
    modules: ShipModule[]
    mounts: ShipMount[]
  }
  