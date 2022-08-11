import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AuthenticationService } from '../Services/authentication.service';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  countries= this.weatherService.countries
  countryControl: FormControl;
  cityControl: FormControl;

  cities$: Observable<string>;
  

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private authenticationService:AuthenticationService) { }

  Logout(){
    
    this.authenticationService.logOut();
  }

  ngOnInit(){

    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.router.navigate([value]);
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map(country => country.cities)
    );
  }
  

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
