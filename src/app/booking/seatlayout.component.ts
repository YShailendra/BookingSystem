import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { SharedService } from '../services/shared.service';
import {BookingModel} from '../Models/booking';

@Component({
  selector: 'app-seatlayout',
  templateUrl: './seatlayout.component.html',
  styleUrls: ['./booking.component.css']
})
export class SeatlayoutComponent implements OnInit {


  // public isDisplayed = "hid";

  public model:BookingModel;

  public ishidTrue;
  public isShowTrue;
  public SeatsData=[];
  @Output() onSeatSelected:EventEmitter<any> = new EventEmitter();
  constructor(private bookingService:BookingService,private sharedService:SharedService) { 
    this.ishidTrue = true;
    this.isShowTrue= false;

  }

  ngOnInit() {

    this.SeatsData=this.bookingService.GetSeatData();

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
  public CurentBookedSeats=[];
  bookSeat(evnt)
  {
    if(this.CurentBookedSeats.length>9)
    {
      this.sharedService.ShowWarning("You cant select more than 10 seats in single booking!");
    }
   else {
      console.log(evnt.target.innerText)
      var find =this.SeatsData.find(f=>f.SeatId==evnt.target.innerText);
      var IsExist= this.CurentBookedSeats.find(f=>f.SeatId==evnt.target.innerText);
      if(find &&!IsExist)
      {
        find['Gender']='';
        this.CurentBookedSeats.push(find);
        evnt.target.classList+= ' selected';
      }
      else{
        this.CurentBookedSeats.forEach( (item, index) => {
          if(item === find) this.CurentBookedSeats.splice(index,1);
        
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


}
