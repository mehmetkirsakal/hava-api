import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient){ }

  

  // getUserDetails(username,password){
  //   //Post details API server and return 
  //   return this.http.post('/api/auth.php',{
  //     username,
  //     password
  //   }).subscribe(data => {
  //     console.log(data,"is what we got from server")
  //   })

    
  // }

}
