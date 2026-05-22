export interface Transaction {
    id: Number,
    posted: Date, 
    amount: Number,
    description: string,
    memo: string,
    payee: string,
    transacted_at: Date
}