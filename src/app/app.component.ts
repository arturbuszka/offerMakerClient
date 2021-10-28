import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/identity/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OfferMakerCGG';

  isLogged: boolean = false;


  constructor(public _userService: UserService, public _router: Router) { }

  ngOnInit() {
    if (this._userService.getToken() != null) {
      this.isLogged = true;
    }
  }



}




