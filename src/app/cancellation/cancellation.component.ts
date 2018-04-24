import { Component, OnInit } from '@angular/core';
import {BookingData} from '../Models/booking-data';
import {BookingService} from '../services/booking.service';
import {SharedService} from '../services/shared.service'
@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.css']
})
export class CancellationComponent implements OnInit {

  public booking:BookingData;
  public response:any;
  constructor(private sharedService:SharedService,private bookingService:BookingService) { 
    this.booking = new BookingData();
  }

  ngOnInit() {
  }

  cancelTicket(form){
        this.bookingService.CancelTicket(this.booking).subscribe(data=>{
              this.response = data;
              form.reset();
              this.sharedService.ShowSuccess("Ticket cancel Successfuly");
        },error=>{this.sharedService.ShowError("Unable to Cancel Ticket")})
  }

}
