export interface Transaction {
    id: Number,
    posted: Date, 
    amount: Number,
    description: string,
    memo: string,
    payee: string,
    transactedAt: Date
}