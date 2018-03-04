import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { SharedService } from './services/shared.service'

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private sharedService:SharedService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req)
    const dupReq =req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });//req; //req.clone({ headers: req.headers.set('Authorization', this.sharedService.GetToken()) });
    let handleObs: Observable<HttpEvent<any>> = next.handle(dupReq);
    this.sharedService.ShowHideBusyIndicator(true);
    console.log(dupReq);
    return handleObs.do(()=>{}).finally(()=>{
      this.sharedService.ShowHideBusyIndicator(false);
    });
  }
};
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }