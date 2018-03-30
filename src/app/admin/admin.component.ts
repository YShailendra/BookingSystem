import { Component, OnInit } from '@angular/core';
import {SharedService} from '../services/shared.service';
import { BookingService } from '../services/booking.service';
import { BookingData } from '../Models/booking-data';
import { BusService } from '../services/bus.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  public Option1 = [];
  public Option2 = [];
  public Routes:any = [];
  public Bus:any =[];
  public seats:any =[];
  public isSeatfilled:any;
  public selectedRoute:any;
  public booking:BookingData;


  constructor(private sharedService:SharedService,private busService:BusService,private bookingService:BookingService) { 
    this.Option1= this.sharedService.GetRouteData();
    this.Option2 = this.sharedService.GetRouteData();
    this.booking = new BookingData();
    this.isSeatfilled = 0;
    
    
  }

  ngOnInit() {
     this.busService.routeInformation().subscribe(data=>{
      this.Routes = data;
      console.log(this.Routes);
    });  
  }

  OnSelectionChange(){
    var data = [];
    Object.assign(data,this.sharedService.GetRouteData());
    var data2 =[];
    Object.assign(data2,this.sharedService.GetRouteData());
    this.Option1 = data.filter(s=>s!=this.booking.Destination);
    this.Option2 = data2.filter(s=>s!=this.booking.Source);
    
  }

  OnRouteSelectionChange(){
    console.log(this.selectedRoute);
   this.busService.getBusByRouteId(this.selectedRoute).subscribe(data=>{
    console.log(data);
    this.Bus = data;

   });
  }

  searchDetail(){
    this.isSeatfilled = 1;
  }

  selectedSeats(data){

  }

  OnBusSelectionChange(){
    
  }

}
