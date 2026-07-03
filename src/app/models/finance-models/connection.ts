import { Account } from "./account";

export interface Connection {
    id: Number,
    userId: string,
    name: string,
    url: string,
    accounts: Account[]
}