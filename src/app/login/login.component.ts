import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';




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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
) {
  
}

    ngOnInit() {
    
  }

    onSubmit(event) {

        event.preventDefault()
        const target = event.target
        
             
        if(this.authenticationService.login(target.querySelector('#username').value, target.querySelector('#password').value))
        {            
          console.log("Başarıyla giriş yapıldı.")
          this.router.navigate(['/home'])
          
        }else{
          console.log("Giriş başarısız, kontrol ediniz. (id: admin  şifre: admin)")
          this.signInError = 'Kullanıcı adı Şifre hatalı. İpucu: (admin, admin)'
          
        }
        

      }

  Logout(){
    
    this.authenticationService.logOut();
    this.signInError = ''
    console.log("Çıkış yapıldı. hile yapmak yasak tekrar giriş yap")
  }

}