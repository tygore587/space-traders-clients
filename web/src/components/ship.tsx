import React, { useState } from "react";
import { ICooldown, IExtractionResult, INavigate, IRefuel, IShip, IShipNav, ISurvey, ShipModuleSymbol, ShipMountSymbol, ShipNavFlightMode, ShipNavStatus, ShipNavWaypointType } from "@/models/Ship";
import { shortCargoSymbol, shortFuelSymbol, shortTimerSymbol, waresValueData } from "@/data/commonData";
import { DockShipAsync, ExtractRessourcesAsync, NavigateShipAsync, OrbitShipAsync, PatchFlightModeAsync, RefuelShipAsync } from "@/pages/api/ShipService";
import { useAgent, useShip, useToken } from "@/data/commonContext";
import { IWaypoint } from "@/models/Waypoint";
import { Timer } from "./timer";
import { CalculateFuelConsumption, CalculateTravelTime } from "@/data/commonFunctions";

interface IShipData
{
    shipData: IShip
    active?: boolean
    showActions?: boolean
    currentSystemWaypoints?: IWaypoint[]
    callback: Function
    systemCallback?: Function
}

const shipdiv: string = "flex flex-col justify-start bg-slate-800 pl-[1em] pr-[1em] pt-[0.2em] pb-[0.5em] border-[0.15em] rounded-md h-fit select-none"
const buttonClass: string = 'bg-slate-700 mt-[0.25em] px-[0.4em] pt-[0.1em] pb-[0.2em] border-[0.2em] border-none rounded-lg border-sky-700 enabled:hover:bg-slate-600 disabled:opacity-50';
const selectClass: string = "bg-slate-800 hover:bg-slate-700 px-[0.1em] border-[0.2em] border-none rounded-lg";

