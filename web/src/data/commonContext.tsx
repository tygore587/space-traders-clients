import { Agent } from '@/models/Agent';
import { ISavedMarketData, ISavedShipyardData } from '@/models/ContextModels';
import { IContract } from '@/models/Contract';
import { IFaction } from '@/models/Faction';
import { IShip } from '@/models/Ship';
import { ISystem } from '@/models/System';
import { Dispatch, createContext, useContext, useReducer } from 'react';


export const TokenContext = createContext<{token: string, tokenDispatch: Dispatch<any>}>({token: "", tokenDispatch: () => null})
export const AgentContext = createContext<{agent: Agent, agentDispatch: Dispatch<any>}>({agent: null!, agentDispatch: () => null});
export const ShipContext = createContext<{ships: IShip[], shipDispatch: Dispatch<any>}>({ships: [], shipDispatch: () => null});
export const ContractContext = createContext<{contracts: IContract[], contractDispatch: Dispatch<any>}>({contracts: [], contractDispatch: () => null});
export const FactionContext = createContext<{factions: IFaction[], factionDispatch: Dispatch<any>}>({factions: [], factionDispatch: () => null});
export const UniverseContext = createContext<{universe: ISystem[], universeDispatch: Dispatch<any>}>({universe: [], universeDispatch: () => null});
export const MarketContext = createContext<{marketData: Map<string, ISavedMarketData>, marketDataDispatch: Dispatch<any>}>({marketData: new Map<string, ISavedMarketData>(), marketDataDispatch: () => null});
export const ShipyardContext = createContext<{shipyardData: Map<string, ISavedShipyardData>, shipyardDataDispatch: Dispatch<any>}>({shipyardData: new Map<string, ISavedShipyardData>(), shipyardDataDispatch: () => null});

export const useToken = () => useContext(TokenContext);
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

function tokenReducer(state: string, action: any): string {
  return action.token;
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
        case "update":
          let shipIndex = state.findIndex((s) => s.symbol === action.ship.symbol);

          if (shipIndex >= 0)
            state[shipIndex] = action.ship;
          else
            state.concat(action.ship);

          return state;
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
        case "update":
          let contractIndex: number = state.findIndex((s) => s.id === action.contract.id);

          if (contractIndex >= 0)
            state[contractIndex] = action.contract;
          else
            state.concat(action.contract);

          return state;
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
        case "update":
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
        case "update":
          return state[state.findIndex((s) => s.symbol === action.system.symbol)] = action.system;
        default:
          return state;
      }
}

function marketDataReducer(state: Map<string, ISavedMarketData>, action: any): Map<string, ISavedMarketData> {
  switch (action.type) {
    case "set":
      let savedMarketData: ISavedMarketData = {
        lastUpdate: new Date(),
        marketData: action.market
      }
      return state.set(action.market.symbol, savedMarketData);
    case "remove":
        state.delete(action.market.symbol);
      return state;
    default:
      return state;
  }
}

function shipyardDataReducer(state: Map<string, ISavedShipyardData>, action: any): Map<string, ISavedShipyardData> {
    switch (action.type) {
      case "set":
        let savedShipyardData: ISavedShipyardData = {
          lastUpdate: new Date(),
          shipyardData: action.shipyard
        }
        return state.set(action.shipyard.symbol, savedShipyardData);
      case "remove":
          state.delete(action.shipyard.symbol);
        return state;
      default:
        return state;
    }
}

export const DataProvider = ({ children, agentInit, shipInit, contractInit, factionInit, universeInit }:IDataProvider) => {

    const [token, tokenDispatch] = useReducer(tokenReducer, "");
    const [agent, agentDispatch] = useReducer(agentReducer, agentInit);
    const [ships, shipDispatch] = useReducer(shipReducer, shipInit);
    const [contracts, contractDispatch] = useReducer(contractReducer, contractInit);
    const [factions, factionDispatch] = useReducer(factionReducer, factionInit);
    const [universe, universeDispatch] = useReducer(universeReducer, universeInit);
    const [marketData, marketDataDispatch] = useReducer(marketDataReducer, new Map<string, ISavedMarketData>());
    const [shipyardData, shipyardDataDispatch] = useReducer(shipyardDataReducer, new Map<string, ISavedShipyardData>());

    return (
      <TokenContext.Provider value={{token, tokenDispatch}}>
        <AgentContext.Provider value={{agent, agentDispatch}}>
          <ShipContext.Provider value={{ships, shipDispatch}}>
            <ContractContext.Provider value={{contracts, contractDispatch}}>
              <FactionContext.Provider value={{factions, factionDispatch}}>
                <UniverseContext.Provider value={{universe, universeDispatch}}>
                  <MarketContext.Provider value={{marketData, marketDataDispatch}}>
                    <ShipyardContext.Provider value={{shipyardData, shipyardDataDispatch}}>
                      {children}
                    </ShipyardContext.Provider>
                  </MarketContext.Provider>
                </UniverseContext.Provider>
              </FactionContext.Provider>
            </ContractContext.Provider>
          </ShipContext.Provider>
        </AgentContext.Provider>
      </TokenContext.Provider>
    );
  }