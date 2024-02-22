import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: environment.API_URL + 'auth/login',
    register: environment.API_URL + 'auth/register',
  };
  constructor() {}
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  // Handle forget password wala token
  handleData1(token: any) {
    localStorage.setItem('forget_token', token);
  }
  // contains JWT such as a cookie or localStorage.
  getToken() {
    return localStorage.getItem('auth_token');
  } 
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    // console.log(token);
    if (token) {
      return true;}
      else{
        return false;
      }
  }
  // In summary, the isValidToken() function checks whether a given JWT is valid by decoding its payload and verifying that its iss property matches one of the values in the issuer object.
 
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    // return jwtPayload;    
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}