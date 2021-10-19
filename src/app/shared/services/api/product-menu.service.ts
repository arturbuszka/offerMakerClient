import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductMenuService {

  constructor(private http:HttpClient) { }

  products!: Product[];
  readonly apiURL = 'https://localhost:5001';

    // get all products method
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiURL}/product/menu`);
    };
}
