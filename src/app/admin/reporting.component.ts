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
    this.length = 2;// this.data.length;
    // this.sharedService.ExportToPDF();
   }

  ngOnInit() {
    this.busService.routeInformation().subscribe(data=>{
      this.Routes = data;
      console.log(this.Routes);
    });  
    this.onChangeTable(this.config);
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
                console.log(data);
                if(data)
                {
                  this.data=data as any;
                  this.length = this.data.length;
                }
                //this.sharedService.ExportToPDF(this.reportData,this.reportData)
                
               // this.sharedService.ExportToExcel(this.reportData,"exporttoexccel"+(new Date()).toDateString());
        });
  }

  //grid
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Name', name: 'Name'},
    {
      title: 'Booking No.',
      name: 'BookingNumber',
      sort: false,
    },
    
    {title: 'PhoneNo', name: 'PhoneNo'},
    {title: 'Source', name: 'Source'},
    {title: 'Destination', name: 'Destination'},
    {title: 'Seats', name: 'Seats'}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  private data:Array<any>=[];
 // private data:Array<any> = TableData;

  // public constructor() {
  //   this.length = this.data.length;
  // }

  // public ngOnInit():void {
  //   this.onChangeTable(this.config);
  // }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }


  //prirnting the html
  @ViewChild('printEl') printEl: ElementRef;

  

  public print(): void {
    //this.sharedService.print(this.printEl.nativeElement);
    let popupWinindow
    let innerContents = document.getElementById('printcontent').innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
 }
}
