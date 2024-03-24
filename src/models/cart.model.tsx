export interface Cart {
    id: string,
    userId: string,
    products: { productId: string; qty: number }[]
}