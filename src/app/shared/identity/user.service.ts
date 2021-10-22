import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authResponse } from './user/authResponse';
import { loginUser } from './user/loginUserModel';
import { RegisterUserModel } from './user/registerUserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly apiURL = 'https://localhost:5001';




  // api calls
  postLogin(user: loginUser) {
    return this.http.post<authResponse>(`${this.apiURL}/account/user/login`, user)
  }

  postRegisterUser(user: RegisterUserModel) {
    return this.http.post<any>(`${this.apiURL}/account/user/new`, user)
  }

  // local storage
  public getToken(): string {
    return localStorage?.getItem("token")!;
  }

}
