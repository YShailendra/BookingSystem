import { Component, OnInit,Input,EventEmitter,Output,ViewChild,AfterViewInit, ElementRef } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { SharedService } from '../services/shared.service';
import {BookingModel} from '../Models/booking';
import {DetailComponent} from '../booking/detail.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./booking.component.css']
})
export class SeatlayoutComponent implements OnInit,AfterViewInit {


  // public isDisplayed = "hid";

  public model:BookingModel;
  
  public detailcomponent: DetailComponent;

  public ishidTrue;
  public isShowTrue;
  public SeatsData=[];
  public seatStatus:any = [];
  public IsSeatFilled=0;
  public BookSeatData:any =[];
  public isAdmin:boolean = false;
  public Data:any;
  @Output() onSeatSelected:EventEmitter<any> = new EventEmitter();
  @Output() onsubmitTicket:EventEmitter<any> = new EventEmitter();
  @ViewChild('seats') seats:ElementRef;
  constructor(private bookingService:BookingService,public sharedService:SharedService,public route:Router) { 
    this.ishidTrue = true;
    this.isShowTrue= false;
    this.isAdmin = this.sharedService.IsAdmin();
  }

  ngOnInit() {
    this.SeatsData=this.bookingService.GetSeatData();
  }
  ngAfterViewInit(){
    this.GetBookedSeats();
    
}
public BookedSeats:any;
  
  GetBookedSeats()
  {
    this.bookingService.GetBookedSeats(this.BookingModel).subscribe(s=>{
      console.log(s);
      var Data=s as any;
      Data.forEach(element => {
            this.BookSeatData.push(element.SeatId);
      });

      for(var i =0;i<51;i++){
      
        var seatContent = this.seats.nativeElement.children[i];

        var valueAssigned = Data.find(f=>f.SeatId == seatContent.textContent.trim());
        if(valueAssigned){
          // console.log(seatContent);
          if(valueAssigned.Gender == "Female") 
          seatContent.classList += " ladies";
          else
            seatContent.classList += " booked";
        }
  
        
      }
      
    },error=>{this.sharedService.ShowError("Error occured while loading booked ticket details")})
  }

  @Input() showSeatLayout(){
    if(this.ishidTrue == true){
      this.ishidTrue = false;
      this.isShowTrue=true;
  }else{
      this.ishidTrue=true;
      this.isShowTrue=false;
  }
  
  }
  @Input() BookingModel:any;
  public CurentBookedSeats=[];

  bookSeat(evnt)
  {
    var find =this.SeatsData.find(f=>f.SeatId==evnt.target.innerText);
    var IsExist= this.CurentBookedSeats.find(f=>f.SeatId==evnt.target.innerText);
    if(evnt.target.classList[1] == "booked" || evnt.target.classList[1] == "ladies"){
            return;
    }

    if(this.CurentBookedSeats.length>9 && !IsExist)
    { 
      this.sharedService.ShowWarning("You can not select more than 10 seats");
      }
    else{
      
      // var find =this.SeatsData.find(f=>f.SeatId==evnt.target.innerText);
      // var IsExist= this.CurentBookedSeats.find(f=>f.SeatId==evnt.target.innerText);
      if(find &&!IsExist)
      {
        find['Gender']='';
        this.CurentBookedSeats.push(find);
        evnt.target.classList+= ' selected';
      }
      else{
        this.CurentBookedSeats.forEach( (item, index) => {
          if(item === find) 
          {
            this.CurentBookedSeats.splice(index,1);
           console.log(evnt.target.classList)
           evnt.target.classList="divseat";
            
          }
          else{

          }

        });
      }
        this.TotalSeatAmount();
           console.log(this.CurentBookedSeats);
          this.onSeatSelected.emit(this.CurentBookedSeats);
    }
   
        
  }
  public totalAmount:number = 0;
  
  TotalSeatAmount(){
    this.totalAmount = 0;
      for(let amount of this.CurentBookedSeats){
    
          this.totalAmount = this.totalAmount + amount.Amount;
        
      }
  }

  submitTicket1(){
    this.onsubmitTicket.emit(this.CurentBookedSeats);
  }

  SubmitBookingDetails(){
    console.log(this.Data);
    this.Data.BookedSeats= JSON.stringify(this.Data.BookedSeatDetails);
   
    this.bookingService.BookTicket(this.Data).subscribe(success=>{
      var Data=success as any;
      console.log(Data.ClientData.BookingNumber);
      if(!Data.HasError)
      {
        this.Data = Data.ClientData;
        this.sharedService.ShowSuccess("Ticket booked successfully");
          this.route.navigate['/admin'];
    }
      
      
    },error=>{ console.log(error); this.sharedService.ShowError("Error in booking the ticket") })

  }
 

  }





