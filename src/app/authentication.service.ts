import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  
  login(username, password) {
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('ApiKey',environment.APIKeyHeaderValue)
      return true;
    } else {
      return false;
    }
  }

 
  logOut() {
    sessionStorage.clear();
  }
}