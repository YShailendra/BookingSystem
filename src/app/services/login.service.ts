import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }
  //login service
  Login(usr: string, psw: string) {

    console.log("userName: " + usr)
    console.log("password: " + psw)
    return this.http.post(environment.ApiUrl + "login", { Username: usr, Password: psw });
    //return this.http.get(environment.ApiUrl + "values");
  }
}
