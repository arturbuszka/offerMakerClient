import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/productModel';
import { ProductPdf } from '../models/productPdfModel';

@Injectable({
  providedIn: 'root'
})
export class PdfConvertService {

  constructor(private http:HttpClient) { }
  readonly apiURL = 'https://localhost:5001';

  addProductsToPdfConvert(id: Number, p: ProductPdf[]) {
    return this.http.post(`${this.apiURL}/pdf/new/${id}`, p)
  }

  getPdf(id: Number) {
    return this.http.get(`${this.apiURL}/pdf/new/d/${id}`, {responseType: 'blob' })
  }
}
