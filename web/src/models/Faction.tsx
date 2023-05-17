export interface Faction 
{
    symbol: string
    name: string
    description: string
    headquarters: string
    traits: FactionTrait[]
}

interface FactionTrait 
{
    symbol: Trait
    name: string
    description: string
}

enum Trait {
    "BUREAUCRATIC",
    "SECRETIVE",
    "CAPITALISTIC",
    "INDUSTRIOUS",
    "PEACEFUL",
    "DISTRUSTFUL",
    "WELCOMING",
    "SMUGGLERS",
    "SCAVENGERS",
    "REBELLIOUS",
    "EXILES",
    "PIRATES",
    "RAIDERS",
    "CLAN",
    "GUILD",
    "DOMINION",
    "FRINGE",
    "FORSAKEN",
    "ISOLATED",
    "LOCALIZED",
    "ESTABLISHED",
    "NOTABLE",
    "DOMINANT",
    "INESCAPABLE",
    "INNOVATIVE",
    "BOLD",
    "VISIONARY",
    "CURIOUS",
    "DARING",
    "EXPLORATORY",
    "RESOURCEFUL",
    "FLEXIBLE",
    "COOPERATIVE",
    "UNITED",
    "STRATEGIC",
    "INTELLIGENT",
    "RESEARCH_FOCUSED",
    "COLLABORATIVE",
    "PROGRESSIVE",
    "MILITARISTIC",
    "TECHNOLOGICALLY_ADVANCED",
    "AGGRESSIVE",
    "IMPERIALISTIC",
    "TREASURE_HUNTERS",
    "DEXTEROUS",
    "UNPREDICTABLE",
    "BRUTAL",
    "FLEETING",
    "ADAPTABLE",
    "SELF_SUFFICIENT",
    "DEFENSIVE",
    "PROUD",
    "DIVERSE",
    "INDEPENDENT",
    "SELF_INTERESTED",
    "FRAGMENTED",
    "COMMERCIAL",
    "FREE_MARKETS",
    "ENTREPRENEURIAL"
}
