import { Agent } from '@/models/Agent';
import { ISavedMarketData, ISavedShipyardData } from '@/models/ContextModels';
import { IContract } from '@/models/Contract';
import { IFaction } from '@/models/Faction';
import { IShip } from '@/models/Ship';
import { ISystem } from '@/models/System';
import { createContext, useReducer } from 'react';


export const AgentContext = createContext<Agent>(new Agent);
export const ShipContext = createContext<IShip[]>([]);
export const ContractContext = createContext<IContract[]>([]);
export const FactionContext = createContext<IFaction[]>([]);
export const UniverseContext = createContext<ISystem[]>([]);
export const MarketContext = createContext<ISavedMarketData[]>([]);
export const ShipyardContext = createContext<ISavedShipyardData[]>([]);