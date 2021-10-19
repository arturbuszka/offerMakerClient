import { Client } from "../clientModel";
import { ProductPdf } from "./productPdfModel";

export interface OfferPdf {
    id: number
    clientId: number
    city: string
    street: string
    postalCode: string
    dateOfWork: Date;
    description: string
    productsCount: number
    productsPrice: number
    products: ProductPdf[]
    created?: string
    client: Client;
};