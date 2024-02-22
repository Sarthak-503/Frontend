
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import {ActivatedRoute} from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { throwError } from 'rxjs';
import { AuthStateService } from 'src/app/shared/auth-state.service';
@Component({
  selector: 'app-changepasswordadmin',
  templateUrl: './changepasswordadmin.component.html',
  styleUrls: ['./changepasswordadmin.component.css']
})
export class ChangepasswordadminComponent {
  changePasswordForm: FormGroup;
  loginerror=false;
  errors = null;
  emailerror:boolean=false;
  passworderror:boolean=false;
  constructor(
    public fb: FormBuilder,
    route: ActivatedRoute,
    public authService: AuthService,
    private authState:AuthStateService,
  ) {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: ['']
    })
  }
 
  ngOnInit(): void {
    // this.authState.setAuthState(true);
  }
  rmverror(){
    this.emailerror=false;
    this.passworderror=false;
  }
  onSubmit(){
    // this.changePasswordForm.controls['passwordToken'].setValue(this.dataofuser.TokenInsideLogin);
    // console.log(this.changePasswordForm.value.email);
    // console.log(this.dataofuser.Email);
    // if(this.changePasswordForm.value.email!=this.dataofuser.Email){
    //   this.emailerror=true;
    //   return;
    // } 

if(this.changePasswordForm.value.password!=this.changePasswordForm.value.password_confirmation){
      this.passworderror=true;
      return;
    }
    // auth.setAuthState(false)
    this.authService.changeadminpassword(this.changePasswordForm.value).subscribe(
      (result) => {
        // console.log(result);
        alert('Password has been updated');
        this.changePasswordForm.reset();
      },
      // error => {
      //   this.handleError(error);
      // }
    );
  }
 
}
