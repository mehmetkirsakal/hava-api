import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService  implements CanActivate{

  constructor( 
    private authservice: AuthenticationService,
    private router: Router,
    private alert: AlertService
    ) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      let logged = this.authservice.isLoggedIn();

      if(logged) {
        return true;
      }
      this.router.navigate(["/login"]);
      this.alert.error("Sayfaya erişim için sisteme giriş yapmalısnınz!");
      return false;
      
    }
}
