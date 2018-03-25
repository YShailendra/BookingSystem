import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { SeatlayoutComponent } from './seatlayout.component'
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { SharedService } from '../services/shared.service';
import { BookingData } from '../Models/booking-data';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./booking.component.css'],

})

export class DetailComponent implements OnInit {

  public ishidTrue: boolean;
  public isShowTrue: boolean;
  public bookingData:BookingData;
  // @ViewChild(SeatlayoutComponent)
  public seatLayout: SeatlayoutComponent;
  public IsSeatFilled=0;
  public seatData:any =[];
  public BusDetail:any = [];

  constructor(private route: ActivatedRoute, private service: BookingService, private sharedService: SharedService,private busService:BusService) {
    
    this.ishidTrue = true;
    this.isShowTrue = false;
    this.bookingData=new BookingData();

  }

  ngOnInit() {
    
    this.bookingData.Source = this.route.snapshot.params["Source"];
    this.bookingData.Destination = this.route.snapshot.params["Destination"];
    this.bookingData.JourneyDate = this.route.snapshot.params["JourneyDate"];
    this.bookingData.ReturnJourneyDate = this.route.snapshot.params["ReturnJourneyDate"];
    this.busService.BusDetail(this.bookingData).subscribe(detail=>{
          this.BusDetail = this.SetPropertyToShowHideDetails(detail);
          console.log(this.BusDetail);
    },error=>{
      this.sharedService.ShowError("Error occured while loading bus details");
    });

  }
  //get booked seats
public SetPropertyToShowHideDetails(dataItems?:any)
{
  for(let bus of dataItems)
{
  bus['IsSeatFilled']=0;
}
console.log(this.BusDetail);
return dataItems;
}
public BookedSeats:any;
  
  // GetBookedSeats()
  // {
  //   this.service.GetBookedSeats(this.bookingData).subscribe(s=>{
  //     // console.log(s);
  //     var Data=s as any;
  //     Data.forEach(element => {
  //           this.seatData.push(element.SeatId);
  //     });
  //     //console.log(this.seatData)
  //   },error=>{this.sharedService.ShowError("Error occured while loading booked ticket details")})
  // }

  showModifySection() {
    if (this.ishidTrue == true) {
      this.ishidTrue = false;
      this.isShowTrue = true;
    } else {
      this.ishidTrue = true;
      this.isShowTrue = false;
    }
  }

  showSection(bus) {
    this.bookingData.BusID = bus.ID;
    console.log(bus);
    if(bus.IsSeatFilled ==1)
    {
      bus.IsSeatFilled =0;
    }
    else
    {
      bus.IsSeatFilled=1;
      // this.GetBookedSeats();
    }
  }

  onsubmitTicket(data) {
      console.log(data);
      var bus = this.BusDetail.find(s=>s.ID == this.bookingData.BusID);
      if(bus){
        bus.IsSeatFilled=2;
      }  
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
  back(bus){
    var bus = this.BusDetail.find(s=>s.ID == this.bookingData.BusID);
      if(bus){
        bus.IsSeatFilled=1;
      }  
  }
}