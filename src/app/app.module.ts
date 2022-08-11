import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { WeatherReportComponent } from './weather-report/weather-report.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertService } from './Services/alert.service';
import { AuthenticationService } from './Services/authentication.service';
import { WeatherService } from './Services/weather.service';
import { LoginGuardService } from './Services/login-guard.service';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent, WeatherReportComponent, LoginComponent, HomeComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '',
        component: LoginComponent
      },
      {       
        path: ':locationName',
        component: WeatherReportComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: '**',
        redirectTo: "",
        pathMatch: "full"
      }
      
    ]),
    MatProgressBarModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [AlertService,AuthenticationService,WeatherService,LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
