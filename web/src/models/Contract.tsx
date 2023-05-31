import { Agent } from "./Agent"

export interface IContract {
    id: string
    factionSymbol: string
    type: ContractType
    terms: IContractTerm
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
  
export interface IContractTerm {
    deadline: string
    payment: IPayment
    deliver: IDeliver[]
  }
  
  export interface IPayment {
    onAccepted: number
    onFulfilled: number
  }
  
  export interface IDeliver {
    tradeSymbol: string
    destinationSymbol: string
    unitsRequired: number
    unitsFulfilled: number
  }

  export interface IContractDeliverGood {
    tradeSymbol: string
    destinationSymbol: string
    unitsRequired: number
    unitsFulfilled: number
  }

export interface IContractAccepted {
    agent: Agent
    contract: IContract
}