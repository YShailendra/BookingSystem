import { Component, OnInit, Input } from '@angular/core';
import { BookingData } from '../Models/booking-data';
import { SharedService } from '../services/shared.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./booking.component.css']
})
export class TicketComponent implements OnInit {

  @Input('BookingDetail')
  setData(value)
  {
    console.log('Input Data')
    console.log(value)
    if(value)
    {
      this.Data=value;
    }
  }
  public Data:BookingData;
  constructor(private sharedService:SharedService,private service:BookingService) {
    this.Data= new BookingData();
   }

  ngOnInit() {
  }
  //Submit ticket details
  SubmitBookingDetails()
  {
    this.service.BookTicket(this.Data).subscribe(success=>{
      console.log(success);
      if(success)
      {
        this.sharedService.ShowSuccess("Ticket booked successfully")
      }
    },error=>{ console.log(error); this.sharedService.ShowError("Error in booking the ticket") })

  }
}
