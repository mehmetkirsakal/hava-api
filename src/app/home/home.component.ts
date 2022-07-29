import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

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
  

  constructor(private router: Router) { }

  ngOnInit(){
    
    
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.router.navigate([value]);
        console.log([value])
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
