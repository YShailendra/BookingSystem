import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Injectable()
export class SharedService {

  private Counter:number=0;
  constructor(private cookieService:CookieService) { }
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
     //hide the busy indicator
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
    return ['bareilly',
      'bheera',
      'delhi',
      'hapur',
      'bheera',
      'hapur', 
      'mailani',
      'nighasan'];
  }
}
