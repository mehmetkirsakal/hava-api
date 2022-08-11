import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Countries } from '../models/countries';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) { }

  public countries:Countries[] = [
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
      cities: ['Moskova', 'St. Petersburg', 'Kazan' , 'Vorkuta', 'kanash','yaroslavl']
    }
  ];


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
