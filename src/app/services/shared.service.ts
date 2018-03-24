import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class SharedService {

  private Counter:number=0;
  constructor(private toastr:ToastrService,private cookieService:CookieService,private spinnerService: Ng4LoadingSpinnerService) { }
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
    return this.cookieService.get("token");
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
}
