import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http:HttpClient) { }
  //login service
  Login(usr:string,psw:string)
  {
  console.log("userName: "+usr)  
  console.log("password: "+psw)
  return this.http.post("login",{Username:usr,Password:psw});
  //  return this.http.post("login",{Username:usr,Password:psw}).subscribe(s=>{
  //     console.log(s);
  //   },error=>{
  //     console.log(error)
  //   })
  }
}
