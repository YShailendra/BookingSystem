import { Component, OnInit, ViewChild,Input } from '@angular/core';
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
  public seatData:any =[];
  public BusDetail:any = [];

  constructor(private route: ActivatedRoute, private service: BookingService, private sharedService: SharedService) {
    
    this.ishidTrue = true;
    this.isShowTrue = false;
    this.bookingData=new BookingData();

  }

  ngOnInit() {
    
    this.bookingData.Source = this.route.snapshot.params["Source"];
    this.bookingData.Destination = this.route.snapshot.params["Destination"];
    this.bookingData.JourneyDate = this.route.snapshot.params["JourneyDate"];
    this.bookingData.ReturnJourneyDate = this.route.snapshot.params["ReturnJourneyDate"];
    this.service.BusDetail(this.bookingData).subscribe(detail=>{
          this.BusDetail = detail;
          console.log(this.BusDetail);
    },error=>{
      this.sharedService.ShowError("Error occured while loading bus details");
    })
  }
  //get booked seats
  
public BookedSeats:any;
  
  GetBookedSeats()
  {
    this.service.GetBookedSeats(this.bookingData).subscribe(s=>{
      console.log(s);
      var Data=s as any;
      Data.forEach(element => {
            this.seatData.push(element.SeatId);
      });
      console.log(this.seatData)
    },error=>{this.sharedService.ShowError("Error occured while loading booked ticket details")})
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

  onsubmitTicket() {
      console.log(this.bookingData);
      this.IsSeatFilled=1;
   }

  selectedSeats(data) { 
    this.bookingData.BookedSeatDetails = data;
    this.TotalSeatAmount();
  }
  TotalSeatAmount(){
    
    var amnt=0;
      for(let amount of this.bookingData.BookedSeatDetails){
          amnt = amnt + amount.Amount;
      }
      this.bookingData.TotalAmount = amnt;
  }
  back(){
    this.IsSeatFilled=0;
  }
}