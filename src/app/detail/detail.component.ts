import { Component, OnInit, ViewChild } from '@angular/core';
import { SeatlayoutComponent } from '../seatlayout/seatlayout.component'
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { SharedService } from '../services/shared.service';




@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],

})


export class DetailComponent implements OnInit {

  // public :Booking;
  public ishidTrue: boolean;
  public isShowTrue: boolean;

  @ViewChild(SeatlayoutComponent)
  public seatLayout: SeatlayoutComponent;

  public bookingData = {
    Source: '',
    Destination: '',
    JourneyDate: '',
    ReturnJourneyDate: '',
    BookedSeats: []
  }
  constructor(private route: ActivatedRoute, private service: BookingService, private sharedService: SharedService) {

    this.ishidTrue = true;
    this.isShowTrue = false;


  }

  ngOnInit() {
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
      

  //   this.service.BookTicket(this.bookingData).subscribe(s => {

  //     if (s) {
  //       console.log(s)
  //     }
  //     else {
  //       this.sharedService.ShowError('Error Occured');
  //     }
  //   }, error => { this.sharedService.ShowError("Error occured while booking the bus ticket on server") })

   }

  selectedSeats(data) {
    
    this.bookingData.BookedSeats = data;
  }
}