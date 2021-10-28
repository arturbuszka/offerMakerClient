import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './user/authResponse';
import { ChangeUserPasswordModel } from './user/changeUserPasswordModel';
import { ForgotPasswordUserModel } from './user/forgotPasswordUserModel';
import { LoginUser } from './user/loginUserModel';
import { RegisterUserModel } from './user/registerUserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  readonly apiURL = 'https://localhost:5001';


  // api calls
  postLogin(user: LoginUser) {
    return this.http.post<AuthResponse>(`${this.apiURL}/account/user/login`, user)
  }

  postRegisterUser(user: RegisterUserModel) {
    return this.http.post<any>(`${this.apiURL}/account/user/new`, user)
  }

  postForgotPassword(email: ForgotPasswordUserModel) {
    return this.http.post(`${this.apiURL}/account/user/forgot`, email)
  }

  postChangePassword(user: ChangeUserPasswordModel)
  {
    return this.http.post(`${this.apiURL}/account/user/forgot/new/${user.securityStamp}/${user.userId}`, user)
  }

  // local storage
  public getToken(): string {
    return localStorage?.getItem("token")!;
  }

}
