import { Component, OnInit  } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import {FormsModule} from '@angular/forms';
import { BookingModel } from '../models/booking'
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[BookingModel]
  

})
export class HomeComponent implements OnInit {
  
  public travelDate:any = new Date();
  public returnDate:any = new Date();
  public date:any = new Date().toDateString;

  public Options1=[];
  public Options2=[];
  constructor(private sharedService:SharedService,public booking:BookingModel,private router:Router) {
          this.booking = new BookingModel();
         this.Options1=this.sharedService.GetRouteData();
         this.Options2=this.sharedService.GetRouteData();
         this.booking.Source="";
         this.booking.Destination="";
         
   }

   
  ngOnInit() {
  }
  OnSelectionChange()
  {
    console.log(this.booking.Destination)
    console.log(this.booking.Source)
  }
  NextBookingDetails()
  {
    this.router.navigate(['./detail',{Source:this.booking.Source,Destination:this.booking.Destination,JourneyDate:this.booking.JourneyDate,ReturnJourneyDate:this.booking.ReturnJourneyDate}])
  }
}

