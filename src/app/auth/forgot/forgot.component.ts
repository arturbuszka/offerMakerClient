import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/identity/user.service';
import { ForgotPasswordUserModel } from 'src/app/shared/identity/user/forgotPasswordUserModel';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

form!: FormGroup;
user!: ForgotPasswordUserModel



  constructor(public _userService: UserService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', [Validators.required]]
    })
  }

  get f()
  {
    return this.form.controls;
  }

  onSubmit() {
    const convertedForm = Object.assign(this.form.value, this.user)
      this.postForm(convertedForm)
  }


  postForm(email: ForgotPasswordUserModel) {
    this._userService.postForgotPassword(email).subscribe((res) => {

    })
  }


}
