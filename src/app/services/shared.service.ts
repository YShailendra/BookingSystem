import { Injectable, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

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
  


}
