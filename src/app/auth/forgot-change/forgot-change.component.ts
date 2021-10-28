import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/identity/user.service';
import { ChangeUserPasswordModel } from 'src/app/shared/identity/user/changeUserPasswordModel';

@Component({
  selector: 'app-forgot-change',
  templateUrl: './forgot-change.component.html',
  styleUrls: ['./forgot-change.component.css']
})
export class ForgotChangeComponent implements OnInit {


form!: FormGroup
securityStamp!: string;
id!: string;


  constructor(public _router: ActivatedRoute, public _userService: UserService, public _fb: FormBuilder) { }

  ngOnInit() {
    this.securityStamp = this._router.snapshot.params.guid;
    this.id = this._router.snapshot.params.id;

    this.form = this._fb.group({
      userId: [''],
      guid: [''],
      passwords: this._fb.group({
        userPassword: [''],
        confirmPassword: ['']
      })
    })
  }


  onSubmit() {
    var user: ChangeUserPasswordModel = {
      userId: this.id,
      securityStamp: this.securityStamp,
      password: this.form.controls['passwords'].get("userPassword")?.value
    };
    this.post(user)
  }

  post(user: ChangeUserPasswordModel) {
    this._userService.postChangePassword(user).subscribe((res) => {

    })
  }

}
