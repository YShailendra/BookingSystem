import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusService {

  constructor(private httpClient:HttpClient) { }


   // method to get bus detail 
   public BusDetail(data):Observable<any> {
    return this.httpClient.post(environment.ApiUrl+"Bus",data);
}
// get route information 
public routeInformation(){
  return this.httpClient.get(environment.ApiUrl+"Bus/GetRoute");
}
// get bus details by route id
public getBusByRouteId(data){
    return this.httpClient.get(environment.ApiUrl+"Bus/GetBusByRouteId?routeid="+data);
}

}
