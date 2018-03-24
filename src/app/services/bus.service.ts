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
    return this.httpClient.get(environment.ApiUrl+"Bus?source="+data.Source+"&destination="+data.Destination);
}

}
