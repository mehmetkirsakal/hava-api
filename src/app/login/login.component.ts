import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert.service';



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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
) {}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

  }

    onSubmit() {
        this.submitted = true;
        console.log("inside login submit")
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        if(this.authenticationService.login(this.loginForm.username, this.f.password.value))
        {
          /*Following message is displayed in console after login success
            However, angular app is not re-directing to user-list page.*/       
          console.log("inside login success")
          this.router.navigate([''])
          this.invalidLogin = false
        }else{
          console.log("inside login false")
          this.invalidLogin = true
        }
        

      }

}