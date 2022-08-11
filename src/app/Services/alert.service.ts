import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(message: string){
    window.alert(message);
  }
}
