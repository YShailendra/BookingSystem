import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookingData} from '../Models/booking-data';
import {BookingService} from '../services/booking.service';
import {SharedService} from '../services/shared.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  public booking:BookingData;
  public bookingDetail:any;

  constructor(private activatedRoute:ActivatedRoute,private bookingservice:BookingService,private sharedService:SharedService) {
        this.booking = new BookingData();
   }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(s=>{
    //   console.log(s)
    // });
  }


  checkBookingStatus(){

    this.bookingservice.getBookingDetailById(this.booking).subscribe(data=>{
      this.bookingDetail = data;
    },error=>{this.sharedService.ShowError("Unable to fetch booking details")})

  }



}
