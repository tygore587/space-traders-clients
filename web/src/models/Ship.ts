import { Agent } from "./Agent"
import { ITransaction } from "./Market"

export interface IShip {
    symbol: string
    registration: IShipRegistration
    nav: IShipNav
    crew: IShipCrew
    frame: IShipFrame
    reactor: IShipReactor
    engine: IShipEngine
    modules: IShipModule[]
    mounts: IShipMount[]
    cargo: IShipCargo
    fuel: IShipFuel
    cooldown?: ICooldown
  }
  
export interface IShipRegistration {
    name: string
    factionSymbol: string
    role: ShipRole
  }

export enum ShipRole {
    "FABRICATOR",
    "HARVESTER",
    "HAULER",
    "INTERCEPTOR",
    "EXCAVATOR",
    "TRANSPORT",
    "REPAIR",
    "SURVEYOR",
    "COMMAND",
    "CARRIER",
    "PATROL",
    "SATELLITE",
    "EXPLORER",
    "REFINERY"
}
  
export interface IShipNav {
    systemSymbol: string
    waypointSymbol: string
    route: IShipNavRoute
    status: ShipNavStatus
    flightMode: ShipNavFlightMode
  }

export enum ShipNavStatus {
    "IN_TRANSIT" = "IN_TRANSIT",
    "IN_ORBIT" = "IN_ORBIT",
    "DOCKED" = "DOCKED"
}

export enum ShipNavFlightMode {
    "DRIFT" = "DRIFT",
    "STEALTH" = "STEALTH",
    "CRUISE" = "CRUISE",
    "BURN" = "BURN"
}
  
export interface IShipNavRoute {
    destination: IShipDestination
    departure: IShipDeparture
    departureTime: string
    arrival: string
  }
  
export interface IShipDestination {
    symbol: string
    type: ShipNavWaypointType
    systemSymbol: string
    x: number
    y: number
}
  
export interface IShipDeparture {
    symbol: string
    type: ShipNavWaypointType
    systemSymbol: string
    x: number
    y: number
}

export enum ShipNavWaypointType {
    "PLANET",
    "GAS_GIANT",
    "MOON",
    "ORBITAL_STATION",
    "JUMP_GATE",
    "ASTEROID_FIELD",
    "NEBULA",
    "DEBRIS_FIELD",
    "GRAVITY_WELL"
}
  
export interface IShipCrew {
    current: number
    required: number
    capacity: number
    rotation: ShipCrewRotation
    morale: number
    wages: number
  }

export enum ShipCrewRotation {
    "STRICT",
    "RELAXED"
}
  
export interface IShipFrame {
    symbol: ShipFrameSymbol
    name: string
    description: string
    condition: number
    moduleSlots: number
    mountingPoints: number
    fuelCapacity: number
    requirements: IShipRequirements
  }

export enum ShipFrameSymbol {
    "FRAME_PROBE",
    "FRAME_DRONE",
    "FRAME_INTERCEPTOR",
    "FRAME_RACER",
    "FRAME_FIGHTER",
    "FRAME_FRIGATE",
    "FRAME_SHUTTLE",
    "FRAME_EXPLORER",
    "FRAME_MINER",
    "FRAME_LIGHT_FREIGHTER",
    "FRAME_HEAVY_FREIGHTER",
    "FRAME_TRANSPORT",
    "FRAME_DESTROYER",
    "FRAME_CRUISER",
    "FRAME_CARRIER"
}

export interface IShipReactor {
    symbol: ShipReactorSymbol
    name: string
    description: string
    condition: number
    powerOutput: number
    requirements: IShipRequirements
  }

export enum ShipReactorSymbol {
    "REACTOR_SOLAR_I",
    "REACTOR_FUSION_I",
    "REACTOR_FISSION_I",
    "REACTOR_CHEMICAL_I",
    "REACTOR_ANTIMATTER_I"
}
  
export interface IShipEngine {
    symbol: ShipEngineSymbol
    name: string
    description: string
    condition: number
    speed: number
    requirements: IShipRequirements
  }

export enum ShipEngineSymbol {
    "ENGINE_IMPULSE_DRIVE_I",
    "ENGINE_ION_DRIVE_I",
    "ENGINE_ION_DRIVE_II",
    "ENGINE_HYPER_DRIVE_I"
  }
  
