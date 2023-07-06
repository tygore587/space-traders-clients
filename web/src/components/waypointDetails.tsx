import React, { useEffect, useState } from "react";
import { IWaypoint } from "@/models/Waypoint";
import { IMarket } from "@/models/Market";
import { MarketDetails } from "./marketDetails";
import { IShipyard } from "@/models/Shipyard";
import { ShipyardDetails } from "./shipyardDetails";
import { Agent } from "@/models/Agent";
import { IJump, IShip, ShipNavStatus } from "@/models/Ship";
import { shortCargoSymbol, shortContractSymbol, shortFuelSymbol, shortMarketSymbol, shortShipyardSymbol } from "@/data/commonData";
import { useAgent, useContract, useShip, useToken } from "@/data/commonContext";
import { DeliverContractAsync, FulfillContractAsync } from "@/pages/api/ContractService";
import { IContract, IContractDelivery, IContractFulfillment } from "@/models/Contract";
import { IJumpGate } from "@/models/JumpGate";
import { JumpShipAsync } from "@/pages/api/ShipService";

const hrClass: string = 'border-orange-500 mx-[0.1em] my-[0.3em]';
const shipdiv: string = "flex flex-col justify-start bg-slate-800 pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] border-[0.15em] rounded-md h-fit w-fit select-none"
const buttonClass: string = 'bg-slate-700 my-[0.1em] px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.2em] border-none enabled:hover:bg-slate-600 disabled:opacity-50';

interface IWaypointDetails {
    waypointData: any
    marketData: any
    shipyardData: any
    jumpGateData?: IJumpGate
    setSystem?: Function
}


