import { IShipEngine, IShipFrame, IShip, IShipModule, IShipMount, IShipReactor } from "./Ship"
import { Agent } from "./Agent"

export interface IShipyard {
    symbol: string
    shipTypes: IShipType[]
    transactions: ITransaction[]
    ships: IShipyardShip[]
  }
  
export interface IShipType {
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
  
  export interface ITransaction {
    waypointSymbol: string
    shipSymbol: string
    price: number
    agentSymbol: string
    timestamp: Date
  }

  export interface IShipyardShip {
    type: ShipTypeEnum
    name: string
    description: string
    purchasePrice: number
    frame: IShipFrame
    reactor: IShipReactor
    engine: IShipEngine
    modules: IShipModule[]
    mounts: IShipMount[]
  }
  
export interface IShipPurchase {
  agent: Agent
  ship: IShip
  transaction: ITransaction
}