import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, filter, concatMap, tap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {
  data$: Observable<any>;
  private unsubscribe$ = new Subject<void>();

  today: Date = new Date();

  loading = false;

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
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router : Router
    
  ) { }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
    map(params =>params.locationName),
    filter(name => !!name),
  
    concatMap(name => this.weatherService.getWeatherForCity(name)), 
    )
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
}
    
    
 
  


  

