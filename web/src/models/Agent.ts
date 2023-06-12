export class Agent 
{
    accountId: string
    symbol: string
    headquarters: string
    credits: number

    constructor (accountId: string = "", symbol: string = "", headquarters: string = "", credits: number = 0){
        this.accountId = accountId
        this.symbol = symbol
        this.headquarters = headquarters
        this.credits = credits
    }
}