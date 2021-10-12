import { Client } from "./clientModel";
import { Product } from "./productModel";

export interface Offer {
    id: number
    clientId: number
    city: string
    street: string
    postalCode: string
    dateOfWork: Date;
    description: string
    productsCount: number
    productsPrice: number
    products: Product[]
    created: string
    client: Client;
    isCollapsed: boolean;
};