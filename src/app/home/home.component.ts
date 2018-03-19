import { Component, OnInit  } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';
import { BookingModel } from '../models/booking'
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { BookingData } from '../Models/booking-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  
  public travelDate:any = new Date();
  public returnDate:any = new Date();
  public date:any;
  public booking:BookingData;
  public Options1=[];
  public Options2=[];
  constructor(private sharedService:SharedService,private router:Router) {
         this.booking = new BookingData();
         this.Options1=this.sharedService.GetRouteData();
         this.Options2=this.sharedService.GetRouteData();
         this.booking.Source="";
         this.booking.Destination="";
         this.date = new Date();

         
   }

   
  ngOnInit() {
  }
  OnSelectionChange()
  {
    
  }
  NextBookingDetails()
  {
    if(this.Validation())
    {
      this.router.navigate(['./detail',{Source:this.booking.Source,Destination:this.booking.Destination,JourneyDate:this.booking.JourneyDate,ReturnJourneyDate:this.booking.ReturnJourneyDate}])
    }
    
  }
  Validation()
  {
    var IsValid=true;
    if(!this.booking.Source && this.booking.Source=='')
    {
      IsValid=false;
      this.sharedService.ShowInfo("Please provide the source")
    }
    else if(!this.booking.Destination && this.booking.Destination=='')
    {
      IsValid=false;
      this.sharedService.ShowInfo("Please provide the destination")
    }
    else if(!this.booking.JourneyDate && this.booking.JourneyDate!=null)
    {
      IsValid=false;
      this.sharedService.ShowInfo("Please provide the journey date")
    }
    return IsValid;
  }
}

