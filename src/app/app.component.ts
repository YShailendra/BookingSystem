import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService} from '../app/services/shared.service';
import { routerTransition } from './router.animation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[routerTransition]
})
export class AppComponent implements OnInit{
  title = 'app';
  public isAdmin;
  constructor(private toastrService: ToastrService,private sharedService:SharedService)
  {
    
  }

  ngOnInit(){
      this.sharedService.isLoggedIn.subscribe(data=>{
        this.isAdmin = data;
      })
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

}
