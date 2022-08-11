import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, filter, concatMap, tap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';


@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {
  data$: Observable<any>;
  countries= this.weatherService.countries
  private unsubscribe$ = new Subject<void>();

  today: Date = new Date();

  loading = false;
  
  
  countryControl: FormControl;
  cityControl: FormControl;

  cities$: Observable<string>;


  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute,
    private router : Router,
    private authenticationService:AuthenticationService,
    
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
        console.log("İstek başarıyla gerçekleşti")
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map(country => country.cities)
    );
    
      

  }
  Logout(){
    this.authenticationService.logOut();
  }
}
    
    
 
  


  

