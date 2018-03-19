import { Component, OnInit, Input } from '@angular/core';
import { BookingData } from '../Models/booking-data';
import { SharedService } from '../services/shared.service';
import { BookingService } from '../services/booking.service';
import { element } from 'protractor';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./booking.component.css']
})
export class TicketComponent implements OnInit {

  @Input('BookingDetail')
  set setData(value)
  {
    console.log('Input Data')
    console.log(value)
    if(value)
    {
      this.Data=value;
    }
  }

  public Data:BookingData;
  public totalAmount:any;
  constructor(private sharedService:SharedService,private service:BookingService) {
    this.Data= new BookingData();
    

   }
 
  

  ngOnInit() {
  }
  //Submit ticket details
  SubmitBookingDetails()
  {
    //BookedSeats
    this.Data.BookedSeats= JSON.stringify(this.Data.BookedSeatDetails);
    this.service.BookTicket(this.Data).subscribe(success=>{
      var Data=success as any;
      console.log(Data.ClientData.BookingNumber);
      if(!Data.HasError)
      {
        this.Data = Data.ClientData;
        this.sharedService.ShowSuccess("Ticket booked successfully")
      }
    },error=>{ console.log(error); this.sharedService.ShowError("Error in booking the ticket") })

  }
  
  return(){
    
  }
  
}
