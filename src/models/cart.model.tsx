export interface ProductCart {
    productId: string,
    qty: number
}

export interface Cart {
    id: string,
    userId: string,
    products: ProductCart[]
}