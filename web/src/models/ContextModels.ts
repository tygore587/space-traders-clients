import { IMarket } from "./Market";
import { IShipyard } from "./Shipyard";

export interface ISavedMarketData {
    lastUpdate: Date
    marketData: IMarket
}

export interface ISavedShipyardData {
    lastUpdate: Date
    shipyardData: IShipyard
}

export interface IWarePriceValues {
    sellMin: number
    sellMax: number
    bestSellAt: string
    buyMin: number
    buyMax: number
    bestBuyAt: string
}