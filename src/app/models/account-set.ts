import { Account } from "./account";
import { Connection } from "./connection";
import {Error} from "./error";

export interface AccountSet {
    errlist: Error[],
    accounts: Account[],
    connections: Connection[]
}