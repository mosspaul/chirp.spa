export interface Holding {
    id: Number,
    shares: Number,
    cost_basis: Number,
    purchase_price: Number,
    market_value: Number,
    description: string,
    currency: string,
    symbol: string,
    created_at: Date,
}