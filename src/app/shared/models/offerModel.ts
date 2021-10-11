import { Client } from "./clientModel";
import { Product } from "./productModel";

export interface Offer {
    id: number
    clientId: number
    workCity: string
    workStreet: string
    workPostalCode: string
    workDate: Date;
    totalPrice: number
    description: string
    productsLength: number
    productPrice: number
    products: Product[]
    createdAt: string
    client: Client;
    isCollapsed: boolean;
};