export interface IShipModule {
    symbol: ShipModuleSymbol
    capacity: number
    range: number
    name: string
    description: string
    requirements: IShipRequirements
  }

export enum ShipModuleSymbol{
    "MODULE_MINERAL_PROCESSOR_I",
    "MODULE_CARGO_HOLD_I",
    "MODULE_CREW_QUARTERS_I",
    "MODULE_ENVOY_QUARTERS_I",
    "MODULE_PASSENGER_CABIN_I",
    "MODULE_MICRO_REFINERY_I",
    "MODULE_ORE_REFINERY_I",
    "MODULE_FUEL_REFINERY_I",
    "MODULE_SCIENCE_LAB_I",
    "MODULE_JUMP_DRIVE_I",
    "MODULE_JUMP_DRIVE_II",
    "MODULE_JUMP_DRIVE_III",
    "MODULE_WARP_DRIVE_I",
    "MODULE_WARP_DRIVE_II",
    "MODULE_WARP_DRIVE_III",
    "MODULE_SHIELD_GENERATOR_I",
    "MODULE_SHIELD_GENERATOR_II"
}

export interface IShipMount {
    symbol: ShipMountSymbol
    name: string
    description: string
    strength: number
    deposits: Deposits[]
    requirements: IShipRequirements
  }

export enum ShipMountSymbol {
    "MOUNT_GAS_SIPHON",
    "MOUNT_GAS_SIPHON_I",
    "MOUNT_GAS_SIPHON_II",
    "MOUNT_GAS_SIPHON_III",
    "MOUNT_SURVEYOR",
    "MOUNT_SURVEYOR_I",
    "MOUNT_SURVEYOR_II",
    "MOUNT_SURVEYOR_III",
    "MOUNT_SENSOR_ARRAY",
    "MOUNT_SENSOR_ARRAY_I",
    "MOUNT_SENSOR_ARRAY_II",
    "MOUNT_SENSOR_ARRAY_III",
    "MOUNT_MINING_LASER",
    "MOUNT_MINING_LASER_I",
    "MOUNT_MINING_LASER_II",
    "MOUNT_MINING_LASER_III",
    "MOUNT_LASER_CANNON_I",
    "MOUNT_MISSILE_LAUNCHER_I",
    "MOUNT_TURRET_I"
}

export enum Deposits {
    "QUARTZ_SAND",
    "SILICON_CRYSTALS",
    "PRECIOUS_STONES",
    "ICE_WATER",
    "AMMONIA_ICE",
    "IRON_ORE",
    "COPPER_ORE",
    "SILVER_ORE",
    "ALUMINUM_ORE",
    "GOLD_ORE",
    "PLATINUM_ORE",
    "DIAMONDS",
    "URANITE_ORE",
    "MERITIUM_ORE"
}
  
export interface IShipCargo {
    capacity: number
    units: number
    inventory: IShipCargoItem[]
  }
  
export interface IShipCargoItem {
    symbol: string
    name: string
    description: string
    units: number
  }
  
export interface IShipFuel {
    current: number
    capacity: number
    consumed: IFuelConsumed
  }
  
export interface IFuelConsumed {
    amount: number
    timestamp: string
  }

export interface IShipRequirements {
    power: number
    crew: number
    slots: number
  }

export interface INavigate {
  fuel: IShipFuel
  nav: IShipNav
}
  
export interface ICooldown {
  shipSymbol: string
  totalSeconds: number
  remainingSeconds: number
  expiration: Date
}

export interface ISurvey {
  signature: string
  symbol: string
  deposits: Deposits[]
  expiration: Date
  size: SurveySize
}
  
export enum SurveySize {
  "SMALL",
  "MODERATE",
  "LARGE"
}

export interface IExtractionResult {
  cooldown: ICooldown
  extraction: IExtraction
  cargo: IShipCargo
}

export interface IExtraction {
  shipSymbol: string
  yield: IYield
}

export interface IYield {
  symbol: string
  units: number
}

export interface IRefuel {
  agent: Agent
  fuel: IShipFuel
  transaction: ITransaction
}

export interface ICargoTransaction {
  agent: Agent
  cargo: IShipCargo
  transaction: ITransaction
}

export interface IJump {
  cooldown: ICooldown
  nav: IShipNav
}