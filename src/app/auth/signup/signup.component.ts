import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/identity/user.service';
import { RegisterUserModel } from 'src/app/shared/identity/user/registerUserModel';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public _fb: FormBuilder, public _userService: UserService) {}

registerForm!: FormGroup
user!: RegisterUserModel


  ngOnInit() { 
    this.registerForm  = this._fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
      passwords: this._fb.group({
        userPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      })
      }, {

        validator: this.confirmPasswordMatch('userPassword', 'confirmPassword')
      }
    );
   }

confirmPasswordMatch(controlName: string, matchingControlName: string) {    
    return (formGroup: FormGroup) => {
        const control = formGroup.controls["passwords"].get(controlName);
        const matchingControl = formGroup.controls["passwords"].get(matchingControlName);
        if (control?.value !== matchingControl?.value) {
            matchingControl?.setErrors({ confirmPasswordMatch: true });
        } else {
            matchingControl?.setErrors(null);
        }
    }
}


  get f() {
    return this.registerForm.controls;
  }
  get userPass() {
    return this.registerForm.controls["passwords"].get("userPassword");
  }
  get conPass() {
    return this.registerForm.controls["passwords"].get("confirmPassword");
  }


  onSubmit() {
    var user: RegisterUserModel = {
      userName: this.registerForm.get("userName")?.value,
      userEmail: this.registerForm.get("userEmail")?.value,
      Password: this.userPass?.value,
      userRole: "Admin"
    };
    const convertedForm = Object.assign(user)
    this._userService.postRegisterUser(convertedForm).subscribe((res) => {
      window.location.href="/account/login"
    });
  }

}
