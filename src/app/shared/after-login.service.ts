import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AfterLoginService {
  constructor(private Token:TokenService){}
  
  // canActivate( route :ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|
  // Observable <boolean> | Promise <boolean>
  // { 
  //   return this.Token.isLoggedIn();
  //  }


  }
