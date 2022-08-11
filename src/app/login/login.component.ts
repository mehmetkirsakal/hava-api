import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormGroup} from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  signInError: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
) {
  
}

    ngOnInit() {
    
  }

    onSubmit(event) {

        event.preventDefault()
        const target = event.target
        this.authenticationService.login(target.querySelector('#username').value, target.querySelector('#password').value)
           
        if(this.authenticationService.isLoggedIn())
        {            
          console.log("Başarıyla giriş yapıldı.")
          this.router.navigate(['/home'])
          
        }else{
          console.log("Giriş başarısız, kontrol ediniz. (id: admin  şifre: admin)")
          this.signInError = 'Kullanıcı adı Şifre hatalı. İpucu: (admin, admin)'
          
        }
        

      }

}