import { Interface } from "readline"
import { ShipEngine, ShipFrame, ShipModule, ShipMount, ShipReactor } from "./Ship"
import { Agent } from "./Agent"

export interface Shipyard {
    symbol: string
    shipTypes: ShipType[]
    transactions: Transaction[]
    ships: ShipyardShip[]
  }
  
export interface ShipType {
  type: ShipTypeEnum
}

  export enum ShipTypeEnum {
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
    type: ShipTypeEnum
    name: string
    description: string
    purchasePrice: number
    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine
    modules: ShipModule[]
    mounts: ShipMount[]
  }
  
export interface IShipPurchase {
  agent: Agent
  ship: ShipyardShip
  transaction: Transaction
}