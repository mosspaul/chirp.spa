export interface Holding {
    id: Number,
    shares: Number,
    costBasis: Number,
    purchasePrice: Number,
    marketValue: Number,
    description: string,
    currency: string,
    symbol: string,
    createdAt: Date,
}