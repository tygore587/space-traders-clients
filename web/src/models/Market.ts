export interface IMarket {
    symbol: string
    exports: ITradeGood[]
    imports: ITradeGood[]
    exchange: ITradeGood[]
    transactions: ITransaction[]
    tradeGoods: IMarketTradeGood[]
  }
  
  export interface ITradeGood {
    symbol: TradeGoodSymbol
    name: string
    description: string
  }

  export enum TradeGoodSymbol {
    "PRECIOUS_STONES",
    "QUARTZ_SAND",
    "SILICON_CRYSTALS",
    "AMMONIA_ICE",
    "LIQUID_HYDROGEN",
    "LIQUID_NITROGEN",
    "ICE_WATER",
    "EXOTIC_MATTER",
    "ADVANCED_CIRCUITRY",
    "GRAVITON_EMITTERS",
    "IRON",
    "IRON_ORE",
    "COPPER",
    "COPPER_ORE",
    "ALUMINUM",
    "ALUMINUM_ORE",
    "SILVER",
    "SILVER_ORE",
    "GOLD",
    "GOLD_ORE",
    "PLATINUM",
    "PLATINUM_ORE",
    "DIAMONDS",
    "URANITE",
    "URANITE_ORE",
    "MERITIUM",
    "MERITIUM_ORE",
    "HYDROCARBON",
    "ANTIMATTER",
    "FERTILIZERS",
    "FABRICS",
    "FOOD",
    "JEWELRY",
    "MACHINERY",
    "FIREARMS",
    "ASSAULT_RIFLES",
    "MILITARY_EQUIPMENT",
    "EXPLOSIVES",
    "LAB_INSTRUMENTS",
    "AMMUNITION",
    "ELECTRONICS",
    "SHIP_PLATING",
    "EQUIPMENT",
    "FUEL",
    "MEDICINE",
    "DRUGS",
    "CLOTHING",
    "MICROPROCESSORS",
    "PLASTICS",
    "POLYNUCLEOTIDES",
    "BIOCOMPOSITES",
    "NANOBOTS",
    "AI_MAINFRAMES",
    "QUANTUM_DRIVES",
    "ROBOTIC_DRONES",
    "CYBER_IMPLANTS",
    "GENE_THERAPEUTICS",
    "NEURAL_CHIPS",
    "MOOD_REGULATORS",
    "VIRAL_AGENTS",
    "MICRO_FUSION_GENERATORS",
    "SUPERGRAINS",
    "LASER_RIFLES",
    "HOLOGRAPHICS",
    "SHIP_SALVAGE",
    "RELIC_TECH",
    "NOVEL_LIFEFORMS",
    "BOTANICAL_SPECIMENS",
    "CULTURAL_ARTIFACTS",
    "REACTOR_SOLAR_I",
    "REACTOR_FUSION_I",
    "REACTOR_FISSION_I",
    "REACTOR_CHEMICAL_I",
    "REACTOR_ANTIMATTER_I",
    "ENGINE_IMPULSE_DRIVE_I",
    "ENGINE_ION_DRIVE_I",
    "ENGINE_ION_DRIVE_II",
    "ENGINE_HYPER_DRIVE_I",
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
    "MODULE_SHIELD_GENERATOR_II",
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
  
  export interface ITransaction {
    waypointSymbol: string
    shipSymbol: string
    tradeSymbol: string
    type: TransactionType
    units: number
    pricePerUnit: number
    totalPrice: number
    timestamp: Date
  }

  export enum TransactionType{
    "PURCHASE",
    "SELL"
  }
  
  export interface IMarketTradeGood {
    symbol: string
    tradeVolume: number
    supply: Supply
    purchasePrice: number
    sellPrice: number
  }

  export enum Supply{
    "SCARCE",
    "LIMITED",
    "MODERATE",
    "ABUNDANT"
  }