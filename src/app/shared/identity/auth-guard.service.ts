import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public _userService: UserService, public _router: Router) { }

  canActivate(): boolean {
    if (this._userService.getToken() == null) {
      this._router.navigate(['account/login'])
      return false
    }
    return true
  }
  
}


