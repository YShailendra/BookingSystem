import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BookingService {

  constructor(private httpClient:HttpClient) { }
  public BookTicket(data)
  {
    return this.httpClient.post(environment.ApiUrl+"Booking",data);
  }
}
