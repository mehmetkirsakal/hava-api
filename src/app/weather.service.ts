import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<any> {
    return this.http.get<any>(environment.weatherApiBaseUrl,{
      headers: new HttpHeaders()
      .set(environment.APIHostHeaderName,environment.APIHostHeaderValue)
      .set(environment.APIKeyHeaderName,environment.APIKeyHeaderValue),
      params: new HttpParams()
      .set('data.city',city)
    })


  }
}
