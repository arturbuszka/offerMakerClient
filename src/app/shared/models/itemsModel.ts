import { Offer } from "./offerModel";

export interface Items {
    items: Offer[],
    itemsFrom: number,
    itemsTo: number,
    totalItemsCount: number,
    totalPages: number
}