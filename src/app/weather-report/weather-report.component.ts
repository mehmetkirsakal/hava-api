import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, concatMap, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {
  data$: Observable<any>;

  today: Date = new Date();

  loading = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) { } 

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      map(params =>params.locationName),
      
      
    )
    
    this.weatherService.getWeatherForCity('ankara')
      .subscribe({
        next:(response) => {
          console.log(response);
          
        }  
      });
      concatMap(name => this.weatherService.getWeatherForCity('istanbul'));
    
    }
  //   this.data$ = this.route.params.pipe(
  //     map(params => params.locationName),
  //     filter(name => !!name),
  //     tap(() => {
  //       this.loading = true;
  //     }),
  //     concatMap(name => this.weatherService.getWeatherForCity(name)),
      
  //     tap(() => {
  //       this.loading = false;
  //     })
  //   );
  // }
  


  
}
