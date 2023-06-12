import { IChart } from "./Chart"
import { IFaction } from "./Faction"

export interface IWaypoint {
    symbol: string
    type: string
    systemSymbol: string
    x: number
    y: number
    orbitals: IWaypointOrbital[]
    faction: IFaction
    traits: IWaypointTrait[]
    chart: IChart
  }
  
export interface IWaypointOrbital {
    symbol: string
}

export interface IWaypointTrait {
    symbol: WaypointTraitSymbol
    name: string
    description: string
  }

export enum WaypointTraitSymbol {
    "UNCHARTED",
    "MARKETPLACE",
    "SHIPYARD",
    "OUTPOST",
    "SCATTERED_SETTLEMENTS",
    "SPRAWLING_CITIES",
    "MEGA_STRUCTURES",
    "OVERCROWDED",
    "HIGH_TECH",
    "CORRUPT",
    "BUREAUCRATIC",
    "TRADING_HUB",
    "INDUSTRIAL",
    "BLACK_MARKET",
    "RESEARCH_FACILITY",
    "MILITARY_BASE",
    "SURVEILLANCE_OUTPOST",
    "EXPLORATION_OUTPOST",
    "MINERAL_DEPOSITS",
    "COMMON_METAL_DEPOSITS",
    "PRECIOUS_METAL_DEPOSITS",
    "RARE_METAL_DEPOSITS",
    "METHANE_POOLS",
    "ICE_CRYSTALS",
    "EXPLOSIVE_GASES",
    "STRONG_MAGNETOSPHERE",
    "VIBRANT_AURORAS",
    "SALT_FLATS",
    "CANYONS",
    "PERPETUAL_DAYLIGHT",
    "PERPETUAL_OVERCAST",
    "DRY_SEABEDS",
    "MAGMA_SEAS",
    "SUPERVOLCANOES",
    "ASH_CLOUDS",
    "VAST_RUINS",
    "MUTATED_FLORA",
    "TERRAFORMED",
    "EXTREME_TEMPERATURES",
    "EXTREME_PRESSURE",
    "DIVERSE_LIFE",
    "SCARCE_LIFE",
    "FOSSILS",
    "WEAK_GRAVITY",
    "STRONG_GRAVITY",
    "CRUSHING_GRAVITY",
    "TOXIC_ATMOSPHERE",
    "CORROSIVE_ATMOSPHERE",
    "BREATHABLE_ATMOSPHERE",
    "JOVIAN",
    "ROCKY",
    "VOLCANIC",
    "FROZEN",
    "SWAMP",
    "BARREN",
    "TEMPERATE",
    "JUNGLE",
    "OCEAN",
    "STRIPPED"
}

  