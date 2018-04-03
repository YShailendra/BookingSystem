import {Component, OnInit} from '@angular/core';
import {SharedService} from '../services/shared.service';
import { BookingService } from '../services/booking.service';
import { BookingData } from '../Models/booking-data';
import { BusService } from '../services/bus.service';
import { ReportingService } from '../services/reporting.service';
import { ReportingModel } from '../Models/reporting';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

    public daysOptions =[];
    public Routes:any = [];
    public Bus:any =[];
    public reporting:ReportingModel;
    public booking:BookingData;
    public selectedRoute:any;
    public reportData:any;
    public disableDate;
    public disableDays;

    
  constructor(private sharedService:SharedService,private busService:BusService,private reportingService:ReportingService) {

    this.daysOptions = [15,30];
    
    this.booking = new BookingData();
    this.reporting = new ReportingModel();
    
   }

  ngOnInit() {
    this.busService.routeInformation().subscribe(data=>{
      this.Routes = data;
      console.log(this.Routes);
    });  
  }

  OnRouteSelectionChange(){
    this.busService.getBusByRouteId(this.selectedRoute).subscribe(data=>{
        this.Bus = data;

    });
  }
  OnDateSelectionChange(){
     
      if(this.disableDays){
        this.disableDays = false;
      }
      else{
        this.disableDays = true;
      }
  }

  OnSelectionChange(){
    
    
    if(this.disableDate){
      this.disableDate= false;
    }
    else{
        this.disableDate= true;
    }
    
  }


  generateReports(){
        this.reportingService.getReportByDate(this.reporting).subscribe(data=>{
                this.reportData = data;
                if(data)
                this.sharedService.ExportToExcel(this.reportData,"exporttoexccel"+(new Date()).toDateString());
        });
  }
}