export const WaypointDetails = ({waypointData, marketData, shipyardData, jumpGateData, setSystem}: IWaypointDetails) =>
{
    const {token} = useToken();
    const {agentDispatch} = useAgent();
    const {ships, shipDispatch} = useShip();
    const {contracts, contractDispatch} = useContract();

    const [update, setUpdate] = useState<string>(waypointData.symbol + new Date().toString());

    const [contractData] = useState<IContract[]>(contracts);
    const [showMarketDetails,setShowMarketDetails] = useState<boolean>(true);
    const [showShipyardDetails,setShowShipyardDetails] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [activeShip, setActiveShip] = useState<IShip>();

    let waypoint: IWaypoint = waypointData;
    let market: IMarket = marketData;
    let shipyard: IShipyard = shipyardData;
    let jumpgate: IJumpGate | undefined = jumpGateData;

    let traitPreview: string = "  - " + (market ? shortMarketSymbol + "  " : "") + (shipyard ? shortShipyardSymbol : "");
    traitPreview = traitPreview.endsWith(" ") ? traitPreview.replace(" ", "") : traitPreview;

    useEffect(() => {
        setUpdate(waypointData.symbol + new Date().toString());
    }, [activeShip]);

    function SelectShip(shipSymbol: string)
    {
        
        setActiveShip(activeShip?.symbol != shipSymbol ? ships.find((s) => s.symbol === shipSymbol) : undefined);
    }

    function GoToSystem(systemSymbol: string)
    {
        if (setSystem)
        {
            setSystem(systemSymbol);
        }
    }

    const fetchShipJump = async (systemSymbol: string, ship?: IShip) => 
    {
        if (ship === undefined || systemSymbol === "") return;


        const response: any = await JumpShipAsync(token, ship, systemSymbol);

        if (response === null) return;

        let jumpData: IJump = response;

        //let selectedShip: IShip = ships?.find((s) => s.symbol === ship.symbol) ?? ship;
        let shipUpdate: IShip = ships.find((s) => s.symbol === activeShip?.symbol)!

        shipUpdate.nav = jumpData.nav;
        shipUpdate.cooldown = jumpData.cooldown
        
        if (activeShip)
        {
            activeShip.nav = jumpData.nav;
            activeShip.cooldown = jumpData.cooldown
        }

        shipDispatch({type: "update", ship: shipUpdate});

        setUpdate(waypointData.symbol + new Date().toString());
    };

    function JumpShip(systemSymbol: string)
    {
        fetchShipJump(systemSymbol, activeShip);
    }

    const DeliverContractUnits = async (tradeSymbol: string, contract: IContract, ship?: IShip) => 
    {
        if (ship === undefined || tradeSymbol === "" || contract === undefined) return;


        const response: any = await DeliverContractAsync(token, ship, tradeSymbol, contract);

        if (response === null) return;

        let contractDeliverData: IContractDelivery = response;

        //let selectedShip: IShip = ships?.find((s) => s.symbol === ship.symbol) ?? ship;
        let shipUpdate: IShip = ships.find((s) => s.symbol === activeShip?.symbol)!

        shipUpdate.cargo = contractDeliverData.cargo;
        if (activeShip)
        {
            activeShip.cargo = contractDeliverData.cargo;
        }

        shipDispatch({type: "update", ship: shipUpdate});

        contractDispatch({type: "update", contract: contractDeliverData.contract})

        setUpdate(waypointData.symbol + new Date().toString());
    };

    function DeliverUnits(contract: IContract)
    {
        let tradeSymbol: string = contract.terms.deliver.length === 1 ? contract.terms.deliver[0].tradeSymbol : "";

        if (tradeSymbol === "")
        {
            tradeSymbol = activeShip?.cargo.inventory.filter((item) => 
                contract.terms.deliver.filter((d) => d.tradeSymbol === item.symbol && d.unitsFulfilled < d.unitsRequired))[0].symbol ?? "";
        }

        DeliverContractUnits(tradeSymbol, contract, activeShip);
    }

    const FulfillContract = async (contract: IContract) => 
    {
        if (contract === undefined) return;


        const response: any = await FulfillContractAsync(token, contract);

        if (response === null) return;

        let contractFulfilledData: IContractFulfillment = response;

        agentDispatch({agent: contractFulfilledData.agent});
        contractDispatch({type: "update", contract: contractFulfilledData.contract});
        setUpdate(waypointData.symbol + new Date().toString());
    };

    function Fulfill(contract: IContract)
    {
        FulfillContract(contract);
    }


    return (
        <div key={update} className="grid grid-cols-1 grid-rows-auto gap-[1em] max-h-full w-full pr-[1em]">
            <div className="
                flex flex-col justify-start 
                bg-slate-800 
                px-[1em] pt-[0.2em] pb-[0.5em] 
                border-[0.15em] rounded-md border-indigo-500/50 
                hover:border-indigo-500 
                h-fit w-full" 
                onClick={() => setShowDetails(!showDetails)}
            >
                <p className="text-orange-500 font-bold text-lg">{waypoint?.symbol}{market || shipyard ? traitPreview : ""}</p>
                <p className="text-orange-500 font-bold text-xs">{waypoint?.type} ({waypoint?.x}, {waypoint?.y})</p>
                <p className="text-orange-500 font-bold text-xs">{waypoint?.faction?.symbol}</p>

                {waypoint?.orbitals.length > 0 && showDetails && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <p className="text-orange-500 font-bold">Orbitals</p>
                    <ul className="list-disc list-inside pl-[0.2em] gap-2 marker:text-orange-500">
                        {waypoint?.orbitals.map((orbital) => 
                            <li key={orbital?.symbol} className="text-xs">{orbital?.symbol}</li>
                        )}
                    </ul>
                </div>}
                {waypoint?.traits.length > 0 && showDetails && <div>
                    <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                    <p className="text-orange-500 font-bold">Traits</p>
                    <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                        {waypoint?.traits.map((trait) => 
                            <li key={trait.symbol} className="text-sm break-words"><b>{trait.name}</b> - {trait.description}</li>
                        )}
                    </ul>
                </div>}
            </div>

            {contractData.filter((c) => c.terms.deliver.filter((d) => d.destinationSymbol === waypoint.symbol).length > 0 && !c.fulfilled).length > 0 && <div className="grid grid-cols-auto grid-rows-auto">
                {contractData?.map((contract) => 
                    <div key={contract.id} className={shipdiv + " border-indigo-500/50"}>
                        <p className="text-orange-500 font-bold">{shortContractSymbol} {contract.type.toString()} {contract.factionSymbol}</p>
                        <ul className="list-disc list-inside mt-[0.4em] pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                            {contract.terms.deliver.map((deliver) => 
                                <li key={deliver.tradeSymbol} className="text-sm break-words"><b>{deliver.tradeSymbol}</b> - {deliver.unitsFulfilled} / {deliver.unitsRequired}</li>
                            )}
                        </ul>
                        <div className="grid grid-cols-2">
                            <button className={buttonClass + " rounded-l-lg mr-[0.05em]"}
                                disabled={activeShip === undefined || activeShip?.nav.status != ShipNavStatus.DOCKED ||
                                    activeShip?.cargo?.inventory?.filter((item) => contract.terms.deliver.filter((d) => d.tradeSymbol == item.symbol)).length! <= 0}
                                onClick={() => DeliverUnits(contract)}>
                                Deliver
                            </button>

                            <button className={buttonClass + " rounded-r-lg ml-[0.05em]"} 
                                disabled={contract.terms.deliver.filter((d) => d.unitsFulfilled === d.unitsRequired).length != contract.terms.deliver.length}
                                onClick={() => Fulfill(contract)}>
                                Fullfill
                            </button>
                        </div>
                    </div>
                )}
            </div>}

            <div className="grid grid-flow-col-dense grid-cols-auto grid-rows-auto">
                {ships?.filter((s) => s.nav.waypointSymbol === waypoint.symbol && s.nav.status != ShipNavStatus.IN_TRANSIT).map((ship) =>
                    <div key={ship.symbol} className={shipdiv + (activeShip?.symbol === ship.symbol ? " border-orange-500" : " border-indigo-500/50 hover:border-indigo-500")} 
                        onClick={() => SelectShip(ship.symbol)}>
                        <p className="text-orange-500 font-bold">{ship.symbol} ({ship?.registration.role} {ship.frame.name.replace("Frame ", "")})</p>
                        <div className="grid grid-cols-2">
                            {ship.fuel.capacity > 0 && <p>{shortFuelSymbol} {ship.fuel.current} / {ship.fuel.capacity}</p>}
                            {ship.cargo.capacity > 0 && <p>{shortCargoSymbol} {ship.cargo.units} / {ship.cargo.capacity}</p>}
                        </div>
                    </div>
                )}
            </div>

            {jumpgate && <div>
                <p>JumpGate Data</p>
                <p>Range: {jumpgate.jumpRange}</p>
                {jumpgate?.connectedSystems?.map((s) => 
                    <div key={s.symbol+s.distance}>
                        <p className="text-orange-500 font-bold select-none">{s.type} -- {s.factionSymbol} -- {s.symbol} - {s.distance} ly.</p>
                        <button className={buttonClass} onClick={() => GoToSystem(s.symbol)}>go To</button>
                        <button className={buttonClass} onClick={() => JumpShip(s.symbol)}>Jump</button>
                    </div>)}
                
            </div>}

            <div className="grid grid-cols-1 grid-rows-auto">
                {market && <div className="flex flex-col justify-start ">
                    <div>
                        <p className="text-orange-500 font-bold select-none hover:bg-slate-800 pl-[0.5em]" onClick={() => setShowMarketDetails(!showMarketDetails)} >Marketplace</p>
                        <hr className={hrClass}/>
                    </div>

                    {showMarketDetails && <MarketDetails marketData={market} selectedShip={activeShip}/>}
                </div>}

                {shipyard && <div>
                    <div>
                        <p className="text-orange-500 font-bold select-none hover:bg-slate-800 pl-[0.5em]" onClick={() => setShowShipyardDetails(!showShipyardDetails)} >Shipyard</p>
                        <hr className={hrClass}/>
                    </div>

                    {showShipyardDetails && <div className="flex-1">
                        <ShipyardDetails shipyardData={shipyard}/>
                    </div>}
                </div>}
            </div>
        </div>
    )
}