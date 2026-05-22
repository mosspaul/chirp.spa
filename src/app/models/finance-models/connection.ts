import { Account } from "./account";

export interface Connection {
    id: Number,
    user_id: string,
    name: string,
    url: string,
    accounts: Account[]
}