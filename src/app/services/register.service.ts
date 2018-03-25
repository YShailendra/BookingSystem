import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Injectable()
export class RegisterService {

  constructor(private httpClient:HttpClient) { }

  public CreateUser(data){
     return  this.httpClient.post(environment.ApiUrl+"user",data);
  }

}
 