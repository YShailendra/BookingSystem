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
  public Routes = [];
  public booking:BookingData;

  constructor(private sharedService:SharedService) { 
    this.Routes=this.sharedService.GetRouteData();  
    this.Option1= this.sharedService.GetRouteData();
    this.Option2 = this.sharedService.GetRouteData();
    console.log(this.Routes);
    
  }

  ngOnInit() {
    
  }

  ngOnSelectionChange(){
    var data = [];
    Object.assign(data,this.sharedService.GetRouteData());
    var data2 =[];
    Object.assign(data2,this.sharedService.GetRouteData());
    this.Option1 = data.filter(s=>s!=this.booking.Destination);
    this.Option2 = data2.filter(s=>s!=this.booking.Source);
  }

}
