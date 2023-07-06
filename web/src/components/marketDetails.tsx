import React, { useEffect, useState } from "react";
import { IMarket, IMarketTradeGood, ITradeGood } from "@/models/Market";
import { ICargoTransaction, IShip, ShipNavStatus } from "@/models/Ship";
import { useAgent, useToken } from "@/data/commonContext";
import { PurchaseCargoAsync, SellCargoAsync } from "@/pages/api/ShipService";
import { IWaypoint, IWaypointTrait, WaypointTraitSymbol } from "@/models/Waypoint";
import { GetMarketAsync } from "@/pages/api/SystemService";
import { ISavedMarketData } from "@/models/ContextModels";
import { savedMarketData } from "@/data/commonData";

const hrClass: string = 'border-orange-500 mx-[0.1em] my-[0.3em]';
const grid: string = "grid grid-cols-[25%_10%_10%_15%_20%_20%]";
const buttonClass: string = 'w-fit bg-slate-700 my-[0.1em] px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.2em] border-none border-sky-700 enabled:hover:bg-slate-600 disabled:opacity-50';

interface IMarketDetails {
    marketData: IMarket
    selectedShip?: IShip
}

export const MarketDetails = ({marketData, selectedShip}: IMarketDetails) =>
{
    const {token} = useToken();
    const {agentDispatch} = useAgent();

    const [activeTradegood, setActiveTradegood] = useState<string>("");
    const [update, setUpdate] = useState<string>(marketData.symbol + new Date().toString())
    //const [market, setMarket] = useState<IMarket>();

    /*useEffect(() => 
    {
        setMarket(marketData);
    }, []);*/

    let market: IMarket | undefined = marketData;
    let tradeGoodMap: Map<string, IMarketTradeGood> = new Map<string, IMarketTradeGood>();
    let cargo: Map<string, number> = new Map<string, number>();

    if (selectedShip != undefined && selectedShip?.cargo?.inventory?.length > 0)
    {
        selectedShip.cargo.inventory.forEach((item) => cargo.set(item.symbol, item.units));
    }
    else
    {
        cargo = new Map<string, number>();
    }

    if (market?.tradeGoods)
    {
        market.tradeGoods.forEach((tGood) => tradeGoodMap.set(tGood.symbol, tGood));
    }

    function SetActiveTradegood(tradegood: string)
    {
        setActiveTradegood(activeTradegood != tradegood ? tradegood : "");
    }

    const fetchMarket = async (systemSymbol: string, waypointSymbol: string) => 
    {
        if (systemSymbol === "" || waypointSymbol === "")
        {
            return;
        } 

        const response: any = await GetMarketAsync(token, systemSymbol, waypointSymbol);

        let result: IMarket = response;
        let newSave: ISavedMarketData = {lastUpdate: new Date(), marketData: result};

        savedMarketData.set(result.symbol, newSave);
        market = undefined;
        market = result;
        setUpdate(market?.symbol + new Date().toString());
        //setMarket(result);
    };

    const SellSelectedCargoFromShip = async (tradegood: IMarketTradeGood, itemCount: number, ship?: IShip) => 
    {
        if (ship === undefined || tradegood === undefined || itemCount <= 0) return;

        const response: any = await SellCargoAsync(token, ship, tradegood, itemCount);

        if (response === null){
            return;
        }

        let transactionData: ICargoTransaction = response;

        agentDispatch({agent: transactionData.agent});

        if (selectedShip)
        {
            selectedShip.cargo = transactionData.cargo;
        }
        
        await fetchMarket(ship.nav.systemSymbol, ship.nav.waypointSymbol);
        //setUpdate(market?.symbol + new Date().toString());
    };

    function SellCargo(tradeGood: IMarketTradeGood)
    {
        let cargoCount: number = cargo.get(tradeGood.symbol.toString()) ?? 0;

        SellSelectedCargoFromShip(tradeGood, cargoCount, selectedShip ?? undefined);
    }

    const PurchaseSelectedCargoFromShip = async (tradegood: IMarketTradeGood, itemCount: number, ship?: IShip) => 
    {
        if (ship === undefined || tradegood === undefined || itemCount <= 0) return;

        const response: any = await PurchaseCargoAsync(token, ship, tradegood, itemCount);

        if (response === null){
            return;
        }

        let transactionData: ICargoTransaction = response;

        agentDispatch({agent: transactionData.agent});

        if (selectedShip)
        {
            selectedShip.cargo = transactionData.cargo;
        }

        console.log(transactionData.transaction);

        await fetchMarket(ship.nav.systemSymbol, ship.nav.waypointSymbol);
        //setUpdate(market?.symbol + new Date().toString());
    };
    
    function PurchaseCargo(tradeGood: IMarketTradeGood)
    {
        let cargoCount: number = cargo.get(tradeGood.symbol.toString()) ?? 0;

        PurchaseSelectedCargoFromShip(tradeGood, cargoCount, selectedShip ?? undefined);
    }

    return (
        <div key={update} className="flex-1 flex flex-col justify-start gap-x-[0.5em] w-full overflow-y-auto pb-[1em] pl-[1em]">
            {!market?.tradeGoods && <div className="">
                {market?.exchange.length > 0 && <div>
                    <p className="text-orange-500 select-none">Exchange</p>
                    {market?.exchange?.sort((a, b) => a.name.localeCompare(b.name)).map((exch) =>
                        <p key={exch.symbol + "_exchange"}>{exch.name}</p>
                    )}
                    {(market?.imports.length > 0 || market?.exports.length > 0 || market?.tradeGoods) && <hr className={hrClass}/>}
                </div>}

                {(market?.imports.length > 0 || market?.exports.length > 0) && <div>
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-orange-500 select-none">Import</p>
                            {market?.imports?.sort((a, b) => a.name.localeCompare(b.name)).map((imp) =>
                                <p key={imp.symbol + "_import"}>{imp.name}</p>
                            )}
                        </div>
                        
                        <div>
                            <p className="text-orange-500 select-none">Export</p>
                            {market?.exports?.sort((a, b) => a.name.localeCompare(b.name)).map((ex) =>
                                <p key={ex.symbol + "_export"}>{ex.name}</p>
                            )}
                        </div>
                    </div>
                </div>}
            </div>}

            {market?.tradeGoods && <div className="flex flex-col select-none">
                <div className={grid}>
                    <div className="text-left text-orange-500 font-bold">- Item -</div>
                    <div className="text-right text-orange-500 font-bold">- Sell -</div>
                    <div className="text-right text-orange-500 font-bold">- Buy -</div>
                    <div className="text-center text-orange-500 font-bold">- Supply -</div>
                    <div className="text-center text-orange-500 font-bold">- Trade Volume -</div>
                    <div className="text-center text-orange-500 font-bold">- Sell/Buy -</div>
                </div>

                {market?.exchange.length > 0 && <div className="flex flex-col"> 
                        <p className="font-semibold text-orange-700"> -- Exchange -- </p>
                        {market?.exchange?.sort((a, b) => a.name.localeCompare(b.name)).map((good) =>
                            <div className={grid} key={good.symbol + "_good"}>
                                <div className="text-left" onClick={() => SetActiveTradegood(good.symbol.toString())}>{good.name}</div>
                                <div className="text-right pr-[1em]">{tradeGoodMap.get(good.symbol.toString())!.sellPrice.toLocaleString("de-DE")} Cr.</div>
                                <div className="text-right pr-[1em]">{tradeGoodMap.get(good.symbol.toString())!.purchasePrice.toLocaleString("de-DE")} Cr.</div>
                                <div className="text-center">{tradeGoodMap.get(good.symbol.toString())!.supply}</div>
                                <div className="text-center">{tradeGoodMap.get(good.symbol.toString())!.tradeVolume}</div>
                                <div className="flex flex-row justify-items-center items-center">
                                    <button id={good.symbol.toString() + "#sell"} className={buttonClass + " rounded-l-lg mr-[0.1em]"}
                                        disabled={selectedShip?.cargo.inventory.find((item) => item.symbol === good.symbol.toString()) === undefined ||
                                        selectedShip?.nav?.status.toString() != ShipNavStatus.DOCKED}
                                        onClick={() => SellCargo(tradeGoodMap.get(good.symbol.toString())!)}>
                                        Sell
                                    </button>
                                    <input id={good.symbol.toString() + "#input"} key={cargo.get(good.symbol.toString()) ?? 0}
                                        className="w-[50%] bg-slate-700 px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.1em] border-none focus:outline-none focus:border-sky-500 focus:ring-2" 
                                        type="number" min={0} max={tradeGoodMap.get(good.symbol.toString())?.tradeVolume} 
                                        disabled={selectedShip === undefined || selectedShip?.cargo.capacity === 0 ||
                                        selectedShip?.nav?.status.toString() != ShipNavStatus.DOCKED}
                                        defaultValue={cargo.get(good.symbol.toString()) ?? 0}
                                        onChange={(v) => cargo.set(good.symbol.toString(), Number.parseInt(v.target.value))}/>
                                    <button id={good.symbol.toString() + "#buy"} className={buttonClass + " rounded-r-lg ml-[0.1em]"} 
                                        disabled={selectedShip?.cargo.units === selectedShip?.cargo.capacity ||
                                        selectedShip?.nav?.status.toString() != ShipNavStatus.DOCKED}
                                        onClick={() => PurchaseCargo(tradeGoodMap.get(good.symbol.toString())!)}>
                                        Buy
                                    </button>
                                </div>
                                {activeTradegood === good.symbol.toString() && <p className="col-span-6 text-xs text-slate-600 mb-[0.5em]">{good.description}</p>}
                            </div>
                        )}
                </div>}

                {market?.imports.length > 0 && <div className="flex flex-col"> 
                        <p className={"font-semibold text-orange-700" + (market.exchange.length > 0 ? " mt-[1em]" : "")}> -- Import -- </p>
                        {market?.imports?.sort((a, b) => a.name.localeCompare(b.name)).map((good) =>
                            <div className={grid} key={good.symbol + "_good"}>
                                <div className="text-left" onClick={() => SetActiveTradegood(good.symbol.toString())}>{good.name}</div>
                                <div className="text-right pr-[1em]">{tradeGoodMap.get(good.symbol.toString())!.sellPrice.toLocaleString("de-DE")} Cr.</div>
                                <div className="text-right pr-[1em]">{tradeGoodMap.get(good.symbol.toString())!.purchasePrice.toLocaleString("de-DE")} Cr.</div>
                                <div className="text-center">{tradeGoodMap.get(good.symbol.toString())!.supply}</div>
                                <div className="text-center">{tradeGoodMap.get(good.symbol.toString())!.tradeVolume}</div>
                                <div className="flex flex-row justify-items-center items-center">
                                    <button id={good.symbol.toString() + "#sell"} className={buttonClass + " rounded-l-lg mr-[0.1em]"}
                                        disabled={selectedShip?.cargo.inventory.find((item) => item.symbol === good.symbol.toString()) === undefined||
                                            selectedShip?.nav?.status.toString() != ShipNavStatus.DOCKED}
                                        onClick={() => SellCargo(tradeGoodMap.get(good.symbol.toString())!)}>
                                        Sell
                                    </button>
                                    <input id={good.symbol.toString() + "#input"} key={cargo.get(good.symbol.toString()) ?? 0}
                                        className="w-[50%] bg-slate-700 px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.1em] border-none focus:outline-none focus:border-sky-500 focus:ring-2" 
                                        type="number" min={0} max={tradeGoodMap.get(good.symbol.toString())?.tradeVolume} 
                                        disabled={selectedShip === undefined || selectedShip?.cargo.capacity === 0||
                                            selectedShip?.nav?.status.toString() != ShipNavStatus.DOCKED}
                                        defaultValue={cargo.get(good.symbol.toString()) ?? 0}
                                        onChange={(v) => cargo.set(good.symbol.toString(), Number.parseInt(v.target.value))}/>
                                    <button id={good.symbol.toString() + "#buy"} className={buttonClass + " rounded-r-lg ml-[0.1em]"} 
                                        disabled={selectedShip?.cargo.units === selectedShip?.cargo.capacity||
                                            selectedShip?.nav?.status.toString() != ShipNavStatus.DOCKED}
                                        onClick={() => PurchaseCargo(tradeGoodMap.get(good.symbol.toString())!)}>
                                        Buy
                                    </button>
                                </div>
                                {activeTradegood === good.symbol.toString() && <p className="col-span-6 text-xs text-slate-600 mb-[0.5em]">{good.description}</p>}
                            </div>
                        )}
                </div>}

                {market?.exports.length > 0 && <div className="flex flex-col"> 
                        <p className={"font-semibold text-orange-700" + (market.exchange.length > 0 || market.imports.length > 0 ? " mt-[1em]" : "")}> -- Export -- </p>
                        {market?.exports?.sort((a, b) => a.name.localeCompare(b.name)).map((good) =>
                            <div className={grid} key={good.symbol + "_good"}>
                                <div className="text-left" onClick={() => SetActiveTradegood(good.symbol.toString())}>{good.name}</div>
                                <div className="text-right pr-[1em]">{tradeGoodMap.get(good.symbol.toString())!.sellPrice.toLocaleString("de-DE")} Cr.</div>
                                <div className="text-right pr-[1em]">{tradeGoodMap.get(good.symbol.toString())!.purchasePrice.toLocaleString("de-DE")} Cr.</div>
                                <div className="text-center">{tradeGoodMap.get(good.symbol.toString())!.supply}</div>
                                <div className="text-center">{tradeGoodMap.get(good.symbol.toString())!.tradeVolume}</div>
                                <div className="flex flex-row justify-items-center items-center">
                                    <button id={good.symbol.toString() + "#sell"} className={buttonClass + " rounded-l-lg mr-[0.1em]"}
                                        disabled={selectedShip?.cargo.inventory.find((item) => item.symbol === good.symbol.toString()) === undefined||
                                            selectedShip?.nav?.status.toString() != ShipNavStatus[ShipNavStatus.DOCKED]}
                                        onClick={() => SellCargo(tradeGoodMap.get(good.symbol.toString())!)}>
                                        Sell
                                    </button>
                                    <input id={good.symbol.toString() + "#input"} key={cargo.get(good.symbol.toString()) ?? 0}
                                        className="w-[50%] bg-slate-700 px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.1em] border-none focus:outline-none focus:border-sky-500 focus:ring-2" 
                                        type="number" min={0} max={tradeGoodMap.get(good.symbol.toString())?.tradeVolume} 
                                        disabled={selectedShip === undefined || selectedShip?.cargo.capacity === 0||
                                            selectedShip?.nav?.status.toString() != ShipNavStatus[ShipNavStatus.DOCKED]}
                                        defaultValue={cargo.get(good.symbol.toString()) ?? 0}
                                        onChange={(v) => cargo.set(good.symbol.toString(), Number.parseInt(v.target.value))}/>
                                    <button id={good.symbol.toString() + "#buy"} className={buttonClass + " rounded-r-lg ml-[0.1em]"} 
                                        disabled={selectedShip?.cargo.units === selectedShip?.cargo.capacity||
                                            selectedShip?.nav?.status.toString() != ShipNavStatus[ShipNavStatus.DOCKED]}
                                        onClick={() => PurchaseCargo(tradeGoodMap.get(good.symbol.toString())!)}>
                                        Buy
                                    </button>
                                </div>
                                {activeTradegood === good.symbol.toString() && <p className="col-span-6 text-xs text-slate-600 mb-[0.5em]">{good.description}</p>}
                            </div>
                        )}
                </div>}

            </div>}
        </div>
    )
}