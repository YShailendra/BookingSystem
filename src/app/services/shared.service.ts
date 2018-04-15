import { Injectable, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare let jsPDF;
@Injectable()
export class SharedService {
  

  private Counter:number=0;
  @Output() public isLoggedIn:EventEmitter<any> = new EventEmitter<any>();
  constructor(private toastr:ToastrService,private cookieService:CookieService,private spinnerService: Ng4LoadingSpinnerService,private route:Router) { }
  public ShowHideBusyIndicator(isShow)
  {
   if(isShow)
   {
     this.Counter++;
   }
   else
   {
     this.Counter--;
   }
   if(this.Counter==0)
   {
     this.spinnerService.hide();
     //hide the busy indicator
   }
   else{
      this.spinnerService.show();
   }
  }
  public SetToken(token)
  {
    this.cookieService.put("token",token)
  }
  public GetToken()
  {
    console.log(this.cookieService.get("token"));
    return this.cookieService.get("token");

  }

  public IsAdmin(){
    return this.cookieService.get("Role")=='true'?true:false;

  }

  public SetRole(value){
      this.cookieService.put("Role",value);
  }

  public SetLoginInfo(data){
    console.log(data);
    this.SetToken(data.Token);
    this.SetRole(data.IsAdmin);
    this.ShowSuccess("Successfully Logged-In"); 
    if(data.IsAdmin){
     this.isLoggedIn.emit(data.IsAdmin);
        this.route.navigate(['/admin']);
    }
  }

  public logOut(){
      this.cookieService.removeAll();
      this.route.navigate(['']);
      this.isLoggedIn.emit(false);
  }


  public GetRouteData()
  {
    return [
      'Bareilly',
      'Bheera',
      'Delhi',
      'Hapur',
      'Pilibhit',
      'Nighasan',
      'Palia'];
  }
  //this method is to show error message
  ShowError(message?:string)
  {
      message=message?message:"Error occured!";
      this.toastr.error(message)
   
  }
  ShowSuccess(message?:string)
  {

    message=message?message:"Action Performed Successfully!";
    this.toastr.success(message);
  }
  ShowWarning(message?:string)
  {
    message=message?message:"Warning message!";
    this.toastr.warning(message);
  }
  ShowInfo(message?:string)
  {
    message=message?message:"Info message!";
    this.toastr.info(message);
  }

  ExportToExcel(data:any,filename:string){
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      useBom: true,
      noDownload: false,
      headers: ['Name','Email','Source','Destination','Mobile','Booking Number','Seats','Journey']
    };
    new Angular5Csv(data,filename,options);
  }
  ExportToPDF(columnsData?:any,rowsData?:any)
  {
   var columns= [{title:'Name', dataKey:'Name'},
    {title:'Source', dataKey:'Source'},
    {title:'Destination', dataKey:'Destination'},
    {title:'Mobile', dataKey:'Mobile'},
    {title:'Booking Number', dataKey:'BookingNumber'},
    {title:'Seats', dataKey:'Seats'},
    {title:'Journey', dataKey:'Journey'}];
  if(!columnsData)
  {
    columns = [
      {title: "ID", dataKey: "id"},
      {title: "Name", dataKey: "name"}, 
      {title: "Country", dataKey: "country"}
  ];
  }   
   
  var rows = [
      {"id": 1, "name": "Shaw", "country": "Tanzania"},
      {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
      {"id": 3, "name": "Garcia", "country": "Madagascar"},
  ];
  if(rowsData)
  {
  rows=rowsData;
  }
  // Only pt supported (not mm or in)
  var doc = new jsPDF('p', 'pt');
  doc.autoTable(columns, rows, {
      theme: 'striped', // 'striped', 'grid' or 'plain'
      startY: false, // false (indicates margin top value) or a number
      //margin: 40, // a number, array or object
      pageBreak: 'auto', // 'auto', 'avoid' or 'always'
      tableWidth: 'auto', // 'auto', 'wrap' or a number, 
      showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
      tableLineColor: 200, // number, array (see color section below)
      tableLineWidth: 0,
      styles: {
        fillColor:[0,255,0],
        cellPadding: 5, // a number, array or object (see margin below)
        fontSize: 10,
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
        //fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto' // 'auto', 'wrap' or a number
      },
      columnStyles: {
        //id: {fillColor: 255}
      },
      margin: {top: 20},
      addPageContent: function(data) {
        doc.text("Header", 40, 30);
      }
  });
  doc.save('table.pdf');
  }


}
