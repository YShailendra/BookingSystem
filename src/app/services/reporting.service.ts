import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ReportingService {

  constructor(private httpClient:HttpClient) {}


  public getReportByDate(data){
    return this.httpClient.get(environment.ApiUrl+"Booking/GetReport?date="+data.JourneyDate+"&busid="+data.BusID+"&days="+data.Days);
  }

  // public getReportByDays(data){
  //   return this.httpClient.get(environment.ApiUrl+"reportbydate?days="+data);
  // }

  // public getReportByBus(data){
  //   return this.httpClient.get(environment.ApiUrl+"getreportbybus?busid="+data);
  // }

}
