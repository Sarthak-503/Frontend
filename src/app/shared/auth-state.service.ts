import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from '../shared/token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  // object that is used to keep track of the authentication state of the user.
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  userAuthState = this.userState.asObservable();
  
  constructor(public token: TokenService) {}
  setAuthState(value: boolean) { 
    this.userState.next(value); 
  }
}
