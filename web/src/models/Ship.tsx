export interface ShipModel {
    symbol: string
    registration: ShipRegistration
    nav: ShipNav
    crew: ShipCrew
    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine
    modules: ShipModule[]
    mounts: ShipMount[]
    cargo: ShipCargo
    fuel: ShipFuel
  }
  
interface ShipRegistration {
    name: string
    factionSymbol: string
    role: ShipRole
  }

enum ShipRole {
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
  
interface ShipNav {
    systemSymbol: string
    waypointSymbol: string
    route: ShipNavRoute
    status: ShipNavStatus
    flightMode: ShipNavFlightMode
  }

enum ShipNavStatus {
    "IN_TRANSIT",
    "IN_ORBIT",
    "DOCKED"
}

enum ShipNavFlightMode {
    "DRIFT",
    "STEALTH",
    "CRUISE",
    "BURN"
}
  
interface ShipNavRoute {
    destination: ShipDestination
    departure: ShipDeparture
    departureTime: string
    arrival: string
  }
  
interface ShipDestination {
    symbol: string
    type: ShipNavWaypointType
    systemSymbol: string
    x: number
    y: number
}
  
interface ShipDeparture {
    symbol: string
    type: ShipNavWaypointType
    systemSymbol: string
    x: number
    y: number
}

enum ShipNavWaypointType {
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
  
interface ShipCrew {
    current: number
    required: number
    capacity: number
    rotation: ShipCrewRotation
    morale: number
    wages: number
  }

enum ShipCrewRotation {
    "STRICT",
    "RELAXED"
}
  
interface ShipFrame {
    symbol: ShipFrameSymbol
    name: string
    description: string
    condition: number
    moduleSlots: number
    mountingPoints: number
    fuelCapacity: number
    requirements: ShipRequirements
  }

enum ShipFrameSymbol {
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

interface ShipReactor {
    symbol: ShipReactorSymbol
    name: string
    description: string
    condition: number
    powerOutput: number
    requirements: ShipRequirements
  }
enum ShipReactorSymbol {
    "REACTOR_SOLAR_I",
    "REACTOR_FUSION_I",
    "REACTOR_FISSION_I",
    "REACTOR_CHEMICAL_I",
    "REACTOR_ANTIMATTER_I"
}
  
interface ShipEngine {
    symbol: ShipEngineSymbol
    name: string
    description: string
    condition: number
    speed: number
    requirements: ShipRequirements
  }

enum ShipEngineSymbol {
    "ENGINE_IMPULSE_DRIVE_I",
    "ENGINE_ION_DRIVE_I",
    "ENGINE_ION_DRIVE_II",
    "ENGINE_HYPER_DRIVE_I"
  }
  
interface ShipModule {
    symbol: ShipModuleSymbol
    capacity: number
    range: number
    name: string
    description: string
    requirements: ShipRequirements
  }

enum ShipModuleSymbol{
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

interface ShipMount {
    symbol: ShipMountSymbol
    name: string
    description: string
    strength: number
    deposits: Deposits[]
    requirements: ShipRequirements
  }

enum ShipMountSymbol {
    "MOUNT_GAS_SIPHON_I",
    "MOUNT_GAS_SIPHON_II",
    "MOUNT_GAS_SIPHON_III",
    "MOUNT_SURVEYOR_I",
    "MOUNT_SURVEYOR_II",
    "MOUNT_SURVEYOR_III",
    "MOUNT_SENSOR_ARRAY_I",
    "MOUNT_SENSOR_ARRAY_II",
    "MOUNT_SENSOR_ARRAY_III",
    "MOUNT_MINING_LASER_I",
    "MOUNT_MINING_LASER_II",
    "MOUNT_MINING_LASER_III",
    "MOUNT_LASER_CANNON_I",
    "MOUNT_MISSILE_LAUNCHER_I",
    "MOUNT_TURRET_I"
}

enum Deposits {
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
  
interface ShipCargo {
    capacity: number
    units: number
    inventory: ShipCargoItem[]
  }
  
interface ShipCargoItem {
    symbol: string
    name: string
    description: string
    units: number
  }
  
interface ShipFuel {
    current: number
    capacity: number
    consumed: FuelConsumed
  }
  
interface FuelConsumed {
    amount: number
    timestamp: string
  }

interface ShipRequirements {
    power: number
    crew: number
    slots: number
  }
  
  