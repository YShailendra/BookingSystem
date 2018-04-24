import {Component, OnInit, ElementRef,ViewChild} from '@angular/core';
import {SharedService} from '../services/shared.service';
import { BookingService } from '../services/booking.service';
import { BookingData } from '../Models/booking-data';
import { BusService } from '../services/bus.service';
import { ReportingService } from '../services/reporting.service';
import { ReportingModel } from '../Models/reporting';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare let jsPDF;
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
    //this.length = 2;// this.data.length;
    // this.sharedService.ExportToPDF();
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

 public data:any;
 generateReports(){
        this.reportingService.getReportByDate(this.reporting).subscribe(data=>{
                this.reportData = data;
                console.log(data);
                if(data)
                {
                  this.data=data as any;
                  //this.length = this.data.length;
                }
                //this.sharedService.ExportToPDF(this.reportData,this.reportData)
                
               // this.sharedService.ExportToExcel(this.reportData,"exporttoexccel"+(new Date()).toDateString());
        });
  }


  //prirnting the html
  @ViewChild('printEl') printEl: ElementRef;

  

  public print(): void {
    //this.sharedService.print(this.printEl.nativeElement);
    let popupWinindow
    let innerContents = document.getElementById('printcontent').innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" href="assets/css/bootstrap.css"><link rel="stylesheet" href="assets/css/style.css"></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
 }
}
