import { Agent } from "./Agent"

export interface IContract {
    id: string
    factionSymbol: string
    type: ContractType
    terms: ContractTerm
    accepted: boolean
    fulfilled: boolean
    expiration: Date
    deadlineToAccept: Date
  }

export enum ContractType {
    "PROCUREMENT",
    "TRANSPORT",
    "SHUTTLE"
}
  
export interface ContractTerm {
    deadline: string
    payment: Payment
    deliver: Deliver[]
  }
  
  export interface Payment {
    onAccepted: number
    onFulfilled: number
  }
  
  export interface Deliver {
    tradeSymbol: string
    destinationSymbol: string
    unitsRequired: number
    unitsFulfilled: number
  }

  export interface ContractDeliverGood {
    tradeSymbol: string
    destinationSymbol: string
    unitsRequired: number
    unitsFulfilled: number
  }

export interface IContractAccepted {
    agent: Agent
    contract: IContract
}