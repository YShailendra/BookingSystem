import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  //login service
  Login(usr: string, psw: string) {

    
    return this.http.post(environment.ApiUrl + "login", { Username: usr, Password: psw },{observe:'response'});
    //return this.http.get(environment.ApiUrl + "values");
  }
}
