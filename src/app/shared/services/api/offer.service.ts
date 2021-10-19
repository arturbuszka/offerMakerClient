import { Injectable } from '@angular/core';
import { Offer } from '../../models/offerModel';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Items } from '../../models/itemsModel';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class OfferService {


  constructor(private http:HttpClient) { }
  offer!: Offer
  items!: Items
  readonly apiURL = 'https://localhost:5001';



  // // get all offers method
  // getOffer(pageSize: number, pageNumber: number, sortDirection: string): Observable<Items> {
  //   return this.http.get<Items>(`${this.apiURL}/offer?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=Created&sortDirection=${sortDirection}`);
  // };

  getOffers(searchPhrase: string, pageSize: number, pageNumber: number, sortDirection: string): Observable<Items> {
    return this.http.get<Items>(`${this.apiURL}/offer?searchPhrase=${searchPhrase}&pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=Created&sortDirection=${sortDirection}`);
  };

  getOffer(id: Number): Observable<Offer> {
    return this.http.get<Offer>(`${this.apiURL}/offer/${id}`);
  };

  postOffer(offer: Offer) {
    return this.http.post(`${this.apiURL}/offer`, offer)
  }

  putOffer(offer: Offer) {
    return this.http.put(`${this.apiURL}/offer`, offer)
  }
}