export const Ship = ({shipData, active, showActions, currentSystemWaypoints, callback, systemCallback}:IShipData) =>
{
    const {token} = useToken();
    const {agentDispatch} = useAgent();
    const {ships, shipDispatch} = useShip();

    
    //let ship: IShip = ships.find((s) => s.symbol === shipData.symbol) ?? shipData;

    const [ship, setShip] = useState<IShip>(ships.find((s) => s.symbol === shipData.symbol) ?? shipData);
    const [flightModeState, setFlightModeState] = useState<string>(ship?.nav?.flightMode?.toString() ?? "");
    const [currentNavPoint, setCurrentNavPoint] = useState<string>(ship?.nav?.waypointSymbol ?? "");
    const [showCargo, setShowCargo] = useState<boolean>(true);
    const [update, setUpdate] = useState<string>(ship.symbol + new Date().toString());

    function SetShipNavStatus(navStatus: ShipNavStatus)
    {
        ship.nav.status = navStatus;
        //setShip({ ...ship, nav: ship.nav});
        //shipDispatch({type: "update", ship: ship});
        setUpdate(ship.symbol + new Date().toString());
    }

    function ResetCooldown()
    {
        ship.cooldown = undefined;
        //setShip({ ...ship, cooldown: undefined});
        setUpdate(ship.symbol + new Date().toString());
    }

    function ShowSystem(){
        if (systemCallback === undefined) return;

        systemCallback(ship.nav.systemSymbol);
    }

    const patchShipNav = async (shipSymbol: string, flightMode: string) => 
    {
        const response: any = await PatchFlightModeAsync(token, shipSymbol, flightMode);

        if (response === null){
            return;
        }

        let shipNav: IShipNav = response;

        let tempShip: IShip = ship;

        tempShip.nav = shipNav;

        setShip(tempShip);


        setFlightModeState(ship.nav.flightMode.toString());
        setUpdate(ship.symbol + new Date().toString());
    };

    function SetFlightMode(event: any)
    {
        let flightMode: string = event.target.value;
        setFlightModeState(flightMode);
        patchShipNav(ship.symbol, flightMode);
    }

    const NavShipToWaypoint = async (shipSymbol: string, waypointSymbol: string) => 
    {
        if (shipSymbol === "" || waypointSymbol === "") return;

        const response: any = await NavigateShipAsync(token, shipSymbol, waypointSymbol);

        if (response === null){
            return;
        }

        let navData: INavigate = response;

        let tempShip: IShip = ship;

        ship.nav = navData.nav;
        ship.fuel = navData.fuel;

        setCurrentNavPoint(ship.nav.route.destination.symbol);
        setUpdate(ship.symbol + new Date().toString());
    };

    function NavigateShip()
    {
        NavShipToWaypoint(ship.symbol, currentNavPoint);
    }

    const DockOrOrbitShip = async (shipSymbol: string, shipNavStatus: ShipNavStatus) => 
    {
        if (shipNavStatus.toString() === ShipNavStatus[ShipNavStatus.IN_TRANSIT]) return;

        let response: any = null;

        if (shipNavStatus.toString() === ShipNavStatus[ShipNavStatus.IN_ORBIT]){

            response = await DockShipAsync(token, shipSymbol);
        }

        if (shipNavStatus.toString() === ShipNavStatus[ShipNavStatus.DOCKED]){

            response = await OrbitShipAsync(token, shipSymbol);
        }

        if (response === null){
            return;
        }

        let shipNav: IShipNav  = response;

        //let tempShip: IShip = ship;

        ship.nav = shipNav;

        //setShip(tempShip);
        setUpdate(ship.symbol + new Date().toString());
    };

    function DockOrOrbit()
    {
        DockOrOrbitShip(ship.symbol, ship.nav.status);
    }

    function Survey(event: any)
    {
        
    }

    const ExtractRessources = async (shipSymbol: string, survey?: ISurvey) => 
    {
        if (shipSymbol === "") return;

        const response = await ExtractRessourcesAsync(token, shipSymbol, survey);


        if (response === null){
            return;
        }

        let extractionResult: IExtractionResult  = response;

        ship.cargo = extractionResult.cargo;
        ship.cooldown = extractionResult.cooldown;

        //setShip({...ship, cargo: extractionResult.cargo, cooldown: extractionResult.cooldown});
        setUpdate(ship.symbol + new Date().toString());
    };
    
    function Extract(event: any)
    {
        ExtractRessources(ship.symbol);
    }
    
    const RefuelShip = async (shipSymbol: string) => 
    {
        const response: any = await RefuelShipAsync(token, shipSymbol);

        if (response === null){
            return;
        }

        let refuelData: IRefuel = response;

        agentDispatch({agent: refuelData.agent});

        let tempShip: IShip = ship;

        tempShip.fuel = refuelData.fuel;

        setShip(tempShip);
    };

    function Refuel()
    {
        RefuelShip(ship.symbol);
    }

    function ScanSystem(event: any)
    {

    }
    
    function ScanWaypoint(event: any)
    {

    }

    function ScanShips(event: any)
    {

    }

    function ChartWaypoint(event: any)
    {
    }


    return (
        <div key={update} className={shipdiv + (active ? " border-orange-500" : " border-indigo-500/50 hover:border-indigo-500")}>
            <div onClick={() => callback(ship)}>
                <p className="text-orange-500 font-bold">{ship.symbol} ({ship?.registration.role} {ship.frame.name.replace("Frame ", "")})</p>
                <p key={ship.nav.status} className="text-orange-500 font-bold text-xs"><i>-{ship?.nav?.status}-</i> {ship?.nav?.route?.destination?.symbol}
                    {ship.nav.status === ShipNavStatus.IN_TRANSIT ? " - arival in " : ""}
                    {ship.nav.status === ShipNavStatus.IN_TRANSIT && <Timer 
                        start={(new Date(ship?.nav.route.arrival).getTime() - Math.min(new Date().getTime(), new Date(ship?.nav.route.arrival).getTime()))/1000} 
                        callback={() => SetShipNavStatus(ShipNavStatus.IN_ORBIT)}/>}
                </p>
            </div>

            { ship.cooldown && <p key={ship?.cooldown?.remainingSeconds ?? ship.symbol} className="font-bold text-orange-800 ">Cooldown: <Timer 
                        start={(new Date(ship.cooldown.expiration).getTime() - Math.min(new Date().getTime(), new Date(ship.cooldown.expiration).getTime()))/1000}
                        callback={ResetCooldown}/>
            </p>}

            {(ship.fuel.capacity > 0 || ship.cargo.capacity > 0) && <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>}
            {ship.fuel.capacity > 0 && <p>{shortFuelSymbol} {ship.fuel.current} / {ship.fuel.capacity}</p>}
            {ship.cargo.capacity > 0 && <div>
                <p className="border border-none rounded-lg hover:bg-slate-700" onClick={() => setShowCargo(!showCargo)}>{shortCargoSymbol} {ship.cargo.units} / {ship.cargo.capacity}</p>
                {showCargo && <ul className="list-disc list-inside pl-[0.2em] flex flex-col gap-2 marker:text-orange-500">
                    {ship.cargo.inventory.map((cargoItem) => 
                        <li key={cargoItem.symbol}>{cargoItem.name} - {cargoItem.units} 
                        <span className="justify-self-end">[{waresValueData.get(cargoItem.symbol)?.sellMax} - {waresValueData.get(cargoItem.symbol)?.bestSellAt.split('-')[2]}]</span></li>
                    )}
                </ul>}
            </div>}

            {showActions && active && <div>
                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <div className="grid grid-cols-2 gap-[0.5em]">
                    <button className={buttonClass} disabled={ship?.nav.status.toString() === ShipNavStatus.IN_TRANSIT}
                    onClick={DockOrOrbit}>
                        {ship?.nav.status.toString() === ShipNavStatus.IN_ORBIT ? "Dock" : "Orbit"}
                    </button>
                </div>

                <div className="grid grid-cols-[70%_30%] gap-[0.5em] mx-[0.1em] my-[0.3em]">
                    <select className={selectClass} value={currentNavPoint} onChange={e => setCurrentNavPoint(e.target.value)}>
                        {currentSystemWaypoints?.map((wp) =>
                            <option key={wp.symbol} value={wp.symbol}>{wp.type === ShipNavWaypointType[ShipNavWaypointType.MOON] || 
                                wp.type === ShipNavWaypointType[ShipNavWaypointType.ORBITAL_STATION] ? " - " : "" }{wp.type} {wp.symbol.replace(wp.systemSymbol, "")}</option>
                        )}
                    </select>
                    <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus.IN_ORBIT} onClick={() => NavigateShip()}>go To</button>
                </div>
                {currentNavPoint != ship.nav.waypointSymbol && <p><span>
                    {shortFuelSymbol} -{CalculateFuelConsumption(ship, currentSystemWaypoints?.find((wp) => wp.symbol === ship.nav.waypointSymbol), 
                    currentSystemWaypoints?.find((wp) => wp.symbol === currentNavPoint))}
                </span> <span>{shortTimerSymbol} {CalculateTravelTime(ship, currentSystemWaypoints?.find((wp) => wp.symbol === ship.nav.waypointSymbol), 
                    currentSystemWaypoints?.find((wp) => wp.symbol === currentNavPoint))}
                </span></p>}

                <select className={selectClass} value={flightModeState} onChange={SetFlightMode}>
                    <option value={ShipNavFlightMode.BURN}>{ShipNavFlightMode.BURN}</option>
                    <option value={ShipNavFlightMode.CRUISE}>{ShipNavFlightMode.CRUISE}</option>
                    <option value={ShipNavFlightMode.DRIFT}>{ShipNavFlightMode.DRIFT}</option>
                    <option value={ShipNavFlightMode.STEALTH}>{ShipNavFlightMode.STEALTH}</option>
                </select>

                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <div className="grid grid-cols-2 gap-[0.5em]">
                    <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus.IN_ORBIT ||
                        ship?.nav.route.destination.type.toString() != ShipNavWaypointType[ShipNavWaypointType.ASTEROID_FIELD] ||
                        ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_SURVEYOR])) === -1 ||
                        ship.cooldown != undefined}>
                        Survey</button>
                    <button className={buttonClass} disabled={
                        ship?.nav.status.toString() != ShipNavStatus.IN_ORBIT || 
                        ship?.nav.route.destination.type.toString() != ShipNavWaypointType[ShipNavWaypointType.ASTEROID_FIELD] ||
                        ship?.cargo.units === ship?.cargo.capacity ||
                        ship?.modules.findIndex(m => m.symbol.toString().startsWith(ShipModuleSymbol[ShipModuleSymbol.MODULE_MINERAL_PROCESSOR_I])) === -1 || 
                        (ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_GAS_SIPHON])) === -1 &&
                        ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_MINING_LASER])) === -1) ||
                        ship.cooldown != undefined}
                        onClick={Extract}>
                        Extract</button>
                </div>

                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <div className="grid grid-cols-2 gap-[0.5em]">
                    <button className={buttonClass} disabled={ship?.nav?.status?.toString() != ShipNavStatus.DOCKED ||
                        currentSystemWaypoints?.find((wp) =>  wp.symbol === ship.nav.waypointSymbol && wp.traits.find((t) => t.symbol.toString() === "MARKETPLACE")) === undefined ||
                        ship?.fuel.current === ship?.fuel.capacity}
                        onClick={Refuel}>
                    Refuel</button>
                </div>

                <hr className="border-orange-500 mx-[0.1em] my-[0.3em]"/>
                <div className="grid grid-cols-2 grid-rows-2 gap-x-[0.5em]">
                    <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus.IN_ORBIT ||
                    ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_SENSOR_ARRAY])) === -1}>
                    Scan System</button>

                    <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus[ShipNavStatus.IN_ORBIT] ||
                    ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_SENSOR_ARRAY])) === -1}>
                    Scan Waypoint</button>

                    <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus[ShipNavStatus.IN_ORBIT] ||
                    ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_SENSOR_ARRAY])) === -1}>
                    Scan Ships</button>

                    <button className={buttonClass} disabled={ship?.nav.status.toString() != ShipNavStatus[ShipNavStatus.IN_ORBIT] ||
                    ship?.mounts.findIndex(m => m.symbol.toString().startsWith(ShipMountSymbol[ShipMountSymbol.MOUNT_SENSOR_ARRAY])) === -1 ||
                    currentSystemWaypoints?.find((wp) => wp.symbol === ship.nav.waypointSymbol && wp.traits.find((t) => t.symbol.toString() === "UNCHARTED")) != undefined}>
                    Chart</button>
                </div>
            </div>}

            {!showActions && <div>
                <button className={buttonClass} onClick={ShowSystem}>System</button>
            </div>}
        </div>
    )
}