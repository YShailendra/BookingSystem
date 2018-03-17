import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatlayoutComponent } from './seatlayout.component'
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { SharedService } from '../services/shared.service';
import { BookingData } from '../Models/booking-data';




@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./booking.component.css'],

})


export class DetailComponent implements OnInit {

  public ishidTrue: boolean;
  public isShowTrue: boolean;
  public bookingData:BookingData;
  @ViewChild(SeatlayoutComponent)
  public seatLayout: SeatlayoutComponent;
  public IsSeatFilled=0;
  
  // public bookingData = {
  //   Source: '',
  //   Destination: '',
  //   JourneyDate: '',
  //   ReturnJourneyDate: '',
  //   BookedSeats: []
  // }
  constructor(private route: ActivatedRoute, private service: BookingService, private sharedService: SharedService) {

    this.ishidTrue = true;
    this.isShowTrue = false;
    this.bookingData=new BookingData();

  }

  ngOnInit() {
    // this.bookingData.Source = this.route.snapshot.params["Source"];
    // this.bookingData.Destination = this.route.snapshot.params["Destination"];
    // this.bookingData.JourneyDate = this.route.snapshot.params["JourneyDate"];
    // this.bookingData.ReturnJourneyDate = this.route.snapshot.params["ReturnJourneyDate"];
    this.bookingData.Source = this.route.snapshot.params["Source"];
    this.bookingData.Destination = this.route.snapshot.params["Destination"];
    this.bookingData.JourneyDate = this.route.snapshot.params["JourneyDate"];
    this.bookingData.ReturnJourneyDate = this.route.snapshot.params["ReturnJourneyDate"];

  }

  showModifySection() {
    if (this.ishidTrue == true) {
      this.ishidTrue = false;
      this.isShowTrue = true;
    } else {
      this.ishidTrue = true;
      this.isShowTrue = false;
    }
  }

  showSection() {
    this.seatLayout["showSeatLayout"]();
  }

   submitTicket() {
      console.log(this.bookingData);
      this.IsSeatFilled=1;
   }

  selectedSeats(data) { 
    this.bookingData.BookedSeatDetails = data;
  }
}