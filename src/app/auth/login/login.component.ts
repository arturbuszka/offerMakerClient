import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/identity/user.service';
import { loginUser } from 'src/app/shared/identity/user/loginUserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form! : FormGroup
  user!: loginUser

  constructor(public _userService: UserService, public _fb: FormBuilder, public _router: Router) { }

  ngOnInit() {
    this.form = this._fb.group({
      username: ['']
    })
  }

  onSubmit() {
    const convertedForm = Object.assign(this.form.value, this.user)
    this.postUserInfo(convertedForm)

  }


  postUserInfo(userDetails: loginUser) {
    this._userService.postLogin(userDetails).subscribe((res) => {
        localStorage.setItem("token", res.token);
        window.location.href="/offer"
    });
  }

}
