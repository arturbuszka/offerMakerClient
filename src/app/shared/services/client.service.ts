import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Client } from '../models/clientModel';



@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  client!: Client
  clientNew!: Client;
  readonly apiURL = 'https://localhost:5001';

    // get all clients method
    getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiURL}/client`);
    };
  
    getClient(id: Number): Observable<Client> {
      return this.http.get<Client>(`${this.apiURL}/client/${id}`);
    };

    postClient(client: Client) {
      return this.http.post<Client>(`${this.apiURL}/client`, client)
    }

    putClient(id: Number, clientNew: Client) {
      return this.http.put<Client>(`${this.apiURL}/client/edit/${id}`, clientNew)
    }

    deleteClient(id: Number) {
      return this.http.delete<Client>(`${this.apiURL}/delete/${id}`)
    }




}
