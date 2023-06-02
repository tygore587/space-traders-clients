import { Agent } from '@/models/Agent';
import { ISavedMarketData, ISavedShipyardData } from '@/models/ContextModels';
import { IContract } from '@/models/Contract';
import { IFaction } from '@/models/Faction';
import { IShip } from '@/models/Ship';
import { ISystem } from '@/models/System';
import { createContext, useContext, useReducer } from 'react';


export const AgentContext = createContext<any>(null);
export const ShipContext = createContext<any>(null);
export const ContractContext = createContext<any>(null);
export const FactionContext = createContext<any>(null);
export const UniverseContext = createContext<any>(null);
export const MarketContext = createContext<any>(null);
export const ShipyardContext = createContext<any>(null);

export const useAgent = () => useContext(AgentContext);
export const useShip = () => useContext(ShipContext);
export const useContract = () => useContext(ContractContext);
export const useFaction = () => useContext(FactionContext);
export const useUniverse = () => useContext(UniverseContext);
export const useMarket = () => useContext(MarketContext);
export const useShipyard = () => useContext(ShipyardContext);

interface IDataProvider {
    children: any
    agentInit: Agent
    shipInit: IShip[]
    contractInit: IContract[]
    factionInit: IFaction[]
    universeInit: ISystem[]
}

function agentReducer(state: Agent, action: any): Agent {
  return action.agent;
}

function shipReducer(state: IShip[], action: any): IShip[] {
    switch (action.type) {
        case "add":
          return state.concat(action.ship);
        case "remove":
            state.splice(state.findIndex((s) => s.symbol === action.ship.symbol), 1);
          return state;
        case "set":
          return state[state.findIndex((s) => s.symbol === action.ship.symbol)] = action.ship;
        default:
          return state;
      }
}

function contractReducer(state: IContract[], action: any): IContract[] {
    switch (action.type) {
        case "add":
          return state.concat(action.contract);
        case "remove":
            state.splice(state.findIndex((s) => s.id === action.contract.id), 1);
          return state;
        case "set":
          return state[state.findIndex((s) => s.id === action.contract.id)] = action.contract;
        default:
          return state;
      }
}

function factionReducer(state: IFaction[], action: any): IFaction[] {
    switch (action.type) {
        case "add":
          return state.concat(action.faction);
        case "remove":
            state.splice(state.findIndex((s) => s.symbol === action.faction.symbol), 1);
          return state;
        case "set":
          return state[state.findIndex((s) => s.symbol === action.faction.symbol)] = action.faction;
        default:
          return state;
      }
}

function universeReducer(state: ISystem[], action: any): ISystem[] {
    switch (action.type) {
        case "add":
          return state.concat(action.system);
        case "remove":
            state.splice(state.findIndex((s) => s.symbol === action.system.symbol), 1);
          return state;
        case "set":
          return state[state.findIndex((s) => s.symbol === action.system.symbol)] = action.system;
        default:
          return state;
      }
}

function marketDataReducer(state: ISavedMarketData[], action: any): ISavedMarketData[] {
    switch (action.type) {
        case "add":
          return state.concat(action.market);
        case "remove":
            state.splice(state.findIndex((s) => s.marketData.symbol === action.market.symbol), 1);
          return state;
        case "set":
          return state[state.findIndex((s) => s.marketData.symbol === action.market.symbol)] = action.market;
        default:
          return state;
      }
}

function shipyardDataReducer(state: ISavedShipyardData[], action: any): ISavedShipyardData[] {
    switch (action.type) {
        case "add":
          return state.concat(action.shipyard);
        case "remove":
            state.splice(state.findIndex((s) => s.shipyardData.symbol === action.shipyard.symbol), 1);
          return state;
        case "set":
          return state[state.findIndex((s) => s.shipyardData.symbol === action.shipyard.symbol)] = action.shipyard;
        default:
          return state;
      }
}

export const DataProvider = ({ children, agentInit, shipInit, contractInit, factionInit, universeInit }:IDataProvider) => {

    const [agentState, agentDispatch] = useReducer(agentReducer, agentInit);
    const [shipState, shipDispatch] = useReducer(shipReducer, shipInit);
    const [contractState, contractDispatch] = useReducer(contractReducer, contractInit);
    const [factionState, factionDispatch] = useReducer(factionReducer, factionInit);
    const [universeState, universeDispatch] = useReducer(universeReducer, universeInit);
    const [marketDataState, marketDataDispatch] = useReducer(marketDataReducer, []);
    const [shipyardDataState, shipyardDataDispatch] = useReducer(shipyardDataReducer, []);

    return (
      <AgentContext.Provider value={{agentState, agentDispatch}}>
        <ShipContext.Provider value={{shipState, shipDispatch}}>
            <ContractContext.Provider value={{contractState, contractDispatch}}>
                <FactionContext.Provider value={{factionState, factionDispatch}}>
                    <UniverseContext.Provider value={{universeState, universeDispatch}}>
                        <MarketContext.Provider value={{marketDataState, marketDataDispatch}}>
                            <ShipyardContext.Provider value={{shipyardDataState, shipyardDataDispatch}}>
                                {children}
                            </ShipyardContext.Provider>
                        </MarketContext.Provider>
                    </UniverseContext.Provider>
                </FactionContext.Provider>
            </ContractContext.Provider>
        </ShipContext.Provider>
      </AgentContext.Provider>
    );
  }