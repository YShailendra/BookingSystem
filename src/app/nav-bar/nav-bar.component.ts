import {Component,OnInit} from '@angular/core';
import {SharedService} from '../services/shared.service'
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public isAdmin:boolean;

  constructor(public sharedService:SharedService,private route:Router) { 
    this.isAdmin = this.sharedService.IsAdmin();
  }
  showLogin=false;
  ngOnInit() {
      this.sharedService.isLoggedIn.subscribe(data=>{
        console.log(data);
          this.isAdmin = data;
      })

  }
  isIn = false;   // store state
  toggleState() { // click handler
      let bool = this.isIn;
      this.isIn = bool === false ? true : false; 
  }
  LoginOpen()
  {
    this.showLogin=true;
  }

  logout(){
      this.sharedService.logOut();

  }

}
