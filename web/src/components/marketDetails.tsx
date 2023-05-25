import React, { useEffect, useState } from "react";
import { Market } from "@/models/Market";

const hrClass: string = 'border-orange-500 mx-[0.1em] my-[0.3em]';

export const MarketDetails = ({marketData}: any) =>
{
    let market: Market = marketData;
    let itemSymbolMap: Map<string, string> = new Map<string, string>();

    if (market)
    {
        market?.exchange.forEach((exGood) => itemSymbolMap.set(exGood.symbol.toString(), exGood.name));
        market?.imports.forEach((iGood) => itemSymbolMap.set(iGood.symbol.toString(), iGood.name));
        market?.exports.forEach((eGood) => itemSymbolMap.set(eGood.symbol.toString(), eGood.name));
    }

    return (
        <div className="flex flex-col grow shrink justify-start gap-x-[0.5em] w-full overflow-y-auto pb-[1em]">
            <div className="sticky top-0 bg-slate-900/75">
                <p className="text-orange-500 font-bold">Marketplace</p>
                <hr className={hrClass}/>
            </div>

            <div className="grow">
                {market?.exchange.length > 0 && <div>
                    <p className="text-orange-500">Exchange</p>
                    {market?.exchange.map((exch) =>
                        <p key={exch.symbol + "_exchange"}>{exch.name}</p>
                    )}
                    {(market?.imports.length > 0 || market?.exports.length > 0 || market?.tradeGoods) && <hr className={hrClass}/>}
                </div>}

                {(market?.imports.length > 0 || market?.exports.length > 0) && <div>
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="text-orange-500">Import</p>
                            {market?.imports.map((imp) =>
                                <p key={imp.symbol + "_import"}>{imp.name}</p>
                            )}
                        </div>
                        
                        <div>
                            <p className="text-orange-500">Export</p>
                            {market?.exports.map((ex) =>
                                <p key={ex.symbol + "_export"}>{ex.name}</p>
                            )}
                        </div>
                    </div>
                    {market?.tradeGoods && <hr className={hrClass}/>}
                </div>}

            </div>
            {market?.tradeGoods && <div className="grow">
                <p className="text-orange-500">Trade</p>
                <div className="table w-full">
                    <div className="table-header-group">
                        <div className="table-row">
                            <div className="table-cell text-left font-bold">Item</div>
                            <div className="table-cell text-left font-bold">purchase Price</div>
                            <div className="table-cell text-left font-bold">sell Price</div>
                            <div className="table-cell text-left font-bold">Supply</div>
                            <div className="table-cell text-left font-bold">Trade Volume</div>
                        </div>
                    </div>
                    <div className="table-row-group">
                        {market?.tradeGoods?.map((good) =>
                            <div className="table-row" key={good.symbol + "_good"}>
                                <div className="table-cell text-left">{itemSymbolMap.has(good.symbol) ? itemSymbolMap.get(good.symbol) : good.symbol}</div>
                                <div className="table-cell text-left">{good.purchasePrice}</div>
                                <div className="table-cell text-left">{good.sellPrice}</div>
                                <div className="table-cell text-left">{good.supply}</div>
                                <div className="table-cell text-left">{good.tradeVolume}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>}
        </div>
    )
}