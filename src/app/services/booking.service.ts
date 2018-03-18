import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BookingService {

  constructor(private httpClient: HttpClient) { }
//GetBookedSeats
  public BookTicket(data) {
    return this.httpClient.post(environment.ApiUrl + "Booking",data);
  }
  //this method is used for getting all the booked seat for the selected date
  public GetBookedSeats(data) {
    return this.httpClient.post(environment.ApiUrl + "Booking/GetBookedSeats",data);
  }
  public GetSeatData() {

    var seats = [];
    for (var i = 1; i <= 10; i++) {

      var uSleeper = {
        SeatId: 'D' + i,
        SeatType: 'US',
        Amount: 700

      }
      seats.push(uSleeper);

    }
    for (var i = 1; i <= 20; i++) {

      var uSleeper = {
        SeatId: 'S' + i,
        SeatType: 'LS',
        Amount: 600

      }
      if (i > 10) {
        uSleeper.SeatId = 'S' + String.fromCharCode(i + 54)

      }
      seats.push(uSleeper);

    }
    for (var i = 1; i <= 21; i++) {

      var uSleeper1 = {
        SeatId: i.toString(),
        SeatType: 'BS',
        Amount: 500

      }
      seats.push(uSleeper1);

    }
    console.log(seats)
    return seats;
  }


}

