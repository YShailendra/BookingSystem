import { Component, OnInit  } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { BookingModel } from '../models/booking'
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { BookingData } from '../Models/booking-data';
import { Select2OptionData } from 'ng2-select2';
import { trigger, animate, state, style, transition,query,stagger,keyframes } from '@angular/animations'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 1}),
          animate('2000ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('2000ms', style({transform: 'translateY(100%)', opacity: 1}))
        ])
      ]
    )
  ]

})
export class HomeComponent implements OnInit {
  
  public travelDate:any = new Date();
  public returnDate:any = new Date();
  public todaysdate:any;
  public booking:BookingData;
  public Options1=[];
  public Options2=[];
  constructor(private sharedService:SharedService,private router:Router) {
         this.booking = new BookingData();
         this.Options1=this.sharedService.GetRouteData();
         this.Options2=this.sharedService.GetRouteData();
         this.booking.Source="";
         this.booking.Destination="";
         this.todaysdate = new Date();
         this.booking.JourneyDate =  new Date().toString().split('T')[0] as any;
         
   }

   
  ngOnInit() {
  }
  OnSelectionChange()
  {
    var data = [];
    Object.assign(data,this.sharedService.GetRouteData());
    var data2 =[];
    Object.assign(data2,this.sharedService.GetRouteData());
    this.Options1 = data.filter(s=>s!=this.booking.Destination);
    this.Options2 = data2.filter(s=>s!=this.booking.Source);
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

