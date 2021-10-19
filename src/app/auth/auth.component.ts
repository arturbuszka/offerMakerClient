import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { loginUser } from '../shared/identity/user/loginUserModel';
import { UserService } from '../shared/identity/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form! : FormGroup
  user!: loginUser

  constructor(public _userService: UserService, public _fb: FormBuilder, public _router: Router) { }

  ngOnInit() {
    this.form = this._fb.group({
      username: ['']
    })
  };

  onSubmit() {
    const convertedForm = Object.assign(this.form.value, this.user)
    this.postUserInfo(convertedForm)

  }


  postUserInfo(userDetails: loginUser) {
    this._userService.postOffer(userDetails).subscribe((res) => {
        localStorage.setItem("token", res.token);
        window.location.href="/offer"
    });
  }
}
