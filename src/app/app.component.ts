import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService} from '../app/services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

}
