import { ISavedMarketData, ISavedShipyardData, IWarePriceValues } from "@/models/ContextModels";
import { IMarket, IMarketTradeGood } from "@/models/Market";
import { IShip, ShipNavFlightMode } from "@/models/Ship";
import { IWaypoint } from "@/models/Waypoint";
import { savedMarketData, savedShipyardData, waresValueData } from "./commonData";
import { IShipyard } from "@/models/Shipyard";

const flightconst: number = 15;

export function AddHours(date: Date, hours: number): Date 
{
  date.setTime(date.getTime() + (hours*60*60*1000));

  return date;
}

export function AddMinutes(date: Date, minutes: number): Date 
{
  date.setTime(date.getTime() + (minutes*60*1000));

  return date;
}

export function UpdateValueData(waypointSymbol: string, tradegood: IMarketTradeGood)
{
  if (tradegood === undefined) return;

  if (waresValueData?.has(tradegood.symbol))
  {
    let values: IWarePriceValues = waresValueData.get(tradegood.symbol)!;

    values.sellMin = Math.min(values.sellMin, tradegood.sellPrice);

    if (tradegood.sellPrice > values.sellMax)
    {
      values.sellMax = tradegood.sellPrice;
      values.bestSellAt = waypointSymbol;
    }

    values.buyMax = Math.max(values.buyMax, tradegood.purchasePrice);

    if (tradegood.purchasePrice < values.buyMin)
    {
      values.buyMin = tradegood.purchasePrice;
      values.bestBuyAt = waypointSymbol;
    }

    waresValueData.set(tradegood.symbol, values);
  }
  else
  {
    let values: IWarePriceValues = {
      bestBuyAt: waypointSymbol,
      bestSellAt: waypointSymbol,
      buyMax: tradegood.purchasePrice,
      buyMin: tradegood.purchasePrice,
      sellMax: tradegood.sellPrice,
      sellMin: tradegood.sellPrice
    }

    waresValueData.set(tradegood.symbol, values);
  }
}

export function UpdateSavedMarketData(marketData: IMarket) 
{
  let data: ISavedMarketData = {lastUpdate: new Date(), marketData: marketData};

  if (marketData.tradeGoods?.length > 0)
  {
    marketData.tradeGoods.forEach((good) => UpdateValueData(marketData.symbol, good));
  }

  savedMarketData.set(marketData.symbol, data);
}

export function UpdateSavedShipyardData(shipyardData: IShipyard) 
{
  let data: ISavedShipyardData = {lastUpdate: new Date(), shipyardData: shipyardData};

  savedShipyardData.set(shipyardData.symbol, data);
}

function CalculateDistance(x1: number, y1: number, x2: number, y2: number): number 
{
  if (x1 === x2 && y1 === y2) return 0;

  let a: number = x2 - x1;
  let b: number = y2 - y1;

  let d: number = Math.sqrt(a*a + b*b);

  return d;
}

export function CalculateTravelTime(ship: IShip, currentLocation?: IWaypoint, destination?: IWaypoint): number 
{
  if (currentLocation === undefined || destination === undefined) return 0;
  if (currentLocation?.symbol === destination?.symbol) return 0;
  if (currentLocation?.systemSymbol != destination?.systemSymbol) return 0;

  let distance = CalculateDistance(currentLocation.x, currentLocation.y, destination.x, destination.y);

  let flightModeModifier: number = 10;

  switch (ship.nav.flightMode) {
    case ShipNavFlightMode.BURN:
      flightModeModifier = 5;
      break;

    case ShipNavFlightMode.CRUISE:
      flightModeModifier = 10;
      break;

    case ShipNavFlightMode.DRIFT:
      flightModeModifier = 100;
      break;

    case ShipNavFlightMode.STEALTH:
      flightModeModifier = 20;
      break;
  }

  return Math.round(flightconst + flightModeModifier * (distance / ship.engine.speed));
}

export function CalculateFuelConsumption(ship: IShip, currentLocation?: IWaypoint, destination?: IWaypoint): number 
{
  if (currentLocation === undefined || destination === undefined) return 0;
  if (currentLocation?.symbol === destination?.symbol) return 0;
  if (currentLocation?.systemSymbol != destination?.systemSymbol) return 0;

  let distance = CalculateDistance(currentLocation.x, currentLocation.y, destination.x, destination.y);

  distance = Math.max(1, distance);

  switch (ship.nav.flightMode) {
    case ShipNavFlightMode.BURN:
      return Math.round(distance * 2);

    case ShipNavFlightMode.CRUISE:
      return Math.round(distance);

    case ShipNavFlightMode.DRIFT:
      return 1;

    case ShipNavFlightMode.STEALTH:
      return Math.round(distance);
  }
}