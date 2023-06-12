import { ISavedMarketData, ISavedShipyardData, IWarePriceValues } from "@/models/ContextModels";
import { IJumpGate } from "@/models/JumpGate";

export const timeTreshold: number = 4;

export const shortHomeSymbol: string = "\uD83C\uDFE0";
export const shortFuelSymbol: string = "\u26FD";
export const shortCargoSymbol: string = "\uD83D\uDCE6";
export const shortEnergySymbol: string = "\u26A1";
export const shortStrengthSymbol: string = "";
export const shortTimerSymbol: string = "\u231B";

export const shortShipSymbol: string = "\uD83D\uDE80";
export const shortMarketSymbol: string = "\u2696";
export const shortShipyardSymbol: string = "\u2693";
export const shortContractSymbol: string = "\u2756";

export const savedMarketData: Map<string, ISavedMarketData> = new Map<string, ISavedMarketData>();
export const savedShipyardData: Map<string, ISavedShipyardData> = new Map<string, ISavedShipyardData>();
export const waresValueData: Map<string, IWarePriceValues> = new Map<string, IWarePriceValues>();

export const savedJumpGateData: Map<string, IJumpGate> = new Map<string, IJumpGate>();