import { IMarket } from "./Market";
import { IShipyard } from "./Shipyard";

export interface ISavedMarketData {
    lastUpdate: Date
    marketData: IMarket
}

export interface ISavedShipyardData {
    lastUpdate: Date
    marketData: IShipyard
}