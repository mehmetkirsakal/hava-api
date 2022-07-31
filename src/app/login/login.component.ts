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
  loading = false;
  submitted = false;
  returnUrl: string;
  invalidLogin = false
  signInError: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
) {
  
}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

    onSubmit(event) {

        event.preventDefault()
        const target = event.target
        this.submitted = true;
        
        
        
        this.loading = true;
        if(this.authenticationService.login(target.querySelector('#username').value, target.querySelector('#password').value))
        {            
          console.log("Başarıyla giriş yapıldı.")
          this.router.navigate(['/home'])
          this.invalidLogin = false
        }else{
          console.log("Giriş başarısız, kontrol ediniz. (id: admin  şifre: admin)")
          this.signInError = 'Kullanıcı adı Şifre hatalı. İpucu: (admin, admin)'
          this.invalidLogin = true
        }
        

      }

  Logout(){
    
    this.authenticationService.logOut();
    this.signInError = ''
    console.log("Çıkış yapıldı. hile yapmak yasak tekrar giriş yap")
  }

}