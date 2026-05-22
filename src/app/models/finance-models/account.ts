import { Holding } from "./holding";
import { Transaction } from "./transaction";

export interface Account {
    id: Number,
    balance: Number,
    currency: string,
    name: string,
    transactions: Transaction[],
    holdings: Holding[],
    avaliable_balance: Number,
    balance_date: Date
}