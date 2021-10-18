import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfferPdf } from '../models/offerPdfModel';


@Injectable({
  providedIn: 'root'
})
export class PdfConvertService {

  constructor(private http:HttpClient) { }
  readonly apiURL = 'https://localhost:5001';

  generatePdf(off: OfferPdf) {
    return this.http.post(`${this.apiURL}/offer/pdf`, off)
  }

  getPdf(id: number) {
    return this.http.get(`${this.apiURL}/offer/pdf/${id}`, {responseType: 'blob' })
  }
}
