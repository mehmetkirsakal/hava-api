import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();



  countries = [
    {
      name: 'Turkey',
      cities: ['İstanbul', 'Ankara', 'İzmir','Bursa','Antalya','Adana','Mersin']
    },
    {
      name: 'Amerika',
      cities: ['New York', 'Chicago', 'Washington']
    },
    {
      name: 'Almanya',
      cities: ['Berlin', 'Frankfurt', 'Dortmund']
    },
    {
      name: 'Rusya',
      cities: ['Moskova', 'St. Petersburg', 'Kazan']
    }
  ];

  countryControl: FormControl;
  cityControl: FormControl;

  cities$: Observable<string>;
  

  constructor(
    private router: Router,
    private authenticationService:AuthenticationService) { }

  Logout(){
    
    this.authenticationService.logOut();
  }

  ngOnInit(){
    if(sessionStorage.length == 0){
      console.log("Hile yapma giriş yap")
      this.router.navigate(['/login'])
    }
    
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
