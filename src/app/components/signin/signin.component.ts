import { Component, OnInit,Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../shared/token.service';
import { Output } from '@angular/core';
import { AuthStateService } from '../../shared/auth-state.service';
import { take } from 'rxjs';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class SigninComponent {

  loginForm: FormGroup;
  errors:any;
  isSignedIn!: boolean;
  comingdata:any;
  statuscode:string="";
  loginerror=false;
  data:any;
  loginornot:string="";
  userdetails:[]=[];
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private builder:FormBuilder,
    private auth: AuthStateService,
  ) {
    this.loginForm = this.fb.group({
      username:['', Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required])]
    });
  }
    //     'username' => 'user@test.com',
        //     'password' => Hash::make('demo@123456')

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
      },
      (error) => {
        if(error.status == 401) {
          alert(error.error.message);
          this.errors = error.error.message;
        } else {
          this.errors = error.error;
        }        
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigate(['home']);
      }
    );
  }
  // Handle response
  responseHandler(result:any) {
    this.token.handleData(result.data.token);
  }


  // onSubmit() {
  //   this.authService.signin(this.loginForm.value).subscribe(
  //       (result)=>{
  //       // console.log(result.data.token);
  //       if(result.status=='200')
  //       {
  //         this.token.handleData(result.data.token);
  //         this.loginForm.reset();
  //         this.authState.setAuthState(true);
  //         this.router.navigate(['home']);
  //       }
  //       else{
  //         this.loginerror=true;
  //         this.router.navigate(['signin']);
  //       }
  //       // this.responseHandler(result);
  //   }

  // )}
  rmverror(){
    this.loginerror=false; 
  }

}