import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  auth: boolean  

  login(username, password) {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('ApiKey',environment.APIKeyHeaderValue)
      this.auth = true;
    } else {
      this.auth = false;
    }
  }
  logOut() {
    sessionStorage.clear();
    this.auth = false;
  }

  isLoggedIn(){
    if (this.auth === true){
      return true;
    } else {
      return false;
    }
  }
}